import React from 'react';

import Select from 'react-select';

import { IndexProps } from '../interfaces/interface';

import selectStyles from '../css/selectStyles.jsx';

const QualitySection = ({
  dimensionsRef,
  getQualityData,
  useDefault,
  optionSection,
  setVidAud,
  setVid,
  setAud,
}: {
  dimensionsRef: React.RefObject<HTMLHeadingElement>;
  getQualityData: IndexProps['getQualityData'];
  useDefault: boolean;
  optionSection: any;
  setVidAud: IndexProps['setStateString'];
  setVid: IndexProps['setStateString'];
  setAud: IndexProps['setStateString'];
}) => {
  return (
    <div className="qualitySection" ref={dimensionsRef}>
      <div style={{ width: '50%' }}>
        <legend>Video&Audio Quality</legend>
        <button
          type="button"
          onClick={() => getQualityData('videoandaudio')}
          disabled={useDefault}
        >
          available quality formats(video and audio)
        </button>
        <Select
          disabled={useDefault}
          options={optionSection}
          styles={selectStyles}
          className="customSelect"
          onChange={(e) => {
            if (e) return setVidAud(`${e.value}`);
            return setVidAud('');
          }}
        />
        <button type="button">Download</button>
      </div>
    </div>
  );
};

export default QualitySection;
