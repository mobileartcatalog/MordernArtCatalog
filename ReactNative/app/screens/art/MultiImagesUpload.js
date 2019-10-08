import React, { Component } from 'react';
import { ScrollView, View, Button, Image } from 'react-native';
import { withNavigation } from 'react-navigation';
import { StyledButton, StyledSecondaryButton } from '../formComponents';
import ImagePicker from 'react-native-image-crop-picker';
import styles from '../../stylesheets/art';
import { connect } from 'react-redux';
import { uploadImagesthunk } from '../../reducers/artReducer/editArtwork';

export class MultiImages extends Component {
  constructor(props) {
    super(props);
    this.state = {
      images: null,
    };
    this.pickMultiImages = this.pickMultiImages.bind(this);
    this.handleUpload = this.handleUpload.bind(this);
  }

  pickMultiImages() {
    ImagePicker.openPicker({
      multiple: true,
      waitAnimationEnd: false,
      includeExif: true,
      forceJpg: true,
    })
      .then(images => {
        this.setState({
          images: images.map(image => {

            return {
              uri: image.path,
              width: image.width,
              height: image.height,
              type: image.mime,
              name: image.filename,
            };
          }),
        });
      })
      .catch(err => console.log(err));
  }

  handleUpload() {
    const { uploadImages, artworkId } = this.props;

    uploadImages(artworkId, this.state.images);
    this.setState({
      images: null,
    });
    this.props.navigation.navigate('ArtworkDetail', {
      id: artworkId,
    });
  }

  render() {
    return (
      <View>
        {this.state.images ? (
          <View>
            <StyledButton title="save images" onPress={this.handleUpload} />
            <StyledSecondaryButton
              title="add more images"
              onPress={this.pickMultiImages}
            />

            <ScrollView horizontal>
              {this.state.images
                ? this.state.images.map((i, index) => (
                    <View key={index}>
                      <Image source={i} style={styles.thumbnail} />
                    </View>
                  ))
                : null}
            </ScrollView>
          </View>
        ) : (
          <View>
            <StyledSecondaryButton
              title="add more images"
              onPress={this.pickMultiImages}
            />
          </View>
        )}
      </View>
    );
  }
}

// <View>
//   <StyledSecondaryButton title="Upload" onPress={this.handleUpload} />
//   <StyledSecondaryButton
//     title="add more images"
//     onPress={this.pickMultiImages}
//   />

//   <ScrollView horizontal>
//     {this.state.images
//       ? this.state.images.map((i, index) => (
//           <View key={index}>
//             <Image source={i} style={styles.thumbnail} />
//           </View>
//         ))
//       : null}
//   </ScrollView>
// </View>

const mapDispatch = dispatch => ({
  uploadImages: (id, images) => dispatch(uploadImagesthunk(id, images)),
});

export default withNavigation(
  connect(
    null,
    mapDispatch
  )(MultiImages)
);
