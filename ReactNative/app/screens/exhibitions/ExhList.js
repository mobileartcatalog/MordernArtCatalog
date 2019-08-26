import React, { Component } from 'react';
import { View, Text, SafeAreaView } from 'react-native';
import { withNavigation } from 'react-navigation';
import { connect } from 'react-redux';
import { StyledSecondaryButton } from '../../screens/formComponents';
import { getExh } from '../../reducers/exhReducer/getExh';
import ExhListRow from './ExhListRow';
import ExhSearch from './SearchBar';
import styles from '../../stylesheets/forms';
import { addingExhForm } from '../../reducers/exhReducer/addExh';

class ExhList extends Component {
  static navigationOptions = {
    title: '',
    headerStyle: styles.stackNav
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
      <SafeAreaView style={styles.container}>
        <ExhSearch />

        <StyledSecondaryButton
          title="new exhibition"
          onPress={() => navigate('ExhForm')}
        />

        <Text style={styles.bodyText}>
          {count}
          {label}
        </Text>

        {exhibitions.map(exh => (
          <View key={exh._id}>
            <ExhListRow exhibition={exh} />
          </View>
        ))}
      </SafeAreaView>
    );
  }
}

const mapState = state => {
  return {
    loaded: state.exhibitions.loaded,
    exhibitions: state.exhibitions.all,
    count: state.exhibitions.count,
    formVisible: state.exhibitions.formVisible
  };
};

const mapDispatch = dispatch => ({
  getExh: () => dispatch(getExh()),
  addingExhForm: () => dispatch(addingExhForm())
});

export default withNavigation(
  connect(
    mapState,
    mapDispatch
  )(ExhList)
);
