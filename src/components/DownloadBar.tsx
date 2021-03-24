import React from 'react';
import { Stream } from 'stream';
import * as fs from 'fs';

import ytdl from 'ytdl-core';

export const DownloadBar = () => {
  const [downloadProgress, setDownloadProgress] = React.useState({
    progress: 0,
    completed: false,
    total: 0,
    loaded: 0,
  });

  React.useEffect(() => {
    const ref = 'https://www.youtube.com/watch?v=osooxi5xBdQ';

    const finishDownload = async (audio: any) => {
      setDownloadProgress({
        progress: 0,
        total: 0,
        loaded: 0,
        completed: true,
      });
      audio.pipe(
        fs.createWriteStream(`${process.env.HOME}/Downloads/BRAP/lol.mp4`)
      );
    };

    const startDownload = async () => {
      const audio = ytdl(ref, { quality: 'highestaudio' }).on(
        'progress',
        (_, downloaded, total) => {
          setDownloadProgress({
            total,
            loaded: downloaded,
            progress: 0,
            completed: false,
          });
        }
      );

      finishDownload(audio);
    };

    startDownload();
  }, []);

  if (!downloadProgress.completed) {
    return (
      <div>
        <p>{downloadProgress.loaded}</p>
        <p>{downloadProgress.total}</p>
      </div>
    );
  }

  return null;
};

export default DownloadBar;
