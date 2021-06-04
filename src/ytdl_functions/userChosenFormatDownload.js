const ytdl = require('ytdl-core');
const {
  audioAndVideoCommands,
  audioCommands,
  videoCommands,
} = require('./commandArrays');

const decideCorrectDownloadType = async (url, itag, type, tracker) => {
  let commandList;
  let extension;

  let audio;
  let video;
  let data;

  if (type === 'highestaudioandvideo') {
    audio = ytdl(url, { quality: 'highestaudio' }).on(
      'progress',
      (_, downloaded, total) => {
        tracker.audio = { downloaded, total };
      }
    );
    video = ytdl(url, { quality: 'highestvideo' }).on(
      'progress',
      (_, downloaded, total) => {
        tracker.video = { downloaded, total };
      }
    );

    extension = 'mp4';
    commandList = audioAndVideoCommands;
  } else if (type === 'highestaudio') {
    data = ytdl(url, { quality: 'highestaudio' }).on(
      'progress',
      (_, downloaded, total) => {
        tracker.audio = { downloaded, total };
      }
    );

    extension = 'mp3';
    commandList = audioCommands;
  } else if (type === 'audioonly') {
    const info = await ytdl.getInfo(url);
    const formats = ytdl
      .filterFormats(info.formats, type)
      .filter((format) => format.itag === Number(itag));

    extension = formats[0].container;
    commandList = audioCommands;

    data = await ytdl(url, { quality: itag }).on(
      'progress',
      (_, downloaded, total) => {
        tracker.audio = { downloaded, total };
        tracker.video = { downloaded: 0, total: 0 };
      }
    );
  } else if (type === 'videoonly') {
    const info = await ytdl.getInfo(url);
    const formats = ytdl
      .filterFormats(info.formats, type)
      .filter((format) => format.itag === Number(itag));

    extension = formats[0].container;
    commandList = videoCommands;

    data = await ytdl(url, { quality: itag }).on(
      'progress',
      (_, downloaded, total) => {
        tracker.video = { downloaded, total };
        tracker.audio = { downloaded: 0, total: 0 };
      }
    );
  } else {
    data = ytdl(url, { quality: 'highestvideo' }).on(
      'progress',
      (_, downloaded, total) => {
        tracker.video = { downloaded, total };
      }
    );

    extension = 'mp4';
    commandList = videoCommands;
  }

  return { commandList, extension, audio, video, data, tracker };
};

export default decideCorrectDownloadType;
