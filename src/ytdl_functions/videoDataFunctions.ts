import * as fs from 'fs';

import ytdl = require('ytdl-core');

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

export const downloadDefault = async (
  url: string,
  filePath: string[] | null
) => {
  if (!urlOrId(url)) return { msg: 'Error: Invalid URL/id' };
  const { title } = (await ytdl.getBasicInfo(url)).videoDetails;
  // const testString = 'Q<u>!?</u>otation Marks song from Grammaropolis - "Quote Me”';
  const sanitized = title.replace(/[!?(),.<>:”"'/\\|*]/gu, ' ');
  console.log(`TITLE: ${title} SANITIZED: ${sanitized}`);

  let dirPath;

  if (process.env.HOME) {
    dirPath = `${process.env.HOME}/Downloads/${sanitized}`;
  } else if (process.env.USERPROFILE) {
    dirPath = `${process.env.USERPROFILE}\\Downloads\\${sanitized}`;
  } else {
    return;
  }

  fs.mkdir(dirPath, (err) => {
    console.log(err);
  });

  ytdl(url, { quality: 'highest' }).pipe(
    fs.createWriteStream(`${dirPath}/${sanitized}.mp4`)
  );
};

export const chosenDownload = async (
  url: string,
  itag: string,
  formatType: ytdl.Filter,
  filePaths: string[]
) => {};
