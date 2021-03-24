import React from 'react';
import {
  getFormats,
  chosenDownload,
} from '../ytdl_functions/videoDataFunctions';

import Form from '../components/Form';

import { IndexProps } from '../interfaces/interface';

const Downloader = () => {
  const [videoURL, setVideoURL] = React.useState<string>('');

  const [formatType, setFormatType] = React.useState<IndexProps['formatType']>(
    'videoandaudio'
  );

  const [qualityData, setQualityData] = React.useState<
    IndexProps['qualityData']
  >({ data: [], typeOfData: 'videoandaudio' });

  const [message, setMessage] = React.useState<string>('');

  const [videoData, setVideoData] = React.useState<IndexProps['videoData']>({
    msg: '',
  });

  const [itag, setItag] = React.useState('');

  console.log(itag);

  const getQualityData = async () => {
    if (videoURL.length === 0) {
      setMessage('Info: Empty video URL');
      setTimeout(() => setMessage(''), 5000);
      return;
    }
    const data = await getFormats(videoURL, formatType);
    if (data[0].msg) {
      setMessage(data[0].msg);
      setTimeout(() => setMessage(''), 5000);
      return;
    }
    setQualityData({ data, typeOfData: formatType });
  };

  const userChosenFormat = async () => {
    if (itag.length === 0) {
      setMessage('Please choose a format');
      setTimeout(() => setMessage(''), 3000);
      return;
    }

    console.log(itag);
    console.log(formatType);
    const dialogResult = await window.dialog.showOpenDialog({
      properties: ['openDirectory', 'createDirectory'],
      message: 'Where to create video directory',
    });

    if (!dialogResult.canceled) {
      chosenDownload(videoURL, itag, formatType, dialogResult.filePaths);
    }
  };

  console.log(qualityData);

  return (
    <div className="mainPage">
      <div className="downloadBox">
        <Form
          qualityData={qualityData}
          videoURL={videoURL}
          setVideoURL={setVideoURL}
          getQualityData={getQualityData}
          message={message}
          setMessage={setMessage}
          videoData={videoData}
          setVideoData={setVideoData}
          setFormatType={setFormatType}
          setItag={setItag}
        />
      </div>
    </div>
  );
};

export default Downloader;
