import React, { Component } from 'react';
import { View, Text, ScrollView } from 'react-native';
import { SearchBar } from 'react-native-elements';
import { FlatGrid } from 'react-native-super-grid';
import { connect } from 'react-redux';
import styles from '../../stylesheets/forms';
import { getArt } from '../../reducers/artReducer/getArt';
import ArtworkListRow from './ArtworkListRow';
import { withNavigation } from 'react-navigation';

class ArtworkList extends Component {
  constructor() {
    super();
    this.state = {
      searchTerm: '',
      filtered: [],
      filteredCount: 0,
    };
  }

  componentDidMount() {
    const { getArt, loaded } = this.props;
    if (!loaded) getArt();
    this.setState({
      filtered: this.props.art,
      filteredCount: this.props.count,
    });
  }

  renderHeader = () => {
    let count, label;
    this.state.searchTerm.length
      ? (count = this.state.filteredCount)
      : (count = this.props.count);
    count === 1 ? (label = `artwork found`) : (label = `artworks found`);
    return (
      <View>
        <SearchBar
          placeholder="Search artwork..."
          containerStyle={styles.searchBarContainerStyle}
          inputContainerStyle={styles.searchBarInputContainerStyle}
          inputStyle={styles.searchBarInputStyle}
          onChangeText={searchTerm => this.searchFilter(searchTerm)}
          autoCorrect={false}
          autoCapitalize="none"
          autoFocus
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
    const newList = this.props.art.filter(item => {
      const textToSearch = `${item.title.toLowerCase()} ${item.medium.toLowerCase()} ${item.date.toLowerCase()}`;
      return textToSearch.includes(searchTerm.toLowerCase());
    });
    this.setState({
      searchTerm: searchTerm,
      filtered: newList,
      filteredCount: newList.length,
    });
  };

  render() {
    let data;
    this.state.searchTerm.length
      ? (data = this.state.filtered)
      : (data = this.props.art);

    return (
      <View>
        <FlatGrid
          itemDimension={150}
          items={data}
          renderItem={({ item }) => <ArtworkListRow artwork={item} />}
          ListHeaderComponent={this.renderHeader}
          ListFooterComponent={this.renderFooter}
        />
      </View>
    );
  }
}

const mapState = state => {
  return {
    loaded: state.art.loaded,
    art: state.art.all,
    count: state.art.count,
  };
};

const mapDispatch = dispatch => ({
  getArt: () => dispatch(getArt()),
});

export default withNavigation(
  connect(
    mapState,
    mapDispatch
  )(ArtworkList)
);
