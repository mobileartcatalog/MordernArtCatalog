import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  View,
  Text,
  Dimensions,
  ScrollView,
  Image,
  Button,
  Alert,
} from 'react-native';
import { StyledSecondaryButton } from '../formComponents';
import ScaledImage from 'react-native-scaled-image';
import { getArtworkDetail } from '../../reducers/artReducer/getArtworkDetail';
import { deleteArtwork } from '../../reducers/artReducer/deleteArtwork';
import { updateArtwork } from '../../reducers/artReducer/updateArtwork';
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
    this.props.deleteArtwork(this.props.artwork._id);
    this.props.navigation.navigate('ArtworkList');
  }
  render() {
    const {
      _id,
      title,
      date,
      medium,
      height,
      width,
      depth,
      tags,
      inventorynumber,
    } = this.props.artwork;
    const { artwork, images } = this.props;
    const { windowWidth } = Dimensions.get('window');

    if (artwork.img1) {
      return (
        <ScrollView>
          <StyledSecondaryButton
            title="edit artwork"
            onPress={() =>
              this.props.navigation.navigate('ArtworkEdit', {
                title: 'Edit Artwork',
                searchTerm: this.props.searchTerm,
                filtered: this.props.filtered,
                filteredCount: this.props.filteredCount,
              })
            }
          />
          <ScaledImage
            source={{
              uri: `data:${
                artwork.img1.contentType
              };base64,${arrayBufferToBase64(artwork.img1.data.data)}`,
            }}
            width={windowWidth}
          />
          <Text>{title}</Text>
          <Text>{date}</Text>
          <Text>{medium}</Text>
          {artwork.height ? <Text>{height.$numberDecimal}" height</Text> : null}
          {artwork.width ? <Text>{width.$numberDecimal}" width</Text> : null}
          {images.length ? (
            <ScrollView horizontal>
              {images.map(image => {
                return (
                  <View key={image._id}>
                    <Image
                      source={{
                        uri: `data:${
                          image.contentType
                        };base64,${arrayBufferToBase64(image.data.data)}`,
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
            title="Delete Artwork"
            onPress={() =>
              Alert.alert(
                'Delete?',
                'Are you sure you want to permanently delete this artwork?',
                [
                  {
                    text: 'Cancel',
                    onPress: () => console.log('Cancel Pressed'),
                    style: 'cancel',
                  },
                  {
                    text: 'Delete',
                    onPress: () => this.handleDelete(),
                  },
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
    loading: state.art.loading,
  };
};

const mapDispatch = dispatch => ({
  getArtworkDetail: id => dispatch(getArtworkDetail(id)),
  deleteArtwork: id => dispatch(deleteArtwork(id)),
  updateArtwork: (id, data) => dispatch(updateArtwork(id, data)),
});

export default connect(
  mapState,
  mapDispatch
)(ArtworkDetail);
