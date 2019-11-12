import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  View,
  Text,
  Dimensions,
  ScrollView,
  Image,
  ButtonGroup,
  Animated,
  TouchableOpacity,
  Alert,
  ActivityIndicator,
} from 'react-native';
import { Overlay, Icon } from 'react-native-elements';
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
import { IconButton } from '../formComponents';
import LinkedExhi from './LinkedExhi';

class ArtworkDetail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      overlayVisible: false,
    };
  }

  static navigationOptions = ({ navigation }) => ({
    headerTitle: (
      <IconButton
        reversed
        name="plus"
        type="font-awesome"
        color="slategray"
        onPress={() => {
          navigation.navigate('ArtworkForm');
        }}
      />
    ),
    headerRight: (
      <HamburgerIcon
        onPress={() => {
          this.setState({ overlayVisible: true });
        }}
      />
    ),
  });

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
      inventorynumber,
    } = this.props.artwork;
    const { artwork, images, allExhi, navigation, updateArtwork } = this.props;


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
        {this.state.overlayVisible && (
          <Overlay isVisible>
            <Text>Overlay!</Text>
          </Overlay>
        )}
        {images.length ? <ImageCarousel images={images} /> : null}
        <View style={{ margin: 10 }}>
          <Text style={styles.title}>{title}</Text>
          <Text>{date}</Text>
          <Text>{medium}</Text>
          <LinkedExhi
            exhisInArt={exhisInArt}
            exhibitions={exhibitions}
            artId={artwork._id}
            updateArtwork={updateArtwork}
          />
        </View>
        <StyledSecondaryButton
          title="edit artwork"
          onPress={() =>
            navigation.navigate('ArtworkEdit', {
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
    allExhi: state.exhibitions.all,
  };
};

const mapDispatch = dispatch => ({
  getArtworkDetail: id => dispatch(getArtworkDetail(id)),
  deleteArtwork: id => dispatch(deleteArtwork(id)),
  updateArtwork: (id, data) => dispatch(updateArtwork(id, data)),
  deleteImage: imageId => dispatch(deleteImage(imageId)),
  setMainImage: (imageId, artworkId) =>
    dispatch(setMainImageThunk(imageId, artworkId)),
  updateArtwork: (id, data) => dispatch(updateArtwork(id, data)),
});

export default connect(
  mapState,
  mapDispatch
)(ArtworkDetail);
