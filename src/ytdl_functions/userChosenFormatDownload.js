import ytdl from 'ytdl-core';

const cp = require('child_process');
const { ipcRenderer } = require('electron');
const ffmpeg = require('ffmpeg-static');

const userDownload = async (url, itag, formatType) => {
  const tracker = {
    start: Date.now(),
    audio: { downloaded: 0, total: Infinity },
    video: { downloaded: 0, total: Infinity },
  };

  let progressbarHandle = null;
  const progressbarInterval = 30000;
  const sendProgress = () => {
    tracker.start = ((Date.now() - tracker.start) / 1000 / 60).toFixed(2);
    console.log('send progress');
    ipcRenderer.send('send_data_to_main', tracker);
  };

  const title = await (await ytdl.getBasicInfo(url)).videoDetails.title;

  const sanitizedTitle = title.replace(/([!?,.\/])/g, ' ');

  console.log(sanitizedTitle);

  let output;

  const info = await ytdl.getInfo(url);
  const formats = ytdl
    .filterFormats(info.formats, formatType)
    .filter((format) => format.itag === itag);

  const extension = formats.container;

  if (process.env.HOME && process.env.HOME.length > 0) {
    output = `${process.env.HOME}/Downloads/${sanitizedTitle}.${extension}`;
  } else if (process.env.USERPROFILE && process.env.USERPROFILE.length > 0) {
    output = `${process.env.USERPROFILE}\\Downloads\\${sanitizedTitle}.${extension}`;
  } else {
    output = `${title}.${extension}`;
  }

  const data = await ytdl
    .downloadFromInfo(url, { quality: itag })
    .on('progress', (_, downloaded, total) => {
      tracker.audio = { downloaded, total };
    });

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

  ffmpegProcess.stdio[3].on('data', () => {
    // Start the progress bar
    if (!progressbarHandle) {
      progressbarHandle = setInterval(sendProgress, progressbarInterval);
    }
  });
};

export default userDownload;
