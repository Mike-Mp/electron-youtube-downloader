import React from 'react';

import { ipcRenderer } from '../appRuntime';
import { IndexProps } from '../interfaces/interface';
import defaultDownload from '../ytdl_functions/defaultDownload';
import { getTitle } from '../ytdl_functions/videoDataFunctions';

const DownloadBar = React.memo(function DownloadBar({
  isDownloading,
  setIsDownloading,
  isWorking = false,
  setIsWorking,
  url,
  setMessage,
  itag,
  formatType,
}: {
  isDownloading: boolean;
  setIsDownloading: React.Dispatch<React.SetStateAction<boolean>>;
  isWorking: boolean;
  setIsWorking: React.Dispatch<React.SetStateAction<boolean>>;
  url: string;
  setMessage: React.Dispatch<React.SetStateAction<string>>;
  itag: string;
  formatType: IndexProps['formatType'];
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

  const updateProgress = (args: {
    start: any;
    audio: { downloaded: number; total: number };
    video: { downloaded: number; total: number };
  }) => {
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
  };

  React.useEffect(() => {
    const updateListener = (_: any, args: any) => {
      console.log('UPDATE PROGRESS');
      updateProgress(args);
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
    };

    ipcRenderer.on('send_data_to_renderer', updateListener);

    const completeListener = (_: any, args: any) => {
      console.log('MARK_COMPLETE');
      finishDownload(args);
    };

    ipcRenderer.on('mark_complete', completeListener);

    return () => {
      ipcRenderer.removeListener('send_data_to_renderer', updateListener);

      ipcRenderer.removeListener('mark_complete', completeListener);
    };
  }, [downloadProgress, setIsDownloading, setMessage]);

  const checkVideoTitle = async () => {
    const updatedTitle = await getTitle(url);

    if (updatedTitle.startsWith('Error:')) {
      setMessage(updatedTitle);
      setTimeout(() => setMessage(''), 5000);
      return;
    }

    setTitle(updatedTitle);
  };

  const beginProcess = async () => {
    console.log('download started');

    setMessage('Info: Download started');
    setTimeout(() => setMessage(''), 5000);

    setIsDownloading(true);

    checkVideoTitle();

    defaultDownload(url, itag, formatType);
  };

  const resetTab = () => {
    setDownloadProgress({
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

    setTitle('');

    setProcessFinished(false);

    setIsWorking(false);
  };

  if (!isWorking) return null;

  const isComplete = processFinished ? 'Downloading is complete' : '';

  if (isWorking) {
    return (
      <div className="downloadProgress">
        <p>{title === '' ? 'Title' : title}</p>
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
        <button type="button" onClick={beginProcess} disabled={isDownloading}>
          Download and write to disk
        </button>
        <button type="button" onClick={resetTab} disabled={isDownloading}>
          Reset tab
        </button>
      </div>
    );
  }

  return null;
});

export default DownloadBar;
