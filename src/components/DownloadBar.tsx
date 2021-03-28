import React from 'react';

import startDownload from '../ytdl_functions/defaultDownload';
import { getTitle } from '../ytdl_functions/videoDataFunctions';

export const DownloadBar = ({
  isWorking = false,
  setIsWorking,
  url,
  setMessage,
}: {
  isWorking: boolean;
  setIsWorking: React.Dispatch<React.SetStateAction<boolean>>;
  url: string;
  setMessage: React.Dispatch<React.SetStateAction<string>>;
}) => {
  const [downloadProgress, setDownloadProgress] = React.useState({
    start: Date.now(),
    audio: {
      downloaded: '',
      total: '',
    },
    video: {
      downloaded: '',
      total: '',
    },
  });

  const [title, setTitle] = React.useState<string | { msg: string }[]>('');

  const beginProcess = async () => {
    console.log('download started');
    const updatedTitle = await getTitle(url);

    if (updatedTitle?.msg) {
      setMessage(updatedTitle?.msg);
      setTimeout(() => setMessage(''), 5000);
      return;
    }

    startDownload(url);
  };

  const cancelProcess = async () => {
    console.log('download cancelled');
    setIsWorking(false);
  };

  window.ipcRenderer.on('send_data_to_renderer', (_, args) => {
    const toMb = (i: number) => (i / 1024 / 1024).toFixed(2);

    const newProgress = {
      start: args.start,
      audio: {
        downloaded: toMb(args.audio.downloaded),
        total: toMb(args.audio.total),
      },
      video: {
        downloaded: toMb(args.video.downloaded),
        total: toMb(args.video.total),
      },
    };

    setDownloadProgress(newProgress);
  });

  if (!isWorking) return null;

  if (isWorking) {
    return (
      <div className="downloadProgress">
        <p>title here</p>
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
        <button type="button" onClick={beginProcess}>
          Download and write to disk
        </button>
        <button type="button" onClick={cancelProcess}>
          Cancel process
        </button>
      </div>
    );
  }

  return null;
};

export default DownloadBar;
