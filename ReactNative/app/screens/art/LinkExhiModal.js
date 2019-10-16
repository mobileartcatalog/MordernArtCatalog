import React, { Component } from 'react';
import {
  Modal,
  Text,
  TouchableHighlight,
  TouchableOpacity,
  FlatList,
  Alert,
  View,
  SafeAreaView
} from 'react-native';
import { connect } from 'react-redux';
import styles from '../../stylesheets/art';
import { getExh } from '../../reducers/exhReducer/getExh';
import { SearchBar } from 'react-native-elements';
import { StyledSecondaryButton } from '../formComponents';
import { filterExhThunk } from '../../reducers/exhReducer/filterExh';
import { updateArtwork } from '../../reducers/artReducer/updateArtwork';

class LinkExhiModal extends Component {
  constructor() {
    super();
    this.state = {
      modalVisible: false,
      selected: new Map()
    };
  }
  componentDidMount() {
    const { getExh, loaded } = this.props;
    if (!loaded) getExh();
  }

  setModalVisible(visible) {
    this.setState({ modalVisible: visible });
  }

  onPressItem = key => {
    this.setState(state => {
      const selected = new Map(state.selected);
      state.selected.has(key)
        ? selected.delete(key, !selected.get(key))
        : selected.set(key, !selected.get(key));
      return { selected };
    });
  };

  linkExhibitions = () => {
    let id = this.props.artwork._id;
    let data = {
      exhibitions: [
        ...this.props.artwork.exhibitions,
        ...this.state.selected.keys()
      ]
    };
    this.props.updateArtwork(id, data);
    this.setState({ modalVisible: false, selected: new Map() });
  };

  renderItem = item => {
    return (
      <TouchableOpacity
        style={[
          this.state.selected.has(item._id) ? styles.selected : styles.listView
        ]}
        onPress={() => {
          this.onPressItem(item._id);
        }}
      >
        <View style={styles.innerContainer}>
          <Text style={styles.title}>{item.title}</Text>
          <Text>
            {item.venue} {item.location}
          </Text>
          <Text>
            {item.startDate}-{item.endDate}
          </Text>
        </View>
      </TouchableOpacity>
    );
  };
  render() {
    const { searchTerm, exhi, filterExh, filtered } = this.props;

    let data = searchTerm.length ? filtered : exhi;
    return (
      <View style={{ marginTop: 10 }}>
        <Modal
          animationType='slide'
          transparent={false}
          visible={this.state.modalVisible}
          onRequestClose={() => Alert.alert('Modal has been closed')}
        >
          <SafeAreaView style={{ flex: 1 }}>
            <SearchBar
              placeholder='Search exhibitions...'
              containerStyle={styles.searchBarContainerStyle}
              inputContainerStyle={styles.searchBarInputContainerStyle}
              inputStyle={styles.searchBarInputStyle}
              onChangeText={searchTerm => filterExh(searchTerm)}
              autoCorrect={false}
              autoCapitalize='none'
              autoFocus
              value={searchTerm}
            />
            <FlatList
              data={data}
              extraData={this.state}
              renderItem={({ item }) => this.renderItem(item)}
              keyExtractor={item => item._id}
            />
            <StyledSecondaryButton
              title='save exhibitions link'
              onPress={() => this.linkExhibitions()}
            />
            <StyledSecondaryButton
              title='close'
              onPress={() => this.setModalVisible(!this.state.modalVisible)}
            />
          </SafeAreaView>
        </Modal>
        <TouchableHighlight
          onPress={() => {
            this.setModalVisible(true);
          }}
        >
          <Text
            style={{
              backgroundColor: 'transparent',
              color: 'slategray',
              fontSize: 18,
              alignSelf: 'center'
            }}
          >
            add exhibitions
          </Text>
        </TouchableHighlight>
      </View>
    );
  }
}

const mapState = state => {
  return {
    loaded: state.exhibitions.loaded,
    exhi: state.exhibitions.all,
    searchTerm: state.exhibitions.searchTerm,
    filtered: state.exhibitions.filtered,
    artwork: state.art.selected
  };
};

const mapDispatch = dispatch => ({
  getExh: () => dispatch(getExh()),
  filterExh: searchTerm => dispatch(filterExhThunk(searchTerm)),
  updateArtwork: (id, data) => dispatch(updateArtwork(id, data))
});

export default connect(
  mapState,
  mapDispatch
)(LinkExhiModal);
