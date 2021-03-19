import React from 'react';

import Select from 'react-select';

import { IndexProps } from '../interfaces/interface';

import selectStyles from '../css/selectStyles.jsx';
import { FormControlLabel, Radio, RadioGroup } from '@material-ui/core';

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
      itag: number;
    } | null
  ) => any;
}) => {
  const [defaultOptionValue, setDefaultOptionValue] = React.useState({
    itag: 0,
    label: 'Get data first',
  });

  React.useEffect(() => {
    return setDefaultOptionValue(optionSection[0]?.label);
  }, [optionSection]);

  const handleOnChange = (e: any) => {
    setFormatType(e.target.value);
  };

  console.log(defaultOptionValue);

  return (
    <div className="qualitySection" ref={dimensionsRef}>
      <div style={{ width: '50%', paddingBottom: '20px' }}>
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
        <button type="button" onClick={getQualityData} disabled={useDefault}>
          Get available quality formats
        </button>
        <div className="selectDownload">
          <Select
            disabled={useDefault}
            options={optionSection}
            defaultValue={defaultOptionValue}
            styles={selectStyles}
            className="customSelect"
            onChange={(e) => handleItagChange(e)}
          />
          <button type="button">Download</button>
        </div>
      </div>
    </div>
  );
};

export default QualitySection;
