import React, { Component } from 'react';
import { View, Text, SafeAreaView } from 'react-native';
import { withNavigation } from 'react-navigation';
import { connect } from 'react-redux';
import { StyledButton } from '../../screens/formComponents';
import { getExh } from '../../reducers/exhReducer/getExh';
import ExhListRow from './ExhListRow';

class ExhList extends Component {
  static navigationOptions = {
    title: ''
  };

  componentDidMount() {
    const { loaded, getExh } = this.props;
    if (!loaded) getExh();
  }

  render() {
    const { navigate } = this.props.navigation;
    const { exhibitions, count } = this.props;
    let label;
    count === 1
      ? (label = ' exhibition found')
      : (label = ' exhibitions found');

    return this.props.selected ? (
      <ExhDetail />
    ) : (
      <SafeAreaView>
        <View>
          <Text>
            {count}
            {label}
          </Text>

          <StyledButton
            title="new exhibition"
            onPress={() => navigate('ExhForm')}
          />

          {exhibitions.map(exh => (
            <View key={exh._id}>
              <ExhListRow exhibition={exh} />
            </View>
          ))}
        </View>
      </SafeAreaView>
    );
  }
}

const mapState = state => {
  return {
    loaded: state.exhibitions.loaded,
    exhibitions: state.exhibitions.all,
    count: state.exhibitions.count
  };
};

const mapDispatch = dispatch => ({
  getExh: () => dispatch(getExh())
});

export default withNavigation(
  connect(
    mapState,
    mapDispatch
  )(ExhList)
);
