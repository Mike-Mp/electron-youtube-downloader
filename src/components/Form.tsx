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
  const [itagValue, setItagValue] = React.useState<string>('');

  const handleItagChange = (e: { label: string; value: string } | null) => {
    if (e) return setItagValue(`${e.value}`);
    return setItagValue('');
  };

  const getDetails = async () => {
    if (videoURL.length === 0) {
      if (message.length > 0) {
        return;
      }
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

  const optionSection: any = [];

  console.log(qualityData);
  if (qualityData && qualityData.length > 0 && qualityData.length !== 1) {
    qualityData.map((format) => {
      return optionSection.push({
        value: format.itag,
        label: `${format.qualityLabel} ${format.container} ${format.fps}FPS`,
      });
    });
  } else {
    optionSection.push({
      value: 0,
      label: 'Get quality data first',
    });
  }

  console.log(optionSection);
  return (
    <form>
      <MsgBox message={message} />
      <div className="topSection">
        <div className="inputSubsection">
          <h3>Downloader</h3>
          <label htmlFor="url" id="urlLabel">
            Enter video URL
          </label>
          <input
            type="text"
            name="url"
            id="url"
            onChange={(e) => setVideoURL(e.target.value)}
          />
          <button type="button" id="downloadDefault">
            Download (default settings)
          </button>
          <button type="button" id="getDetails" onClick={getDetails}>
            Get video details
          </button>
        </div>
      </div>
      <fieldset id="vidSelector">
        <div>
          <legend>Video Quality</legend>
          <button type="button" onClick={getQualityData}>
            Get available quality formats for the video
          </button>
          <Select
            options={optionSection}
            styles={selectStyles}
            className="customSelect"
            onChange={(e) => handleItagChange(e)}
          />
        </div>
        <div>
          <legend>Quality</legend>
        </div>
      </fieldset>

      <VideoDetails videoData={videoData} />
    </form>
  );
};

export default Form;
