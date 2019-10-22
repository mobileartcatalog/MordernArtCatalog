import React from 'react';
import { Image, Dimensions } from 'react-native';
import { arrayBufferToBase64 } from '../../utils';
// import styles from '../../stylesheets/art';

const StyledImage = props => {
  const { image } = props;
  const { windowWidth } = Dimensions.get('window');
  console.log('styled image', image);
  return (
    <Image
      source={{
        uri: `data:${image.contentType};base64,${arrayBufferToBase64(
          image.data.data
        )}`,
      }}
      // style={styles.thumbnail}
      width={windowWidth}
      height={100}
    />
  );
};

export default StyledImage;
