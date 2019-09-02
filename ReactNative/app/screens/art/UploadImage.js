import React, { Component } from 'react';
import { View, Button, Image, Text } from 'react-native';
import ImagePicker from 'react-native-image-picker';

export default class UploadImage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      artworkImage: null
    };
    this.handleChoosePhoto = this.handleChoosePhoto.bind(this);
  }

  componentDidUpdate(prevProps) {
    if (this.props.imageShow !== prevProps.imageShow) {
      this.setState({ artworkImage: null });
    }
  }

  handleChoosePhoto = () => {
    const option = {
      title: 'Select Artwork',
      noData: true,
      takePhotoButtonTitle: 'Take Photo...',
      chooseFromLibraryButtonTitle: 'Choose from Library...'
    };

    const { getimageData } = this.props;
    ImagePicker.showImagePicker(option, res => {
      console.log('Response = ', res);
      getimageData(res);
      if (res.didCancel) {
        console.log('User cancelled image picker');
      } else if (res.error) {
        console.log('ImagePicker Error: ', res.error);
      } else {
        const source = { uri: res.uri };
        this.setState({
          artworkImage: source
        });
      }
    });
  };

  render() {
    const { artworkImage } = this.state;
    return (
      <View stype={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        {artworkImage && (
          <Image
            source={{ uri: artworkImage.uri }}
            style={{ width: 300, height: 300, alignSelf: 'center' }}
          />
        )}
        <Button title='Choose Photo' onPress={this.handleChoosePhoto} />
      </View>
    );
  }
}
