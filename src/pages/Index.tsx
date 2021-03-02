import React from 'react';

const Index = () => {
  return (
    <div className="mainPage">
      <div className="downloadBox">
        <h3>Downloader</h3>
        <form>
          <label htmlFor="url">
            Enter video URL
            <input type="text" name="url" id="url" />
          </label>
          <fieldset id="custom">
            <legend>Video Quality</legend>
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
