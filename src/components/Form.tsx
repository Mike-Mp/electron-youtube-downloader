import React from 'react';

import Select from 'react-select';

import { getVideoDetails } from '../ytdl_functions/videoDataFunctions';

import MsgBox from './MsgBox';
import VideoDetails from './VideoDetails';

import { IndexProps, OptionType } from '../interfaces/interface';

import '../css/select_styling.css';
import selectStyles from '../css/selectStyles';

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
  const getDetails = async () => {
    if (videoURL.length === 0) {
      setMessage('Info: Empty video URL');
      setTimeout(() => setMessage(''), 8000);
      return;
    }

    const details = await getVideoDetails(videoURL);

    if (details?.msg) {
      setMessage('Error: Invalid video URL');
      setTimeout(() => setMessage(''), 8000);
      return;
    }

    console.log(details);
    setVideoData(details);
  };

  const optionSection: OptionType[] = [];

  console.log(qualityData);
  if (qualityData && qualityData.length > 0 && qualityData.length !== 1) {
    // optionSection = qualityData.map((format) => {
    //   return (
    //     <option
    //       key={format.itag}
    //       value={format.itag}
    //     >{`${format.qualityLabel} ${format.container} ${format.fps}FPS`}</option>
    //   );
    // });

    qualityData.map((format) => {
      return optionSection.push({
        value: format.itag,
        label: `${format.qualityLabel} ${format.container} ${format.fps}FPS`,
      });
    });
  } else {
    // optionSection = <option disabled>Get data first</option>;
    optionSection.push({
      value: 0,
      label: 'Get quality data first',
    });
  }

  return (
    <form>
      <MsgBox message={message} />
      <div className="topSection">
        <div className="inputSubsection">
          <label htmlFor="url" id="urlLabel">
            Enter video URL
          </label>
          <input
            type="text"
            name="url"
            id="url"
            onChange={(e) => setVideoURL(e.target.value)}
          />
          <button type="button" id="getDetails" onClick={getDetails}>
            Get video details
          </button>
        </div>
        <VideoDetails videoData={videoData} />
      </div>
      <fieldset id="vidSelector">
        <legend>Video Quality</legend>
        <button type="button" onClick={getQualityData}>
          Get available quality formats for the video
        </button>
        <Select options={optionSection} styles={selectStyles} required />
      </fieldset>
    </form>
  );
};

export default Form;
