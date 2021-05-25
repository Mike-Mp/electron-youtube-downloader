import React from 'react';

import { ipcRenderer } from '../appRuntime';
import audioDownload from '../ytdl_functions/audioOrVideoDownload';
import defaultDownload from '../ytdl_functions/defaultDownload';
import { getTitle } from '../ytdl_functions/videoDataFunctions';

const DownloadBar = React.memo(function DownloadBar({
  isDownloading,
  setIsDownloading,
  isWorking = false,
  setIsWorking,
  url,
  setMessage,
  typeOfDownload,
}: {
  isDownloading: boolean;
  setIsDownloading: React.Dispatch<React.SetStateAction<boolean>>;
  isWorking: boolean;
  setIsWorking: React.Dispatch<React.SetStateAction<boolean>>;
  url: string;
  setMessage: React.Dispatch<React.SetStateAction<string>>;
  typeOfDownload: string;
}) {
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

  const [processFinished, setProcessFinished] = React.useState<boolean>(false);

  const [title, setTitle] = React.useState<string>('');

  const beginProcess = async () => {
    console.log('download started');
    setIsDownloading(true);

    const updatedTitle = await getTitle(url);

    if (updatedTitle.startsWith('Error:')) {
      setMessage(updatedTitle);
      setTimeout(() => setMessage(''), 5000);
      return;
    }

    setTitle(updatedTitle);

    defaultDownload(url, typeOfDownload);
  };

  const updateProgress = (args: {
    start: any;
    audio: { downloaded: number; total: number };
    video: { downloaded: number; total: number };
  }) => {
    const toMb = (i: number) => (i / 1024 / 1024).toFixed(2);

    console.log('progress update');

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
  };

  const finishDownload = (args: {
    start: any;
    audio: { downloaded: number; total: number };
    video: { downloaded: number; total: number };
  }) => {
    updateProgress(args);
    setMessage('Info: Downloading has finished.');
    setTimeout(() => setMessage(''), 10000);
    setIsDownloading(false);
    setProcessFinished(true);

    // setTimeout(() => {
    //   const emptyProgress = {
    //     start: Date.now(),
    //     audio: {
    //       downloaded: '',
    //       total: '',
    //     },
    //     video: {
    //       downloaded: '',
    //       video: '',
    //     },
    //   };
    // }, 5000);
  };

  ipcRenderer.on('send_data_to_renderer', (_, args) => {
    console.log('SEND_DATA_TO_RENDERER');
    updateProgress(args);
  });

  ipcRenderer.on('mark_complete', (_, args) => {
    console.log('MARK_COMPLETE');
    finishDownload(args);
  });

  if (!isWorking) return null;

  const isComplete = processFinished ? 'Downloading is complete' : '';

  if (isWorking) {
    return (
      <div className="downloadProgress">
        <p>{title}</p>
        <p>{isComplete}</p>
        <h6>Audio</h6>
        <p>
          Downloaded {downloadProgress.audio.downloaded || '0'}mb out of{' '}
          {downloadProgress.audio.total || '0'}mb
        </p>
        <h6>Video</h6>
        <p>
          Downloaded {downloadProgress.video.downloaded || '0'}mb out of{' '}
          {downloadProgress.video.total || '0'}mb
        </p>
        <button type="button" onClick={beginProcess}>
          Download and write to disk
        </button>
        <button type="button" onClick={() => setIsWorking(false)}>
          Close tab
        </button>
      </div>
    );
  }

  return null;
});

export default DownloadBar;
