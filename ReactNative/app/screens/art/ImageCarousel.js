import React from 'react';
import {
  ScrollView,
  View,
  Image,
  Animated,
  Dimensions,
  Button,
} from 'react-native';
import { arrayBufferToBase64 } from '../../utils';
import { StyledSecondaryButton } from '../formComponents';
import styles from '../../stylesheets/art';

const ImageCarousel = props => {
  const { images } = props;
  const windowWidth = Dimensions.get('window').width;
  console.log('carousel props', props);
  return (
    <React.Fragment>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={true}
        scrollEventThrottle={10}
        pagingEnabled
        onScroll={Animated.event([
          { nativeEvent: { contentOffset: { x: this.animVal } } },
        ])}
      >
        {images.map(image => {
          return (
            <View key={image._id}>
              <Image
                style={styles.imageCarousel}
                resizeMode="contain"
                resizeMethod="resize"
                source={{
                  uri: `data:${image.contentType};base64,${arrayBufferToBase64(
                    image.data.data
                  )}`,
                }}
                style={{
                  width: windowWidth,
                  height: 250,
                }}
              />
              <Button
                style={styles.button}
                title="delete image"
                onPress={() =>
                  Alert.alert(
                    'Delete?',
                    'Are you sure you want to permanently delete this image?',
                    [
                      {
                        text: 'Cancel',
                        onPress: () => console.log('Cancel Pressed'),
                        style: 'cancel',
                      },
                      {
                        text: 'Delete',
                        onPress: () => this.props.deleteImage(image._id),
                      },
                    ]
                  )
                }
              />
              <StyledSecondaryButton
                title="set as main image"
                onPress={() => this.props.setMainImage(image._id, artwork._id)}
              />
            </View>
          );
        })}
      </ScrollView>
    </React.Fragment>
  );
};

export default ImageCarousel;
