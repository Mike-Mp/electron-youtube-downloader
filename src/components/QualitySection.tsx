import React from 'react';

import Select from 'react-select';

import { IndexProps } from '../interfaces/interface';

import selectStyles from '../css/selectStyles.jsx';

const QualitySection = ({
  dimensionsRef,
  getQualityData,
  useDefault,
  optionSection,
  setFormatType,
  handleItagChange,
}: {
  dimensionsRef: React.RefObject<HTMLHeadingElement>;
  getQualityData: IndexProps['getQualityData'];
  useDefault: boolean;
  optionSection: any;
  setFormatType: IndexProps['setFormatType'];
  handleItagChange: (
    e: {
      label: string;
      value: string;
    } | null
  ) => any;
}) => {
  const handleOnChange = (e: any) => {
    setFormatType(e.target.value);
  };

  return (
    <div className="qualitySection" ref={dimensionsRef}>
      <div style={{ width: '50%' }}>
        <legend>Choose format</legend>
        <div className="formatRadio" onChange={(e) => handleOnChange(e)}>
          <label htmlFor="format">Video And Audio</label>
          <input type="radio" name="format" value="videoandaudio" />
          <label htmlFor="format">Video</label>
          <input type="radio" name="format" value="video" />
          <label htmlFor="format">Audio</label>
          <input type="radio" name="format" value="audio" />
        </div>
        <button type="button" onClick={getQualityData} disabled={useDefault}>
          available quality formats
        </button>
        <Select
          disabled={useDefault}
          options={optionSection}
          styles={selectStyles}
          className="customSelect"
          onChange={(e) => handleItagChange(e)}
        />
        <button type="button">Download</button>
      </div>
    </div>
  );
};

export default QualitySection;
