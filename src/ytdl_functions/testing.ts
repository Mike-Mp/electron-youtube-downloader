import * as fs from 'fs';

import ytdl = require('ytdl-core');

const url = 'https://www.youtube.com/watch?v=KkhGkRahU6g';
const urlTwo = 'https://www.youtube.com/watch?v=K4lRfZyRD8k';
const urlThree = 'http://www.youtube.com/watch?v=aqz-KE-bpKQ';

const downloadVideo = async () => {
  const info = await ytdl.getInfo(urlThree);
  const formats = ytdl
    .filterFormats(info.formats, 'audio')
    .filter((format) => format.itag === 18);
  console.log(formats);
};

downloadVideo();
