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
      <div style={{ width: '50%' }}>
        <legend>Choose format</legend>
        <div className="formatRadio" onChange={(e) => handleOnChange(e)}>
          <label htmlFor="format">Video And Audio</label>
          <input type="radio" name="format" value="videoandaudio" />
          <label htmlFor="format">Video</label>
          <input type="radio" name="format" value="videoonly" />
          <label htmlFor="format">Audio</label>
          <input type="radio" name="format" value="audioonly" />
        </div>
        <button type="button" onClick={getQualityData} disabled={useDefault}>
          available quality formats
        </button>
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
  );
};

export default QualitySection;
