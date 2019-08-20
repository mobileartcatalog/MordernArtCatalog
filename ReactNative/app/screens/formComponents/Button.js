import React from 'react';
import { Button } from 'react-native-elements';
import styles from '../../stylesheets/forms';

const StyledButton = ({ ...rest }) => {
  return (
    <Button
      buttonStyle={styles.primaryButton}
      titleStyle={styles.primaryButtonText}
      {...rest}
    />
  );
};

export default StyledButton;
