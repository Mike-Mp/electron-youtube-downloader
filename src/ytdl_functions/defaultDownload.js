const ffmpeg = require('ffmpeg-static');

const ytdl = require('ytdl-core');
const cp = require('child_process');
const { ipcRenderer } = require('electron');
const {
  audioAndVideoCommands,
  audioCommands,
  videoCommands,
} = require('./commandArrays');

const defaultDownload = async (url, type) => {
  const tracker = {
    start: Date.now(),
    audio: { downloaded: 0, total: Infinity },
    video: { downloaded: 0, total: Infinity },
  };

  const title = await (await ytdl.getBasicInfo(url)).videoDetails.title;

  // eslint-disable-next-line no-useless-escape
  const sanitizedTitle = title.replace(/([!?,.\/])/g, ' ');

  console.log(sanitizedTitle);

  let commandList;
  let extension;

  let audio;
  let video;

  if (type === 'highestaudioandvideo') {
    audio = ytdl(url, { quality: 'highestaudio' }).on(
      'progress',
      (_, downloaded, total) => {
        tracker.audio = { downloaded, total };
      }
    );
    video = ytdl(url, { quality: 'highestvideo' }).on(
      'progress',
      (_, downloaded, total) => {
        tracker.video = { downloaded, total };
      }
    );

    extension = 'mp4';
    commandList = audioAndVideoCommands;
  } else if (type === 'highestaudio') {
    audio = ytdl(url, { quality: 'highestaudio' }).on(
      'progress',
      (_, downloaded, total) => {
        tracker.audio = { downloaded, total };
      }
    );

    extension = 'mp3';
    commandList = audioCommands;
  } else {
    video = ytdl(url, { quality: 'highestvideo' }).on(
      'progress',
      (_, downloaded, total) => {
        tracker.video = { downloaded, total };
      }
    );

    extension = 'mp4';
    commandList = videoCommands;
  }

  // Prepare the progress bar
  let progressbarHandle = null;
  const progressbarInterval = 30000;
  const sendProgress = () => {
    tracker.start = ((Date.now() - tracker.start) / 1000 / 60).toFixed(2);
    console.log('send progress');
    ipcRenderer.send('send_data_to_main', tracker);
  };

  let output;

  if (process.env.HOME && process.env.HOME.length > 0) {
    output = `${process.env.HOME}/Downloads/${sanitizedTitle}.${extension}`;
  } else if (process.env.USERPROFILE && process.env.USERPROFILE.length > 0) {
    output = `${process.env.USERPROFILE}\\Downloads\\${sanitizedTitle}.${extension}`;
  } else {
    output = `${title}.${extension}`;
  }

  commandList.push(output);

  // Start the ffmpeg child process
  const ffmpegProcess = cp.spawn(ffmpeg, commandList, {
    windowsHide: true,
    stdio: [
      /* Standard: stdin, stdout, stderr */
      'inherit',
      'inherit',
      'inherit',
      /* Custom: pipe:3, pipe:4, pipe:5 */
      'pipe',
      'pipe',
      'pipe',
    ],
  });

  ffmpegProcess.on('close', () => {
    console.log('done');
    // Cleanup
    clearInterval(progressbarHandle);
    ipcRenderer.send('process_finished', tracker);
  });

  ffmpegProcess.on('error', (err) => {
    console.error(err);
  });

  // Link streams
  // FFmpeg creates the transformer streams and we just have to insert / read data
  ffmpegProcess.stdio[3].on('data', () => {
    // Start the progress bar
    if (!progressbarHandle) {
      progressbarHandle = setInterval(sendProgress, progressbarInterval);
    }
  });

  if (type === 'highestaudioandvideo') {
    audio.pipe(ffmpegProcess.stdio[4]);
    video.pipe(ffmpegProcess.stdio[5]);
  } else if (type === 'highestaudio') {
    audio.pipe(ffmpegProcess.stdio[4]);
  } else {
    video.pipe(ffmpegProcess.stdio[4]);
  }
};

export default defaultDownload;
