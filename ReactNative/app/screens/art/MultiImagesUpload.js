import React, { Component } from 'react';
import { ScrollView, View, Button, Image } from 'react-native';
import ImagePicker from 'react-native-image-crop-picker';
import styles from '../../stylesheets/art';
import { connect } from 'react-redux';
import { uploadImagesthunk } from '../../reducers/artReducer/editArtwork';

export class MultiImages extends Component {
  constructor(props) {
    super(props);
    this.state = {
      images: null
    };
    this.pickMultiImages = this.pickMultiImages.bind(this);
    this.handleUpload = this.handleUpload.bind(this);
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
            // console.log('received image', image);
            return {
              uri: image.path,
              width: image.width,
              height: image.height,
              type: image.mime,
              name: image.filename
            };
          })
        });
      })
      .catch(err => console.log(err));
  }

  handleUpload() {
    const { uploadImages, artworkId } = this.props;
    uploadImages(artworkId, this.state.images);
    this.setState({
      images: null
    });
  }

  render() {
    return (
      <View>
        <Button title='Select More Images' onPress={this.pickMultiImages} />
        <ScrollView horizontal>
          {this.state.images
            ? this.state.images.map((i, index) => (
                <View key={index}>
                  <Image source={i} style={styles.thumbnail} />
                </View>
              ))
            : null}
        </ScrollView>
        <Button title='Upload' onPress={this.handleUpload} />
      </View>
    );
  }
}

const mapDispatch = dispatch => ({
  uploadImages: (id, images) => dispatch(uploadImagesthunk(id, images))
});

export default connect(
  null,
  mapDispatch
)(MultiImages);
