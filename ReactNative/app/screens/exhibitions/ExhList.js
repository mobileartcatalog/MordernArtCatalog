import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { connect } from 'react-redux';
import { getExh } from '../../reducers/exhReducer/getExh';
import ExhListRow from './ExhListRow';

class ExhList extends Component {
  static navigationOptions = {
    title: ''
  };

  componentDidMount() {
    this.props.getExh();
  }

  render() {
    const { exhibitions, count } = this.props;
    let label;
    count === 1
      ? (label = ' exhibition found')
      : (label = ' exhibitions found');

    return (
      <View>
        <Text>
          {count}
          {label}
        </Text>

        {exhibitions.map(exh => (
          <View key={exh.id}>
            <ExhListRow exhibition={exh} />
          </View>
        ))}
      </View>
    );
  }
}

const mapState = state => {
  return {
    exhibitions: state.exhibitions.all,
    count: state.exhibitions.count
  };
};

const mapDispatch = dispatch => ({
  getExh: () => dispatch(getExh())
});

export default connect(
  mapState,
  mapDispatch
)(ExhList);
