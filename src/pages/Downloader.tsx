import React from 'react';
import { getFormats } from '../ytdl_functions/videoDataFunctions';

import Form from '../components/Form';

import { IndexProps } from '../interfaces/interface';

const Downloader = () => {
  const [videoURL, setVideoURL] = React.useState<string>('');

  const [formatType, setFormatType] = React.useState<IndexProps['formatType']>(
    'videoandaudio'
  );

  const [qualityData, setQualityData] = React.useState<
    IndexProps['qualityData']
  >([]);

  const [message, setMessage] = React.useState<string>('');

  const [videoData, setVideoData] = React.useState<IndexProps['videoData']>({
    msg: '',
  });

  const [itag, setItag] = React.useState('');

  console.log(formatType);
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
    setQualityData(data);
  };

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
