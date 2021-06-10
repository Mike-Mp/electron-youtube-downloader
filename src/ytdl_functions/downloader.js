import {
  decideCorrectDownloadType,
  getPath,
} from './downloaderHelperFunctions';

const ffmpeg = require('ffmpeg-static');

const ytdl = require('ytdl-core');
const cp = require('child_process');
const { ipcRenderer } = require('electron');
const {
  audioAndVideoCommands,
  audioCommands,
  videoCommands,
} = require('./commandArrays');

const downloader = async (url, itag, type, path) => {
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
    progressbarInterval = 2000;
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

  const output = getPath(path, sanitizedTitle, extension);

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

  ffmpegProcess.on('close', (code, signal) => {
    console.log('done');
    if (code) console.log(`Exited with code ${code}`);
    else if (signal) console.log(`Exited with signal ${signal}`);
    // Cleanup
    clearInterval(progressbarHandle);
    ipcRenderer.send('process_finished', tracker);
  });

  ffmpegProcess.on('error', (err) => {
    console.log(err);
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

export default downloader;
