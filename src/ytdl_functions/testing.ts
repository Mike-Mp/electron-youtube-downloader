import ytdl from 'ytdl-core';

const fs = require('fs');
// TypeScript: import ytdl from 'ytdl-core'; with --esModuleInterop
// TypeScript: import * as ytdl from 'ytdl-core'; with --allowSyntheticDefaultImports
// TypeScript: import ytdl = require('ytdl-core'); with neither of the above

// ytdl('http://www.youtube.com/watch?v=aqz-KE-bpKQ').pipe(
//   fs.createWriteStream('video.mp4')
// );

const getVideoDetails = async (url: string) => {
  const info = await ytdl.getInfo(url);
  const details = info.videoDetails;
  return details;
};

const url11 = 'http://www.youtube.com/watch?v=aqz-KE-bpKQ';

const validateVideoURL = async (url: string) => {
  const validation = await ytdl.validateURL(url);
  const details = getVideoDetails(url);

  let videoTitle;
  let videoDescription;

  const videoLengthInSeconds = parseInt((await details).lengthSeconds, 10);

  const videoDateObject = new Date(videoLengthInSeconds * 1000);

  const timeString = videoDateObject.toISOString().substr(11, 8);

  console.log(timeString);
};

validateVideoURL(url11);

const getVideoFormats = async (url: string) => {
  const info = await ytdl.getInfo(url);
  const format = ytdl.filterFormats(info.formats, 'videoandaudio');
  return format;
};

export default {
  getVideoFormats,
  getVideoDetails,
  validateVideoURL,
};

// const info = ytdl.getInfo(url).then((res) => res);

// console.log(info);
