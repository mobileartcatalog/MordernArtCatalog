import React, { Component } from 'react';
import { ScrollView, View, Button, Image } from 'react-native';
import ImagePicker from 'react-native-image-crop-picker';
import styles from '../../stylesheets/art';

export default class MultiImages extends Component {
  constructor(props) {
    super(props);
    this.state = {
      images: null
    };
    this.pickMultiImages = this.pickMultiImages.bind(this);
  }

  pickMultiImages() {
    ImagePicker.openPicker({
      multiple: true,
      waitAnimationEnd: false,
      includeExif: true,
      forceJpg: true
    })
      .then(images => {
        this.setState({
          images: images.map(image => {
            console.log('received image', image);
            return {
              uri: image.path,
              width: image.width,
              height: image.height,
              mime: image.mime
            };
          })
        });
      })
      .catch(err => console.log(err));
  }

  render() {
    return (
      <View>
        <ScrollView horizontal>
          {this.state.images
            ? this.state.images.map(i => (
                <View key={i.url}>
                  <Image source={i} style={styles.thumbnail} />
                </View>
              ))
            : null}
        </ScrollView>
        <Button title='Select More Images' onPress={this.pickMultiImages} />
      </View>
    );
  }
}
