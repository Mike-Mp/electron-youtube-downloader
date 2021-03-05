import React from 'react';
import { videoFormat } from 'ytdl-core';
import {
  getVideoFormats,
  getVideoDetails,
} from '../ytdl_functions/videoDataFunctions';

import '../css/select_styling.css';
import Form from '../components/Form';

interface IndexProps {
  videoURL: string;
  qualityData: videoFormat[];
  message: string;
}

const Index = () => {
  const [videoURL, setVideoURL] = React.useState<IndexProps['videoURL']>('');
  const [qualityData, setQualityData] = React.useState<
    IndexProps['qualityData']
  >([]);
  const [message, setMessage] = React.useState<IndexProps['message']>('');
  const [videoData, setVideoData] = React.useState({});

  const getQualityData = async () => {
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
        />
      </div>
    </div>
  );
};

export default Index;
