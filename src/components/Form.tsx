import React, { SetStateAction } from 'react';
import { videoFormat } from 'ytdl-core';

interface FormProps {
  qualityData: videoFormat[];
  setVideoURL: React.Dispatch<SetStateAction<string>>;
  getQualityData: () => Promise<void>;
}

const Form = ({
  qualityData,
  setVideoURL,
  getQualityData,
}: {
  qualityData: FormProps['qualityData'];
  setVideoURL: FormProps['setVideoURL'];
  getQualityData: FormProps['getQualityData'];
}) => {
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
          <select name="vidQuality" id="vidQuality" autoComplete="off" required>
            {optionSection}
          </select>
        </div>
      </fieldset>
    </form>
  );
};

export default Form;
