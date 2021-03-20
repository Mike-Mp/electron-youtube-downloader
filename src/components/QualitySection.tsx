import React from 'react';

import Select from 'react-select';

import { FormControlLabel, Radio, RadioGroup } from '@material-ui/core';

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
      value: number;
    } | null
  ) => any;
}) => {
  const [optionValue, setOptionValue] = React.useState({ value: 0, label: '' });

  const handleOnChange = (e: any) => {
    setFormatType(e.target.value);
  };

  const handleSelectChange = (e: { value: number; label: string } | null) => {
    if (!e) return;
    setOptionValue({ value: e.value, label: e.label });
  };

  console.log(optionValue);

  return (
    <div
      className="qualitySection"
      ref={dimensionsRef}
      style={{ width: '100%', paddingBottom: '20px' }}
    >
      <div className="radioGroup">
        <legend>Choose format</legend>
        <RadioGroup
          aria-label="gender"
          name="typeFormat"
          onChange={handleOnChange}
        >
          <FormControlLabel
            value="videoandaudio"
            control={<Radio color="primary" />}
            label="Video and Audio"
          />
          <FormControlLabel
            value="videoonly"
            control={<Radio color="primary" />}
            label="Video"
          />
          <FormControlLabel
            value="audioonly"
            control={<Radio color="primary" />}
            label="Audio"
          />
        </RadioGroup>
      </div>

      <div className="secondSection">
        <button type="button" onClick={getQualityData} disabled={useDefault}>
          Get available quality formats
        </button>
        <div className="selectDownload">
          <Select
            disabled={!useDefault}
            options={optionSection}
            value={optionValue}
            defaultValue={{ value: 0, label: 'Get data first' }}
            styles={selectStyles}
            className="customSelect"
            onChange={(e) => {
              handleItagChange(e);
              handleSelectChange(e);
            }}
          />
          <button type="button">Download</button>
        </div>
      </div>
    </div>
  );
};

export default QualitySection;
