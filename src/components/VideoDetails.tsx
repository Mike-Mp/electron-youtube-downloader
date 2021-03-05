import React from 'react';
import { IndexProps } from '../interfaces/interface';

import Description from './Description';

const VideoDetails = ({
  videoData,
}: {
  videoData: IndexProps['videoData'];
}) => {
  if (videoData !== undefined && videoData.details !== undefined) {
    const { title, description } = videoData.details;
    const { timeString } = videoData;
    const imgURL = videoData.details.thumbnails[3].url;

    return (
      <div className="detailsBox">
        <div className="imgSection">
          <img src={imgURL} alt="video thumbnail" />
        </div>
        <div className="detailsSection">
          <h3>{title}</h3>
          <h4>Duration [{timeString}]</h4>
          <Description description={description} />
        </div>
      </div>
    );
  }

  return null;
};

export default VideoDetails;
