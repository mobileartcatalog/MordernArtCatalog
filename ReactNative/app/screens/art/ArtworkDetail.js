import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  View,
  Text,
  Dimensions,
  ScrollView,
  Image,
  Button,
  Alert
} from 'react-native';
import ScaledImage from 'react-native-scaled-image';
import { getArtworkDetail } from '../../reducers/artReducer/getArtworkDetail';
import { deleteArtwork } from '../../reducers/artReducer/deleteArtwork';
import styles from '../../stylesheets/art';
import { arrayBufferToBase64 } from '../../utils';
import MultiImages from './MultiImagesUpload';

class ArtworkDetail extends Component {
  componentDidMount() {
    const id = this.props.navigation.getParam('id');
    this.props.getArtworkDetail(id);
    this.handleDelete = this.handleDelete.bind(this);
  }

  handleDelete() {
    const id = this.props.navigation.getParam('id');
    this.props.deleteArtwork(id);
    //Do I need to clear the state.seleted??
    this.props.navigation.navigate('ArtworkList');
  }
  render() {
    const { artwork, images } = this.props;
    const { width } = Dimensions.get('window');

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
          {artwork.height ? (
            <Text>{artwork.height.$numberDecimal}" height</Text>
          ) : null}
          {artwork.width ? (
            <Text>{artwork.width.$numberDecimal}" width</Text>
          ) : null}
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
          <Button
            title='Delete Artwork'
            onPress={() =>
              Alert.alert(
                'Delete?',
                'Are you sure you want to permanently delete this artwork?',
                [
                  {
                    text: 'Cancel',
                    onPress: () => console.log('Cancel Pressed'),
                    style: 'cancel'
                  },
                  {
                    text: 'Delete',
                    onPress: () => this.handleDelete()
                  }
                ]
              )
            }
          />
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
  getArtworkDetail: id => dispatch(getArtworkDetail(id)),
  deleteArtwork: id => dispatch(deleteArtwork(id))
});

export default connect(
  mapState,
  mapDispatch
)(ArtworkDetail);
