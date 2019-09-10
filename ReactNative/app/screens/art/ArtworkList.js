import React, { Component } from 'react';
import { View, Text, ScrollView } from 'react-native';
import { FlatGrid } from 'react-native-super-grid';
import { connect } from 'react-redux';
import { getArt } from '../../reducers/artReducer/getArt';
import ArtworkListRow from './ArtworkListRow';
import { withNavigation } from 'react-navigation';

class ArtworkList extends Component {
  static navigationOptions = {
    title: ''
  };

  componentDidMount() {
    const { getArt, loaded } = this.props;
    if (!loaded) getArt();
  }

  render() {
    const { art, count } = this.props;
    let label;
    count === 1 ? (label = ' work found') : (label = ' works found');

    return (
      <View>
        <Text>
          {count}
          {label}
        </Text>

        <FlatGrid
          itemDimension={150}
          items={art}
          renderItem={({ item }) => <ArtworkListRow artwork={item} />}
        />
      </View>
    );
  }
}

const mapState = state => {
  return {
    loaded: state.art.loaded,
    art: state.art.all,
    count: state.art.count
  };
};

const mapDispatch = dispatch => ({
  getArt: () => dispatch(getArt())
});

export default withNavigation(
  connect(
    mapState,
    mapDispatch
  )(ArtworkList)
);
