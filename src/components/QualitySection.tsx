import React from 'react';

import Select from 'react-select';

import { FormControlLabel, Radio, RadioGroup } from '@material-ui/core';

import { IndexProps } from '../interfaces/interface';

import selectStyles from '../css/selectStyles.jsx';

import { radioStyles } from '../css/makeStyles';

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
  const classes = radioStyles();

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
          aria-label="format type"
          name="typeFormat"
          onChange={handleOnChange}
        >
          <FormControlLabel
            value="videoandaudio"
            aria-label="video and audio"
            control={<Radio color="default" classes={{ root: classes.root }} />}
            label="Video and Audio"
            classes={{ label: classes.label }}
          />
          <FormControlLabel
            value="videoonly"
            aria-label="video only"
            control={<Radio color="default" classes={{ root: classes.root }} />}
            label="Video"
            classes={{ label: classes.label }}
          />
          <FormControlLabel
            value="audioonly"
            aria-label="audio only"
            control={<Radio color="default" classes={{ root: classes.root }} />}
            label="Audio"
            classes={{ label: classes.label }}
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
