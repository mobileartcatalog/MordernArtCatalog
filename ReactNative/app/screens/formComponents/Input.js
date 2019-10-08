import React from 'react';
import { Text, View } from 'react-native';
import { Input } from 'react-native-elements';
import styles from '../../stylesheets/forms';

const StyledInput = ({ formikKey, formikProps, ...rest }) => {
  const inputStyles = {
    width: '80%',
    height: 40,
    backgroundColor: 'whitesmoke',
    borderRadius: 8,
    borderWidth: 0.5,
    borderColor: 'lightgray',
  };

  if (formikProps.touched[formikKey] && formikProps.errors[formikKey]) {
    inputStyles.borderColor = '#1dbf53';
  }

  return (
    <React.Fragment>
      <Input
        containerStyle={inputStyles}
        inputContainerStyle={styles.inputText}
        autoCapitalize="none"
        onChangeText={formikProps.handleChange(formikKey)}
        onBlur={formikProps.handleBlur(formikKey)}
        {...rest}
      />
      <Text style={styles.errorMessage}>
        {formikProps.touched[formikKey] && formikProps.errors[formikKey]}
      </Text>
    </React.Fragment>
  );
};

export default StyledInput;
