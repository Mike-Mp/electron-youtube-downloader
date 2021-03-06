const customStyles = {
  option: (
    provided: any,
    state: { isSelected: any; selectProps: { myFontSize: any } }
  ) => ({
    // ...provided,
    fontWeight: state.isSelected ? 'bold' : 'normal',
    color: 'black',
    backgroundColor: 'white',
    fontSize: state.selectProps.myFontSize,
    padding: 20,
  }),
  singleValue: (provided: any, state: any) => ({
    ...provided,
    color: 'black',
  }),
} as const;

export default customStyles;
