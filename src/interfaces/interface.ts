import { SetStateAction } from 'react';
import { videoFormat } from 'ytdl-core';
import ytdl = require('ytdl-core');

export interface IndexProps {
  qualityData: videoFormat[];
  getQualityData: () => Promise<void>;
  setStateString: React.Dispatch<SetStateAction<string>>;
  videoData:
    | { msg: string; details?: undefined; timeString?: undefined }
    | {
        details: ytdl.MoreVideoDetails;
        timeString: string;
        msg?: undefined;
      };

  setVideoData: React.Dispatch<
    React.SetStateAction<
      | { msg: string; details?: undefined; timeString?: undefined }
      | {
          details: ytdl.MoreVideoDetails;
          timeString: string;
          msg?: undefined;
        }
    >
  >;
}

export type OptionType = {
  value: number;
  label: string;
};
