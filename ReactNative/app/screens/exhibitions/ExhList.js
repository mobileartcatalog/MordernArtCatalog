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
import { getExh } from '../../reducers/exhReducer/getExh';
import ExhListRow from './ExhListRow';
import styles from '../../stylesheets/forms';
import { addingExhForm } from '../../reducers/exhReducer/addExh';

class ExhList extends Component {
  constructor() {
    super();
    this.state = {
      searchTerm: '',
      filtered: [],
      filteredCount: 0,
    };
  }

  componentDidMount() {
    const { loaded, getExh } = this.props;
    if (!loaded) getExh();
    this.setState({
      filtered: this.props.exhibitions,
      filteredCount: this.props.count,
    });
  }

  renderHeader = () => {
    let count;
    this.state.searchTerm.length
      ? (count = this.state.filteredCount)
      : (count = this.props.count);
    let label;
    count === 1 ? (label = `exhibition found`) : (label = `exhibitions found`);
    return (
      <View>
        <SearchBar
          placeholder="Search exhibitions..."
          containerStyle={styles.searchBarContainerStyle}
          inputContainerStyle={styles.searchBarInputContainerStyle}
          inputStyle={styles.searchBarInputStyle}
          onChangeText={searchTerm => this.searchFilter(searchTerm)}
          autoCorrect={false}
          autoCapitalize="none"
          autoFocusc
          value={this.state.searchTerm}
        />
        <Text style={styles.bodyText}>{`${count} ${label}`}</Text>
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

  searchFilter = searchTerm => {
    const newList = this.props.exhibitions.filter(item => {
      const textToSearch = `${item.title.toLowerCase()} ${item.venue.toLowerCase()} ${item.location.toLowerCase()} ${
        item.startDate
      } ${item.endDate}`;

      return textToSearch.includes(searchTerm.toLowerCase());
    });

    console.log('this.state', this.state);
    this.setState({
      searchTerm: searchTerm,
      filtered: newList,
      filteredCount: newList.length,
    });
  };

  render() {
    const { navigate } = this.props.navigation;
    let data;
    this.state.searchTerm.length
      ? (data = this.state.filtered)
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
  };
};

const mapDispatch = dispatch => ({
  getExh: () => dispatch(getExh()),
  addingExhForm: () => dispatch(addingExhForm()),
});

export default withNavigation(
  connect(
    mapState,
    mapDispatch
  )(ExhList)
);
