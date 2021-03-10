const customStyles = {
  option: (provided, state) => ({
    // ...provided,
    fontWeight: state.isSelected ? 'bold' : 'normal',
    color: 'black',
    backgroundColor: 'white',
    fontSize: state.selectProps.myFontSize,
    padding: 20,
  }),
  singleValue: (provided, state) => ({
    ...provided,
    color: 'black',
  }),
};

export default customStyles;
