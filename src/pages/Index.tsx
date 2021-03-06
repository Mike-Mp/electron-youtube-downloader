import React from 'react';
import { getVideoFormats } from '../ytdl_functions/videoDataFunctions';

import Form from '../components/Form';

import { IndexProps } from '../interfaces/interface';

const Index = () => {
  const [videoURL, setVideoURL] = React.useState<string>('');
  const [qualityData, setQualityData] = React.useState<
    IndexProps['qualityData']
  >([]);
  const [message, setMessage] = React.useState<string>('');
  const [videoData, setVideoData] = React.useState<IndexProps['videoData']>({
    msg: '',
  });

  const getQualityData = async () => {
    if (videoURL.length === 0) {
      setMessage('Info: Empty video URL');
      setTimeout(() => setMessage(''), 8000);
      return;
    }
    const data = await getVideoFormats(videoURL);
    if (data[0].msg) {
      setMessage(data[0].msg);
      setTimeout(() => setMessage(''), 8000);
      return;
    }
    setQualityData(data);
  };

  return (
    <div className="mainPage">
      <div className="downloadBox">
        <h3>Downloader</h3>
        <Form
          qualityData={qualityData}
          videoURL={videoURL}
          setVideoURL={setVideoURL}
          getQualityData={getQualityData}
          message={message}
          setMessage={setMessage}
          videoData={videoData}
          setVideoData={setVideoData}
        />
      </div>
    </div>
  );
};

export default Index;
