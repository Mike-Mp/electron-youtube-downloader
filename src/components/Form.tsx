import React, { SetStateAction } from 'react';
import { videoFormat } from 'ytdl-core';
import { getVideoDetails } from '../ytdl_functions/videoDataFunctions';

import MsgBox from './MsgBox';

interface FormProps {
  qualityData: videoFormat[];
  setVideoURL: React.Dispatch<SetStateAction<string>>;
  getQualityData: () => Promise<void>;
  message: string;
}

const Form = ({
  qualityData,
  videoURL,
  setVideoURL,
  getQualityData,
  message,
}: {
  qualityData: FormProps['qualityData'];
  videoURL: string;
  setVideoURL: FormProps['setVideoURL'];
  getQualityData: FormProps['getQualityData'];
  message: FormProps['message'];
}) => {
  const validateURL = () => {
    const result = getVideoDetails(videoURL);

    console.log(result);
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
