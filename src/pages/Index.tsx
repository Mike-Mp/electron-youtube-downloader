import React from 'react';
import { videoFormat } from 'ytdl-core';
import {
  getVideoFormats,
  getVideoDetails,
} from '../ytdl_functions/videoDataFunctions';

import '../css/select_styling.css';
import MsgBox from '../components/MsgBox';

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

  console.log('MESSAGE', message);

  const getQualityData = async () => {
    const data = await getVideoFormats(videoURL);
    console.log(data[0]);
    if (data[0].msg) {
      console.log('data', data[0].msg);
      setMessage(data[0].msg);
      setTimeout(() => setMessage(''), 8000);
      return;
    }
    setQualityData(data);
  };

  let optionSection;

  if (qualityData && qualityData.length > 0 && qualityData.length !== 1) {
    optionSection = qualityData.map((format) => {
      return (
        <option
          key={format.itag}
          value={format.itag}
        >{`${format.qualityLabel} ${format.container} ${format.fps}FPS`}</option>
      );
    });
  } else {
    optionSection = <option disabled>Get data first</option>;
  }

  return (
    <div className="mainPage">
      <MsgBox message={message} />
      <div className="downloadBox">
        <h3>Downloader</h3>
        {/* <div className={message.includes('Error:') ? 'errorBox' : 'infoBox'}>
          <h5 id="messageText">{message}</h5>
        </div> */}
        <form>
          <label htmlFor="url" id="urlLabel">
            Enter video URL
          </label>
          <input
            type="text"
            name="url"
            id="url"
            onChange={(e) => setVideoURL(e.target.value)}
          />
          <fieldset id="vidSelector">
            <legend>Video Quality</legend>
            <button type="button" onClick={getQualityData}>
              Get available quality formats for the video
            </button>
            <div id="select">
              <select
                name="vidQuality"
                id="vidQuality"
                autoComplete="off"
                required
              >
                {optionSection}
              </select>
            </div>
          </fieldset>
        </form>
      </div>
    </div>
  );
};

export default Index;
