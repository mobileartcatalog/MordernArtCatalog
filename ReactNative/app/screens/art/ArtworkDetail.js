import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  View,
  Text,
  Dimensions,
  ScrollView,
  Image,
  Alert,
  ActivityIndicator
} from 'react-native';
import { StyledSecondaryButton } from '../formComponents';
import ScaledImage from 'react-native-scaled-image';
import { getArtworkDetail } from '../../reducers/artReducer/getArtworkDetail';
import { deleteArtwork } from '../../reducers/artReducer/deleteArtwork';
import { updateArtwork } from '../../reducers/artReducer/updateArtwork';
import styles from '../../stylesheets/art';
import { arrayBufferToBase64 } from '../../utils';
import LinkedExhi from './LinkedExhi';

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
      title,
      date,
      medium,
      exhibitions,
      height,
      width,
      depth,
      tags,
      inventorynumber
    } = this.props.artwork;
    const { artwork, images, allExhi, navigation, updateArtwork } = this.props;
    const { windowWidth } = Dimensions.get('window');
    let exhisInArt;
    if (exhibitions) {
      exhisInArt = exhibitions.reduce((accum, cur) => {
        const exhi = allExhi.filter(ele => ele._id === cur);
        return accum.concat(exhi);
      }, []);
    }

    return this.props.loading ? (
      <ActivityIndicator />
    ) : (
      <ScrollView>
        {artwork.img1 ? (
          <ScaledImage
            source={{
              uri: `data:${
                artwork.img1.contentType
              };base64,${arrayBufferToBase64(artwork.img1.data.data)}`
            }}
            width={windowWidth}
          />
        ) : null}

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
                      };base64,${arrayBufferToBase64(image.data.data)}`
                    }}
                    style={styles.thumbnail}
                  />
                </View>
              );
            })}
          </ScrollView>
        ) : null}

        <LinkedExhi
          exhisInArt={exhisInArt}
          exhibitions={exhibitions}
          artId={artwork._id}
          updateArtwork={updateArtwork}
        />
        <StyledSecondaryButton
          title='edit artwork'
          onPress={() =>
            navigation.navigate('ArtworkEdit', {
              title: 'Edit Artwork',
              artworkId: artwork._id
            })
          }
        />
        <StyledSecondaryButton
          title='delete artwork'
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
}

const mapState = state => {
  return {
    artwork: state.art.selected,
    images: state.art.images,
    loading: state.art.loading,
    allExhi: state.exhibitions.all
  };
};

const mapDispatch = dispatch => ({
  getArtworkDetail: id => dispatch(getArtworkDetail(id)),
  deleteArtwork: id => dispatch(deleteArtwork(id)),
  updateArtwork: (id, data) => dispatch(updateArtwork(id, data))
});

export default connect(
  mapState,
  mapDispatch
)(ArtworkDetail);
