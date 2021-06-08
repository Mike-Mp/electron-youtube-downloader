import * as fs from 'fs';

import ytdl = require('ytdl-core');

const url = 'https://www.youtube.com/watch?v=KkhGkRahU6g';
const urlTwo = 'https://www.youtube.com/watch?v=rsz1zLzX6k4';
const urlThree = 'http://www.youtube.com/watch?v=aqz-KE-bpKQ';

const downloadVideo = async () => {
  const info = await ytdl.getInfo(urlTwo);

  const formats = ytdl.chooseFormat(info.formats, { quality: 'highest' });

  console.log(formats);
};

downloadVideo();
