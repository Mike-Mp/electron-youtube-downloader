import React from 'react';

import {
  getVideoDetails,
  getFormats,
  chosenDownload,
} from '../ytdl_functions/videoDataFunctions';

import optionFiller from '../ytdl_functions/optionFiller';

import MsgBox from './MsgBox';
import VideoDetails from './VideoDetails';
import QualitySection from './QualitySection';
import DownloadBar from './DownloadBar';

import { IndexProps, OptionType } from '../interfaces/interface';

// import '../css/select_styling.css';

declare global {
  interface Window {
    ipcRenderer: Electron.IpcRenderer;
    dialog: Electron.Dialog;
  }
}

const Form = () => {
  const [useDefault, setUseDefault] = React.useState<boolean>(true);
  const [isDownloading, setIsDownloading] = React.useState<boolean>(false);
  const [isWorking, setIsWorking] = React.useState<boolean>(false);

  const [message, setMessage] = React.useState<string>('');

  const [videoURL, setVideoURL] = React.useState<string>('');

  const [formatType, setFormatType] = React.useState<IndexProps['formatType']>(
    'videoandaudio'
  );

  const [typeOfDownload, setTypeOfDownload] = React.useState('');

  const [qualityData, setQualityData] = React.useState<
    IndexProps['qualityData']
  >({ data: [], typeOfData: 'videoandaudio' });

  const [videoData, setVideoData] = React.useState<IndexProps['videoData']>({
    msg: '',
  });

  const [itag, setItag] = React.useState('');

  const checkIfDownloadInProgress = () => {
    if (isDownloading) {
      setMessage('Info: Download in progress');
      setTimeout(() => setMessage(''), 5000);
      return true;
    }
    return false;
  };

  const getQualityData = async () => {
    if (checkIfDownloadInProgress()) return;
    if (videoURL.length === 0) {
      setMessage('Info: Empty video URL');
      setTimeout(() => setMessage(''), 5000);
      return;
    }
    const data = await getFormats(videoURL, formatType);
    if (data[0].msg) {
      setMessage(data[0].msg);
      setTimeout(() => setMessage(''), 5000);
      return;
    }
    setQualityData({ data, typeOfData: formatType });
  };

  const userChosenFormat = async () => {
    if (itag.length === 0) {
      setMessage('Please choose a format');
      setTimeout(() => setMessage(''), 3000);
    }
  };

  const handleItagChange = (e: { label: string; value: number } | null) => {
    if (e) {
      setItag(`${e.value}`);
      return;
    }
    setItag('');
  };

  const handleDownload = (type: string) => {
    console.log(`${type} download`);
    setTypeOfDownload(type);
    setIsWorking(true);
  };

  const handleChosenFormatDownload = () => {
    console.log(`${itag}: itag`);
    setIsWorking(true);
  }

  const getDetails = async () => {
    if (checkIfDownloadInProgress()) return;
    if (videoURL.length === 0) {
      if (message.length > 0) {
        return;
      }
      setMessage('Info: Empty video URL');
      setTimeout(() => setMessage(''), 5000);
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
        <div className="inputSubsection">
          <h3>Downloader</h3>
          <label htmlFor="url" id="urlLabel">
            Enter video URL/ID
          </label>
          <input
            type="text"
            name="url"
            id="url"
            disabled={isDownloading}
            onChange={(e) => setVideoURL(e.target.value)}
          />
          <button
            type="button"
            id="downloadDefault"
            onClick={() => handleDownload('highestaudioandvideo')}
            disabled={isDownloading}
          >
            highest audio and video
          </button>
          <button
            type="button"
            id="downloadDefault"
            onClick={() => handleDownload('highestaudio')}
            disabled={isDownloading}
          >
            highest audio
          </button>
          <button
            type="button"
            id="downloadDefault"
            onClick={() => handleDownload('highestvideo')}
            disabled={isDownloading}
          >
            highest video
          </button>
          <button
            type="button"
            id="getDetails"
            onClick={getDetails}
            disabled={isDownloading}
          >
            Get video metadata
          </button>
        </div>
      {/* <div className="useSpecific">
        <label htmlFor="checkbox">Use defaults</label>
        <input
          type="checkbox"
          id="checkbox"
          checked={useDefault}
          onChange={handleUseDefault}
          disabled={isDownloading}
        />
      </div> */}
      <fieldset id="vidSelector">
        <QualitySection
          getQualityData={getQualityData}
          useDefault={useDefault}
          optionSection={optionSection}
          setFormatType={setFormatType}
          handleItagChange={handleItagChange}
          handleChosenFormatDownload={handleChosenFormatDownload}
        />
      </fieldset>
      <DownloadBar
        url={videoURL}
        setIsDownloading={setIsDownloading}
        isWorking={isWorking}
        setIsWorking={setIsWorking}
        setMessage={setMessage}
        typeOfDownload={typeOfDownload}
        formatType={formatType}
        itag={itag}
      />
      <VideoDetails videoData={videoData} />
    </form>
  );
};

export default Form;
