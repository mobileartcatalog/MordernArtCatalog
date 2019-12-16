import React, { Component } from "react";
import { View, Text, ScrollView, SafeAreaView, FlatList } from "react-native";
import { SearchBar } from "react-native-elements";
import { FlatGrid } from "react-native-super-grid";
import { connect } from "react-redux";
import styles from "../../stylesheets/forms";
import { getArt } from "../../reducers/artReducer/getArt";
import { filterArtThunk } from "../../reducers/artReducer/filterArt";
import ArtworkListRow from "./ArtworkListRow";
import { withNavigation } from "react-navigation";
import { IconButton } from "../formComponents";

class ArtworkList extends Component {
  static navigationOptions = ({ navigation }) => ({
    headerTitle: (
      <IconButton
        raised
        name="plus"
        type="font-awesome"
        color="slategray"
        onPress={() => {
          navigation.navigate("ArtworkForm");
        }}
      />
    )
  });

  componentDidMount() {
    const { getArt, loaded } = this.props;
    console.log("in ArtworkList screen", this.props);
    if (!loaded) getArt();
  }

  renderHeader = () => {
    const { searchTerm, count, filteredCount, filterArt } = this.props;
    let displayCount, label;
    searchTerm.length ? (displayCount = filteredCount) : (displayCount = count);
    count === 1 ? (label = `artwork found`) : (label = `artworks found`);
    return (
      <View>
        <SearchBar
          placeholder="Search artwork..."
          containerStyle={styles.searchBarContainerStyle}
          inputContainerStyle={styles.searchBarInputContainerStyle}
          inputStyle={styles.searchBarInputStyle}
          onChangeText={searchTerm => filterArt(searchTerm)}
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
          borderColor: "#CED0CE"
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
      filteredCount: newList.length
    });
  };

  render() {
    let data;
    this.props.searchTerm.length
      ? (data = this.props.filtered)
      : (data = this.props.art);

    return (
      <View>
        {this.renderHeader()}
        <FlatGrid
          itemDimension={100}
          items={data}
          renderItem={({ item }) => <ArtworkListRow artwork={item} />}
          // ListHeaderComponent={this.renderHeader}
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
    searchTerm: state.art.searchTerm,
    filtered: state.art.filtered,
    filteredCount: state.art.filteredCount
  };
};

const mapDispatch = dispatch => ({
  getArt: () => dispatch(getArt()),
  filterArt: searchTerm => dispatch(filterArtThunk(searchTerm))
});

export default withNavigation(connect(mapState, mapDispatch)(ArtworkList));
