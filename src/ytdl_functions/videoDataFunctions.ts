// import ytdl from 'ytdl-core';
import ytdl = require('ytdl-core');

// TypeScript: import ytdl from 'ytdl-core'; with --esModuleInterop
// TypeScript: import * as ytdl from 'ytdl-core'; with --allowSyntheticDefaultImports
// TypeScript: import ytdl = require('ytdl-core'); with neither of the above

export const getVideoDetails = async (url: string) => {
  if (!ytdl.validateURL(url)) return false;

  const info = await ytdl.getInfo(url);
  const details = info.videoDetails;

  let videoTitle;
  let videoDescription;

  const videoLengthInSeconds = parseInt((await details).lengthSeconds, 10);

  const videoDateObject = new Date(videoLengthInSeconds * 1000);

  const timeString = videoDateObject.toISOString().substr(11, 8);

  return details;
};

// const url11 = 'http://www.youtube.com/watch?v=aqz-KE-bpKQ';

export const validateVideoURL = (url: string) => {
  const validation = ytdl.validateURL(url);
  return validation;
};

export const getVideoFormats = async (url: string) => {
  if (!validateVideoURL(url)) return [{ msg: 'Error: Invalid video URL' }];
  const info = await ytdl.getInfo(url);
  const format = ytdl.filterFormats(info.formats, 'video');

  const resolvedFormat = Promise.resolve(format)
    .then((res) => res)
    .catch((err) => {
      const errObj = [err];
      return errObj;
    });

  return resolvedFormat;
};

export default {
  getVideoFormats,
  getVideoDetails,
};
