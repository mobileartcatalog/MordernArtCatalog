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
import ExhListRow from '../exhibitions/ExhListRow';
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
      <View style={{ marginTop: 10 }}>
        <Modal
          animationType='slide'
          transparent={true}
          visible={this.state.modalVisible}
          onRequestClose={() => Alert.alert('Modal has been closed')}
        >
          <SafeAreaView style={{ flex: 1 }}>
            <SearchBar placeholder='Search exhibitions...' />
            <FlatList
              data={this.props.exhi}
              renderItem={({ item }) => <ExhListRow exhibition={item} />}
              keyExtractor={item => item._id}
            />
            <TouchableOpacity
              onPress={() => {
                this.setModalVisible(!this.state.modalVisible);
              }}
            >
              <Text style={{ alignSelf: 'center' }}>Close</Text>
            </TouchableOpacity>
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
