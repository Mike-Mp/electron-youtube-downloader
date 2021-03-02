import ytdl from 'ytdl-core';

const fs = require('fs');
// TypeScript: import ytdl from 'ytdl-core'; with --esModuleInterop
// TypeScript: import * as ytdl from 'ytdl-core'; with --allowSyntheticDefaultImports
// TypeScript: import ytdl = require('ytdl-core'); with neither of the above

// ytdl('http://www.youtube.com/watch?v=aqz-KE-bpKQ').pipe(
//   fs.createWriteStream('video.mp4')
// );

const tryInfo = async (url: string) => {
  const info = await ytdl.getInfo(url);
  const format = ytdl.filterFormats(info.formats, 'videoandaudio');
  console.log('Format found!', format);
};

tryInfo('http://www.youtube.com/watch?v=aqz-KE-bpKQ');
