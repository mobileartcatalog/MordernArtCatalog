import React, { Component } from 'react';
import {
  Modal,
  Text,
  TouchableHighlight,
  TouchabaleOpacity,
  FlatList,
  Alert,
  View
} from 'react-native';
import { connect } from 'react-redux';
import styles from '../../stylesheets/art';
import { getExh } from '../../reducers/exhReducer/getExh';
import { SearchBar } from 'react-native-elements';
import { ExhListRow } from '../exhibitions/ExhListRow';
import { StyledSecondaryButton } from '../formComponents';

class LinkExhiModal extends Component {
  constructor() {
    super();
    this.state = {
      modalVisible: false
    };
  }
  componentDidMount() {
    const { getExh, loaded } = this.props;
    if (!loaded) getExh();
  }

  setModalVisible(visible) {
    this.setState({ modalVisible: visible });
  }

  render() {
    return (
      <View style={{ marginTop: 22 }}>
        <Modal
          animationType='slide'
          transparent={true}
          visible={this.state.modalVisible}
          onRequestClose={() => Alert.alert('Modal has been closed')}
        >
          <View>
            <SearchBar placeholder='Search exhibitions...' />
            <FlatList
              data={this.props.exhi}
              renderItem={({ item }) => <ExhListRow exhibition={item} />}
              keyExtractor={item => item._id}
            />
          </View>
        </Modal>
        <TouchableHighlight
          onPress={() => {
            this.setModalVisible(true);
          }}
        >
          <Text>add exhibitions</Text>
        </TouchableHighlight>
      </View>
    );
  }
}

const mapState = state => {
  return {
    loaded: state.exhibitions.loaded,
    exhi: state.exhibitions.all
  };
};

const mapDispatch = dispatch => ({
  getExh: () => dispatch(getExh())
});

export default connect(
  mapState,
  mapDispatch
)(LinkExhiModal);
