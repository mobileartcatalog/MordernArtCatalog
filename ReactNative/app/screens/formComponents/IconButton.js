import React from 'react';
import { Button, Icon } from 'react-native-elements';
import styles from '../../stylesheets/forms';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { withNavigation } from 'react-navigation';

const IconButton = ({ ...rest }) => {
  return <Icon {...rest} />;
};

export default withNavigation(IconButton);
