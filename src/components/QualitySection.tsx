import React from 'react';

import Select from 'react-select';

import { FormControlLabel, Radio, RadioGroup } from '@material-ui/core';

import { IndexProps } from '../interfaces/interface';

import selectStyles from '../css/selectStyles';

import { radioStyles } from '../css/makeStyles';

const QualitySection = ({
  getQualityData,
  optionSection,
  setFormatType,
  handleItagChange,
  handleChosenFormatDownload,
  optionValue,
  setOptionValue,
}: {
  getQualityData: IndexProps['getQualityData'];
  optionSection: any;
  setFormatType: IndexProps['setFormatType'];
  handleItagChange: (
    e: {
      label: string;
      value: number;
    } | null
  ) => any;
  handleChosenFormatDownload: () => void;
  optionValue: {
    value: number;
    label: string;
  };
  setOptionValue: React.Dispatch<
    React.SetStateAction<{
      value: number;
      label: string;
    }>
  >;
}) => {
  const classes = radioStyles();

  const handleOnChange = (e: any) => {
    setFormatType(e.target.value);
  };

  const handleSelectChange = (e: { value: number; label: string } | null) => {
    if (!e) return;
    setOptionValue({ value: e.value, label: e.label });
  };

  return (
    <div className="qualitySection">
      <div className="radioGroup">
        <legend>Choose format</legend>
        <RadioGroup
          aria-label="format type"
          name="typeFormat"
          onChange={handleOnChange}
        >
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
        <button type="button" onClick={getQualityData}>
          Get available quality formats
        </button>
        <div className="selectDownload">
          <Select
            options={optionSection}
            value={optionValue}
            defaultValue={{ value: 0, label: 'Get data first' }}
            styles={selectStyles}
            className="customSelect"
            onChange={(e: { value: number; label: string } | null) => {
              handleItagChange(e);
              handleSelectChange(e);
            }}
          />
          <button type="button" onClick={() => handleChosenFormatDownload()}>
            Choose
          </button>
        </div>
      </div>
    </div>
  );
};

export default QualitySection;
