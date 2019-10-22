import React from 'react';
import { ScrollView, View, Image } from 'react-native';
import StyledImage from './StyledImage';

const ImageCarousel = props => {
  const { images } = props;
  console.log('carousel props', props);
  return null;
  // return (
  //   <ScrollView horizontal>
  //     {props.images.map(image => {
  //       return (
  //         <View key={image._id}>
  //           <StyledImage image={image} />
  //         </View>
  //       );
  //     })}
  //   </ScrollView>
  // );
};

export default ImageCarousel;
