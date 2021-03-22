import * as fs from 'fs';

import ytdl = require('ytdl-core');

const url = 'https://www.youtube.com/watch?v=KkhGkRahU6g';
const urlTwo = 'https://www.youtube.com/watch?v=K4lRfZyRD8k';

const downloadVideo = async () => {
  const { title } = (await ytdl.getBasicInfo(url)).videoDetails;
  // const testString = 'Q<u>!?</u>otation Marks song from Grammaropolis - "Quote Me”';
  const sanitized = title.replace(/[!?(),.<>:”"'/\\|*]/gu, ' ');
  console.log(`TITLE: ${title} SANITIZED: ${sanitized}`);

  const dirPath = `${process.env.HOME}/Downloads/lel`;

  if (process.env.HOME && process.env.HOME.length > 0) {
    console.log(process.env.HOME);
    fs.mkdir(dirPath, () => console.log(`writing ${sanitized} to disk`));
    const fullPath = `${process.env.HOME}/Downloads/${sanitized}.mp4`;

    await ytdl(url, { quality: 'highest' }).pipe(
      fs.createWriteStream(fullPath)
    );
  }
};

downloadVideo();
