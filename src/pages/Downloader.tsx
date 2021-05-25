import React from 'react';

import Form from '../components/Form';

import { IndexProps } from '../interfaces/interface';

const Downloader = () => {
  console.log('DOWNLOADER RERENDER');
  return (
    <div className="mainPage">
      <div className="downloadBox">
        <Form />
      </div>
    </div>
  );
};

export default Downloader;
