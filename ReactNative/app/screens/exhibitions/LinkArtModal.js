import React, { Component } from 'react';
import {
  Modal,
  Text,
  TouchableHighlight,
  TouchableOpacity,
  Image,
  FlatList,
  View,
  Alert,
} from 'react-native';
import { connect } from 'react-redux';
import styles from '../../stylesheets/art';
import { StyledSecondaryButton } from '../formComponents';
import { arrayBufferToBase64 } from '../../utils';
import { getArt } from '../../reducers/artReducer/getArt';
import { updateExh } from '../../reducers/exhReducer/updateExh';

class LinkArtModal extends Component {
  constructor() {
    super();
    this.state = {
      modalVisible: false,
      selected: new Map(),
    };
  }

  componentDidMount() {
    const { getArt, loaded } = this.props;
    if (!loaded) getArt();
  }

  setModalVisible(visible) {
    this.setState({ modalVisible: visible });
  }

  onPressItem = key => {
    this.setState(state => {
      const selected = new Map(state.selected);
      this.state.selected.has(key)
        ? selected.delete(key, !selected.get(key))
        : selected.set(key, !selected.get(key));
      return { selected };
    });
  };

  linkArtworks = () => {
    let id = this.props.exhibition._id;
    let data = {
      artworks: [
        ...this.props.exhibition.artworks,
        ...this.state.selected.keys(),
      ],
    };
    this.props.updateExh(id, data);
    this.setState({ modalVisible: false, selected: new Map() });
  };

  renderItem = item => {
    return (
      <TouchableOpacity
        style={[
          this.state.selected.get(item._id) ? styles.selected : styles.listView,
        ]}
        onPress={key => this.onPressItem(item._id)}
      >
        <View style={styles.innerContainer}>
          {!item.imageUrl && true ? (
            <Image
              style={styles.thumbnail}
              source={{
                uri: `data:${
                  item.img1.contentType
                };base64,${arrayBufferToBase64(item.img1.data.data)}`,
              }}
            />
          ) : (
            <Image
              style={styles.thumbnail}
              source={{ uri: `${item.imageUrl}` }}
            />
          )}
          <Text style={styles.title}>{item.title}</Text>
          <Text>{item.date}</Text>
        </View>
      </TouchableOpacity>
    );
  };

  render() {
    return (
      <View style={{ marginTop: 22 }}>
        <Modal
          animationType="fade"
          transparent={true}
          presentationStyle={'overFullScreen'}
          visible={this.state.modalVisible}
          onRequestClose={() => {
            Alert.alert('Modal has been closed.');
          }}
        >
          <View style={{ marginTop: 200, padding: 10 }}>
            <View>
              <View>
                <StyledSecondaryButton
                  title="save artworks"
                  onPress={() => this.linkArtworks()}
                />
                <FlatList
                  data={this.props.art}
                  extraData={this.state}
                  renderItem={({ item }) => this.renderItem(item)}
                  keyExtractor={item => item._id}
                />
              </View>
              <TouchableHighlight
                onPress={() => {
                  this.setModalVisible(!this.state.modalVisible);
                }}
              >
                <Text>Close</Text>
              </TouchableHighlight>
            </View>
          </View>
        </Modal>

        <TouchableHighlight
          onPress={() => {
            this.setModalVisible(true);
          }}
        >
          <Text>Link Artworks</Text>
        </TouchableHighlight>
      </View>
    );
  }
}

const mapState = state => {
  return {
    loaded: state.art.loaded,
    art: state.art.all,
    exhibition: state.exhibitions.selected,
  };
};

const mapDispatch = dispatch => ({
  getArt: () => dispatch(getArt()),
  updateExh: (id, exhData) => dispatch(updateExh(id, exhData)),
});

export default connect(
  mapState,
  mapDispatch
)(LinkArtModal);
