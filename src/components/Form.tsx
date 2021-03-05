import React from 'react';
import { getVideoDetails } from '../ytdl_functions/videoDataFunctions';

import MsgBox from './MsgBox';

import { IndexProps } from '../interfaces/interface';

const Form = ({
  qualityData,
  videoURL,
  setVideoURL,
  getQualityData,
  message,
  setMessage,
  videoData,
  setVideoData,
}: {
  qualityData: IndexProps['qualityData'];
  videoURL: string;
  setVideoURL: IndexProps['setStateString'];
  getQualityData: IndexProps['getQualityData'];
  message: string;
  setMessage: IndexProps['setStateString'];
  videoData: IndexProps['videoData'];
  setVideoData: IndexProps['setVideoData'];
}) => {
  const validateURL = async () => {
    if (videoURL.length === 0) {
      setMessage('Error: Empty video URL');
      setTimeout(() => setMessage(''), 8000);
      return;
    }

    const details = await getVideoDetails(videoURL);

    console.log(details);
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
    <form>
      <MsgBox message={message} />
      <label htmlFor="url" id="urlLabel">
        Enter video URL
      </label>
      <input
        type="text"
        name="url"
        id="url"
        onChange={(e) => setVideoURL(e.target.value)}
      />
      <button type="button" id="validateURL" onClick={validateURL}>
        VALIDATE
      </button>
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
            defaultValue={qualityData ? qualityData[0]?.itag : 'Get data first'}
            required
          >
            {optionSection}
          </select>
        </div>
      </fieldset>
    </form>
  );
};

export default Form;
