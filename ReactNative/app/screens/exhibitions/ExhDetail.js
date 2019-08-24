import React, { Component } from 'react';
import { connect } from 'react-redux';
import { View, Text } from 'react-native';
import { getExhDetail } from '../../reducers/exhReducer/getExhDetail';
import styles from '../../stylesheets/art';

class ExhDetail extends Component {
  componentDidMount() {
    const id = this.props.navigation.getParam('id');
    this.props.getExhDetail(id);
  }

  render() {
    const { exh } = this.props;
    if (exh) {
      return (
        <View>
          <Text>{exh.title}</Text>
          <Text>{exh.venue}</Text>
          <Text>{exh.location}</Text>
        </View>
      );
    }
    return <Text>no.</Text>;
  }
}

const mapState = state => {
  return {
    exh: state.exhibitions.selected
  };
};

const mapDispatch = dispatch => ({
  getExhDetail: id => dispatch(getExhDetail(id))
});

export default connect(
  mapState,
  mapDispatch
)(ExhDetail);
