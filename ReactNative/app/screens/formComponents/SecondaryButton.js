import React from 'react';
import { Button } from 'react-native-elements';
import styles from '../../stylesheets/forms';

const StyledSecondaryButton = ({ ...rest }) => {
  return (
    <Button
      buttonStyle={styles.secondaryButton}
      titleStyle={styles.buttonText}
      {...rest}
    />
  );
};

export default StyledSecondaryButton;
