import React from 'react';
import { Switch } from 'react-native';
import styles from '../../stylesheets/forms';

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
      style={styles.switch}
      trackColor={{ false: 'lightslategray', true: '#74c29e' }}
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
