import React from 'react';
import { Switch } from 'react-native';

const StyledSwitch = ({ label, formikKey, formikProps, ...rest }) => {
  const inputStyles = {
    borderWidth: 1,
    borderColor: 'black',
    padding: 10,
    marginBottom: 3
  };

  if (formikProps.touched[formikKey] && formikProps.errors[formikKey]) {
    inputStyles.borderColor = 'red';
  }
  return (
    <Switch
      trackColor={{ false: 'whitesmoke', true: '#f06102' }}
      thumbColor="slategray"
      value={formikProps.values[formikKey]}
      onValueChange={value => {
        formikProps.setFieldValue(formikKey, value);
      }}
      {...rest}
    />
  );
};

export default StyledSwitch;
