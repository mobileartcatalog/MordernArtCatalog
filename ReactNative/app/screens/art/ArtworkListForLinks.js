import React, { Component } from 'react';
import { View, Text, TouchableOpacity, Image, FlatList } from 'react-native';
import { connect } from 'react-redux';
import styles from '../../stylesheets/art';
import { StyledSecondaryButton } from '../formComponents';
import { arrayBufferToBase64 } from '../../utils';
import { getArt } from '../../reducers/artReducer/getArt';
import { updateExh } from '../../reducers/exhReducer/updateExh';

class ArtworkListForLinks extends Component {
  constructor() {
    super();
    this.state = {
      selected: new Map(),
    };
  }

  componentDidMount() {
    const { getArt, loaded } = this.props;
    if (!loaded) getArt();
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
    console.log('id', id, 'data', data);
    this.props.updateExh(id, data);
    this.setState({ selected: new Map() });
  };

  renderItem = item => {
    return (
      <TouchableOpacity
        selected={this.state.selected.get(item._id)}
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
)(ArtworkListForLinks);
