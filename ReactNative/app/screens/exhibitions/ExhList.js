import React, { Component } from 'react';
import {
  View,
  Text,
  SafeAreaView,
  FlatList,
  ActivityIndicator,
} from 'react-native';
import { SearchBar } from 'react-native-elements';
import { withNavigation } from 'react-navigation';
import { connect } from 'react-redux';
import { StyledSecondaryButton } from '../../screens/formComponents';
import ExhListRow from './ExhListRow';
import styles from '../../stylesheets/forms';
import { getExh } from '../../reducers/exhReducer/getExh';
import { addingExhForm } from '../../reducers/exhReducer/addExh';
import { filterExhThunk } from '../../reducers/exhReducer/filterExh';

class ExhList extends Component {
  componentDidMount() {
    const { loaded, getExh } = this.props;
    if (!loaded) getExh();
  }

  renderHeader = () => {
    const {
      searchTerm,
      filtered,
      filteredCount,
      count,
      filterExh,
    } = this.props;
    let displayCount;
    searchTerm.length ? (displayCount = filteredCount) : (displayCount = count);
    let label;
    count === 1 ? (label = `exhibition found`) : (label = `exhibitions found`);

    return (
      <View>
        <SearchBar
          placeholder="Search exhibitions..."
          containerStyle={styles.searchBarContainerStyle}
          inputContainerStyle={styles.searchBarInputContainerStyle}
          inputStyle={styles.searchBarInputStyle}
          onChangeText={searchTerm => filterExh(searchTerm)}
          autoCorrect={false}
          autoCapitalize="none"
          autoFocus
          value={searchTerm}
        />
        <Text style={styles.bodyText}>{`${displayCount} ${label}`}</Text>
      </View>
    );
  };

  renderFooter = () => {
    if (!this.props.loading) return null;
    return (
      <View
        style={{
          paddingVertical: 20,
          borderTopWidth: 1,
          borderColor: '#CED0CE',
        }}
      >
        <ActivityIndicator animating size="large" />
      </View>
    );
  };

  render() {
    const { navigate } = this.props.navigation;
    let data;
    this.props.searchTerm.length
      ? (data = this.props.filtered)
      : (data = this.props.exhibitions);

    return this.props.selected ? (
      <ExhDetail />
    ) : (
      <SafeAreaView style={styles.container}>
        <StyledSecondaryButton
          title="new exhibition"
          onPress={() => navigate('ExhForm')}
        />

        <FlatList
          data={data}
          renderItem={({ item }) => <ExhListRow exhibition={item} />}
          keyExtractor={item => item._id}
          ListHeaderComponent={this.renderHeader}
          ListFooterComponent={this.renderFooter}
        />
      </SafeAreaView>
    );
  }
}

const mapState = state => {
  return {
    loading: state.exhibitions.loading,
    loaded: state.exhibitions.loaded,
    error: state.exhibitions.error,
    exhibitions: state.exhibitions.all,
    count: state.exhibitions.count,
    searchTerm: state.exhibitions.searchTerm,
    filtered: state.exhibitions.filtered,
    filteredCount: state.exhibitions.filteredCount,
  };
};

const mapDispatch = dispatch => ({
  getExh: () => dispatch(getExh()),
  addingExhForm: () => dispatch(addingExhForm()),
  filterExh: searchTerm => dispatch(filterExhThunk(searchTerm)),
});

export default withNavigation(
  connect(
    mapState,
    mapDispatch
  )(ExhList)
);
