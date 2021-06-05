import decideCorrectDownloadType from './userChosenFormatDownload';

const ffmpeg = require('ffmpeg-static');

const ytdl = require('ytdl-core');
const cp = require('child_process');
const { ipcRenderer } = require('electron');
const {
  audioAndVideoCommands,
  audioCommands,
  videoCommands,
} = require('./commandArrays');

const defaultDownload = async (url, itag, type) => {
  const tracker = {
    start: Date.now(),
    audio: { downloaded: 0, total: Infinity },
    video: { downloaded: 0, total: Infinity },
  };

  console.log(itag, type);

  const info = await ytdl.getBasicInfo(url);

  const { title } = info.videoDetails;

  let progressbarInterval;

  const duration = info.videoDetails.lengthSeconds;

  if (duration >= 4860) {
    progressbarInterval = 30000;
  } else {
    progressbarInterval = 1000;
  }

  // eslint-disable-next-line no-useless-escape
  const sanitizedTitle = title.replace(/([!?,.\/])/g, ' ');

  console.log(sanitizedTitle);

  const { commandList, extension, audio, video, data } =
    await decideCorrectDownloadType(url, itag, type, tracker);

  // Prepare the progress bar
  let progressbarHandle = null;
  // progressbarInterval = 30000;
  const sendProgress = () => {
    tracker.start = ((Date.now() - tracker.start) / 1000 / 60).toFixed(2);
    // console.log('send progress');
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
  } else {
    data.pipe(ffmpegProcess.stdio[4]);
  }
};

export default defaultDownload;
