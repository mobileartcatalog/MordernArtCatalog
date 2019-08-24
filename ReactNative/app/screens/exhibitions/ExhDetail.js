import React, { Component } from 'react';
import { connect } from 'react-redux';
import { View, Text } from 'react-native';
import { StyledButton } from '../formComponents';
import { getExhDetail } from '../../reducers/exhReducer/getExhDetail';
import { deleteExh } from '../../reducers/exhReducer/deleteExh';
import styles from '../../stylesheets/art';

class ExhDetail extends Component {
  componentDidMount() {
    const id = this.props.navigation.getParam('id');
    this.props.getExhDetail(id);
  }

  render() {
    const { _id, title, venue, location } = this.props.selected;
    if (this.props.selected) {
      return (
        <View>
          <Text>{title}</Text>
          <Text>{venue}</Text>
          <Text>{location}</Text>
          <StyledButton
            title="delete exhibition"
            onPress={id => this.props.deleteExh(_id)}
          />
        </View>
      );
    }
    return <Text>no.</Text>;
  }
}

const mapState = state => {
  return {
    selected: state.exhibitions.selected
  };
};

const mapDispatch = dispatch => ({
  getExhDetail: id => dispatch(getExhDetail(id)),
  deleteExh: id => dispatch(deleteExh(id))
});

export default connect(
  mapState,
  mapDispatch
)(ExhDetail);
