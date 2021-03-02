import React from 'react';
import {} from '../ytdl_functions/testing';

const Index = () => {
  const [videoURL, setVideoURL] = React.useState('');
  const [qualityData, setQualityData] = React.useState([]);

  const getQualityData = (vidUrl) => {};

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
            <button type="button" onClick={}>
              Get available quality formats for the video
            </button>
            <select
              name="vidQuality"
              id="vidQuality"
              autoComplete="off"
              required
            >
              <option>Carrots</option>
              <option>Peas</option>
              <option>Beans</option>
              <option>Pneumonoultramicroscopicsilicovolcanoconiosis</option>
            </select>
          </fieldset>
        </form>
      </div>
    </div>
  );
};

export default Index;
