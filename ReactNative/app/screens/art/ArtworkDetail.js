import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  View,
  Text,
  Dimensions,
  ScrollView,
  Image,
  Button,
  Animated,
  Alert,
  ActivityIndicator,
} from 'react-native';
import { StyledSecondaryButton } from '../formComponents';
import ScaledImage from 'react-native-scaled-image';
import { getArtworkDetail } from '../../reducers/artReducer/getArtworkDetail';
import { deleteArtwork } from '../../reducers/artReducer/deleteArtwork';
import {
  updateArtwork,
  deleteImage,
  setMainImageThunk,
} from '../../reducers/artReducer/updateArtwork';
import styles from '../../stylesheets/art';
import { arrayBufferToBase64 } from '../../utils';
import MultiImages from './MultiImagesUpload';
import ImageCarousel from './ImageCarousel';
import StyledImage from './StyledImage';
import HamburgerIcon from '../navigation/HamburgerIcon';

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

  _renderItem({ item, index }) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text style={{ color: '#fff' }}>{item.title}</Text>
      </View>
    );
  }

  static navigationOptions = () => {
    return {
      headerRight: <HamburgerIcon />,
      headerLeft: <HamburgerIcon />,
    };
  };

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
    const windowWidth = Dimensions.get('window').width;

    return this.props.loading ? (
      <ActivityIndicator />
    ) : (
      <ScrollView>
        {images.length ? (
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
                      source={{
                        uri: `data:${
                          image.contentType
                        };base64,${arrayBufferToBase64(image.data.data)}`,
                      }}
                      style={{
                        width: windowWidth,
                        height: 250,
                      }}
                    />
                    <StyledSecondaryButton
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
                      onPress={() =>
                        this.props.setMainImage(image._id, artwork._id)
                      }
                    />
                  </View>
                );
              })}
            </ScrollView>
          </React.Fragment>
        ) : null}

        <Text>{title}</Text>
        <Text>{date}</Text>
        <Text>{medium}</Text>
        {artwork.height ? <Text>{height.$numberDecimal}" height</Text> : null}
        {artwork.width ? <Text>{width.$numberDecimal}" width</Text> : null}

        <StyledSecondaryButton
          title="edit artwork"
          onPress={() =>
            this.props.navigation.navigate('ArtworkEdit', {
              title: 'Edit Artwork',
              artworkId: artwork._id,
            })
          }
        />
        <StyledSecondaryButton
          title="delete artwork"
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
  deleteImage: imageId => dispatch(deleteImage(imageId)),
  setMainImage: (imageId, artworkId) =>
    dispatch(setMainImageThunk(imageId, artworkId)),
});

export default connect(
  mapState,
  mapDispatch
)(ArtworkDetail);
