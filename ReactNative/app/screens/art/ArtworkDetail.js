import React, { Component } from 'react';
import { connect } from 'react-redux';
import { View, Text, Dimensions, ScrollView, Image } from 'react-native';
import ScaledImage from 'react-native-scaled-image';
import { getArtworkDetail } from '../../reducers/artReducer/getArtworkDetail';
import styles from '../../stylesheets/art';
import { arrayBufferToBase64 } from '../../utils';
import MultiImages from './MultiImagesUpload';

class ArtworkDetail extends Component {
  componentDidMount() {
    const id = this.props.navigation.getParam('id');
    this.props.getArtworkDetail(id);
  }

  render() {
    const { artwork, images } = this.props;
    const { width } = Dimensions.get('window');
    console.log('artwirk in detal!!!', artwork);
    if (artwork.img1) {
      return (
        <ScrollView>
          <ScaledImage
            source={{
              uri: `data:${
                artwork.img1.contentType
              };base64,${arrayBufferToBase64(artwork.img1.data.data)}`
            }}
            width={width}
          />
          <Text>{artwork.title}</Text>
          <Text>{artwork.date}</Text>
          <Text>{artwork.medium}</Text>
          <Text>{artwork.dimensions}</Text>
          {images.length ? (
            <ScrollView horizontal>
              {images.map(image => {
                console.log('image arr', image);
                return (
                  <View key={image._id}>
                    <Image
                      source={{
                        uri: `data:${
                          image.contentType
                        };base64,${arrayBufferToBase64(image.data.data)}`
                      }}
                      style={styles.thumbnail}
                    />
                  </View>
                );
              })}
            </ScrollView>
          ) : null}
          <MultiImages artworkId={artwork._id} />
        </ScrollView>
      );
    }
    return <Text>loading</Text>;
  }
}

const mapState = state => {
  return {
    artwork: state.art.selected,
    images: state.art.images,
    loading: state.art.loading
  };
};

const mapDispatch = dispatch => ({
  getArtworkDetail: id => dispatch(getArtworkDetail(id))
});

export default connect(
  mapState,
  mapDispatch
)(ArtworkDetail);
