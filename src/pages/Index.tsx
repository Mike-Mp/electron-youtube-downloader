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
        </form>
      </div>
    </div>
  );
};

export default Index;
