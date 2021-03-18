import ytdl = require('ytdl-core');

const fs = require('fs');

// TypeScript: import ytdl from 'ytdl-core'; with --esModuleInterop
// TypeScript: import * as ytdl from 'ytdl-core'; with --allowSyntheticDefaultImports
// TypeScript: import ytdl = require('ytdl-core'); with neither of the above

// const url11 = 'http://www.youtube.com/watch?v=aqz-KE-bpKQ';

export const getVideoDetails = async (url: string) => {
  if (!ytdl.validateURL(url)) return { msg: 'Error: Invalid video URL/id' };

  const info = await ytdl.getInfo(url);

  const details = info.videoDetails;

  const videoLengthInSeconds = parseInt(details.lengthSeconds, 10);

  const videoDateObject = new Date(videoLengthInSeconds * 1000);

  const timeString = videoDateObject.toISOString().substr(11, 8);

  return { details, timeString };
};

export const validateVideoURL = (url: string) => {
  const validation = ytdl.validateURL(url);
  return validation;
};

export const validateVideoID = (videoID: string) => {
  const validation = ytdl.validateID(videoID);
  return validation;
};

const urlOrId = (str: string) => {
  let rawStr;
  let validation;
  if (str.startsWith('www')) {
    rawStr = `https://${str}`;
    validation = validateVideoURL(rawStr);
  } else if (str.startsWith('http')) {
    validation = validateVideoURL(str);
  } else {
    validation = validateVideoID(str);
  }

  return validation;
};

export const getFormats = async (url: string, typeOf: ytdl.Filter) => {
  if (!urlOrId(url)) return [{ msg: 'Error: Invalid video URL/id' }];

  const info = await ytdl.getInfo(url);
  const format = ytdl.filterFormats(info.formats, typeOf);

  const resolvedFormat = Promise.resolve(format)
    .then((res) => res)
    .catch((err) => {
      const errObj = [err];
      console.log('braaaap');
      return errObj;
    });

  return resolvedFormat;
};

export const downloadDefault = async (url: string) => {
  if (!urlOrId(url)) return { msg: 'Error: Invalid URL/id' };
  const { title } = (await ytdl.getBasicInfo(url)).videoDetails;
  // const testString = 'Q<u>!?</u>otation Marks song from Grammaropolis - "Quote Me”';
  const sanitized = title.replace(/[!?(),.<>:”"'/\\|*]/gu, ' ');
  console.log(`TITLE: ${title} SANITIZED: ${sanitized}`);
  // await ytdl(url).pipe(fs.createWriteStream(`${sanitized}.mp4`));
};
