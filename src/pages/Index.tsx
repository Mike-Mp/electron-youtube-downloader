import React from 'react';
import { videoFormat } from 'ytdl-core';
import {
  getVideoFormats,
  getVideoDetails,
} from '../ytdl_functions/videoDataFunctions';

interface IndexProps {
  videoURL: string;
  qualityData: videoFormat[];
}

const Index = () => {
  const [videoURL, setVideoURL] = React.useState<IndexProps['videoURL']>('');
  const [qualityData, setQualityData] = React.useState<
    IndexProps['qualityData']
  >([]);

  const getQualityData = async () => {
    const data = await getVideoFormats(videoURL);
    setQualityData(data);
  };

  let optionSection;

  console.log('videoURL', videoURL);
  console.log('qualityData: ', qualityData);

  if (qualityData && qualityData.length > 0 && qualityData.length !== 1) {
    optionSection = qualityData.map((format) => {
      return (
        <option
          key={format.itag}
        >{`${format.qualityLabel} ${format.container} ${format.fps}FPS`}</option>
      );
    });
  } else {
    optionSection = <option disabled>Get data first</option>;
  }

  return (
    <div className="mainPage">
      <div className="downloadBox">
        <h3>Downloader</h3>
        <form>
          <label htmlFor="url">
            Enter video URL
            <input
              type="text"
              name="url"
              id="url"
              onChange={(e) => setVideoURL(e.target.value)}
            />
          </label>
          <fieldset id="vidSelector">
            <legend>Video Quality</legend>
            <button type="button" onClick={getQualityData}>
              Get available quality formats for the video
            </button>
            <select
              name="vidQuality"
              id="vidQuality"
              autoComplete="off"
              required
            >
              {optionSection}
            </select>
          </fieldset>
        </form>
      </div>
    </div>
  );
};

export default Index;
