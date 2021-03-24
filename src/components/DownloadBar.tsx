import React from 'react';

import ytdl from 'ytdl-core';

export const DownloadBar = ({
  isWorking = false,
  setIsWorking,
  url,
}: {
  isWorking: boolean;
  setIsWorking: React.Dispatch<React.SetStateAction<boolean>>;
  url: string;
}) => {
  const [downloadProgress, setDownloadProgress] = React.useState({
    audio: {
      completed: false,
      downloaded: '',
      total: '',
    },
    video: {
      completed: false,
      downloaded: '',
      total: '',
    },
  });

  const startDownload = async () => {
    const audio = ytdl(url, { quality: 'highestaudio' }).on(
      'progress',
      (_, downloaded, total) => {
        setDownloadProgress({
          video: downloadProgress.video,
          audio: {
            completed: false,
            downloaded: (downloaded / 1024 / 1024).toFixed(2),
            total: (total / 1024 / 1024).toFixed(2),
          },
        });
      }
    );

    const video = ytdl(url, { quality: 'highestvideo' }).on(
      'progress',
      (_, downloaded, total) => {
        setDownloadProgress({
          audio: downloadProgress.audio,
          video: {
            completed: downloadProgress.video.completed,
            downloaded: (downloaded / 1024 / 1024).toFixed(2),
            total: (total / 1024 / 1024).toFixed(2),
          },
        });
      }
    );
  };

  React.useEffect(() => {
    startDownload();
  }, []);

  if (!isWorking) return null;

  if (isWorking) {
    return (
      <div className="downloadProgress">
        <h6>Audio</h6>
        <p>
          {downloadProgress.audio.downloaded} out of{' '}
          {downloadProgress.audio.total}
        </p>
        <h6>Video</h6>
        <p>
          {downloadProgress.video.downloaded} out of{' '}
          {downloadProgress.video.total}
        </p>
      </div>
    );
  }

  return null;
};

export default DownloadBar;
