import React from 'react';

import ytdl from 'ytdl-core';

import {
  getVideoDetails,
  downloadDefault,
} from '../ytdl_functions/videoDataFunctions';

import optionFiller from '../ytdl_functions/optionFiller';

import MsgBox from './MsgBox';
import VideoDetails from './VideoDetails';
import QualitySection from './QualitySection';

import { IndexProps, OptionType } from '../interfaces/interface';

import '../css/select_styling.css';

const Form = ({
  qualityData,
  videoURL,
  setVideoURL,
  getQualityData,
  message,
  setMessage,
  videoData,
  setVideoData,
  setFormatType,
  setItag,
}: {
  qualityData: IndexProps['qualityData'];
  videoURL: string;
  setVideoURL: IndexProps['setStateString'];
  getQualityData: IndexProps['getQualityData'];
  message: string;
  setMessage: IndexProps['setStateString'];
  videoData: IndexProps['videoData'];
  setVideoData: IndexProps['setVideoData'];
  setFormatType: IndexProps['setFormatType'];
  setItag: IndexProps['setStateString'];
}) => {
  const [useDefault, setUseDefault] = React.useState<boolean>(true);

  const dimensionsRef = React.useRef<HTMLHeadingElement>(null);
  const [qualityDimensions, setQualityDimensions] = React.useState({
    width: 0,
    height: 0,
  });

  React.useEffect(() => {
    if (dimensionsRef.current) {
      setQualityDimensions({
        width: dimensionsRef.current.getBoundingClientRect().width,
        height: dimensionsRef.current.getBoundingClientRect().height,
      });
    }
  }, [dimensionsRef]);

  const handleItagChange = (e: { label: string; value: number } | null) => {
    if (e) {
      setItag(`${e.value}`);
      return;
    }
    setItag('');
  };

  const handleDefaultDownload = () => {
    downloadDefault(videoURL);
  };

  const handleUseDefault = (e: {
    target: { checked: boolean | ((prevState: boolean) => boolean) };
  }) => {
    setUseDefault(!useDefault);
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

    setVideoData(details);
  };

  let optionSection: { value: any; label: string }[] = [];

  optionSection = optionFiller(qualityData.data, qualityData.typeOfData);

  return (
    <form>
      <MsgBox message={message} />
      <div className="topSection">
        <div className="inputSubsection">
          <h3>Downloader</h3>
          <label htmlFor="url" id="urlLabel">
            Enter video URL/ID
          </label>
          <input
            type="text"
            name="url"
            id="url"
            onChange={(e) => setVideoURL(e.target.value)}
          />
          <button
            type="button"
            id="downloadDefault"
            onClick={handleDefaultDownload}
          >
            Download (default settings)
          </button>
          <button type="button" id="getDetails" onClick={getDetails}>
            Get video details
          </button>
        </div>
      </div>
      <div className="useSpecific">
        <label htmlFor="checkbox">Use defaults</label>
        <input
          type="checkbox"
          id="checkbox"
          checked={useDefault}
          onChange={(e) => handleUseDefault(e)}
        />
      </div>
      <fieldset id="vidSelector">
        <div
          className={`hide${useDefault.toString().toUpperCase()}`}
          style={{
            width: qualityDimensions.width,
            height: qualityDimensions.height,
          }}
        />
        <QualitySection
          dimensionsRef={dimensionsRef}
          getQualityData={getQualityData}
          useDefault={useDefault}
          optionSection={optionSection}
          setFormatType={setFormatType}
          handleItagChange={handleItagChange}
        />
      </fieldset>

      <VideoDetails videoData={videoData} />
    </form>
  );
};

export default Form;
