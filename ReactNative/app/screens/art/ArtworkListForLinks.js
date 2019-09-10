import React, { Component, PureComponent } from 'react';
import { View, Text, TouchableOpacity, Image, FlatList } from 'react-native';
import { connect } from 'react-redux';
import styles from '../../stylesheets/art';
import { arrayBufferToBase64 } from '../../utils';
import { getArt } from '../../reducers/artReducer/getArt';
import { linkArtToExh } from '../../reducers/exhReducer/linkArtToExh';

class ArtworkListForLinks extends PureComponent {
  state = { selected: new Map() };

  componentDidMount() {
    const { getArt, loaded } = this.props;
    if (!loaded) getArt();
  }

  _keyExtractor = item => item._id;

  onPressItem = key => {
    this.setState(state => {
      //create new Map object, maintaining state immutability
      const selected = new Map(state.selected);
      //remove key if selected, add key if not selected
      this.state.selected.has(key)
        ? selected.delete(key, !selected.get(key))
        : selected.set(key, !selected.get(key));
      return { selected };
    });
  };

  renderItem = item => {
    console.log('selected', this.state.selected);
    return (
      <TouchableOpacity
        onPress={this.onPressItem}
        selected={!!this.state.selected.get(item._id)}
      >
        <View>
          {!item.imageUrl && true ? (
            <Image
              style={styles.thumbnail}
              source={{
                uri: `data:${
                  item.img1.contentType
                };base64,${arrayBufferToBase64(item.img1.data.data)}`,
              }}
            />
          ) : (
            <Image
              style={styles.thumbnail}
              source={{ uri: `${item.imageUrl}` }}
            />
          )}
          <Text style={styles.title}>{item._id}</Text>
          <Text>{item.date}</Text>
        </View>
      </TouchableOpacity>
      //    <RowItem
      //      item
      //      onPressItem={this.onPressAction}
      //      selected={!!this.state.selected.get(item._id)}
      //  />
    );
  };

  render() {
    return (
      <FlatList
        data={this.props.art}
        extraData={this.state}
        ItemSeparatorComponent={this.FlatListItemSeparator}
        renderItem={({ item }) => this.renderItem(item)}
        keyExtractor={this._keyExtractor}
      />
    );
  }
}

class RowItem extends Component {
  render() {
    console.log('rowitem', item);
    return (
      <Text>{'rowitem'}</Text>
      // <TouchableOpacity onPress={this.props.onPressItem}>
      //   <View>
      //     {!item.imageUrl && true ? (
      //       <Image
      //         style={styles.thumbnail}
      //         source={{
      //           uri: `data:${
      //             item.img1.contentType
      //           };base64,${arrayBufferToBase64(item.img1.data.data)}`,
      //         }}
      //       />
      //     ) : (
      //       <Image
      //         style={styles.thumbnail}
      //         source={{ uri: `${item.imageUrl}` }}
      //       />
      //     )}
      //     <Text style={styles.title}>{item.title}</Text>
      //     <Text>{item.date}</Text>
      //   </View>
      // </TouchableOpacity>
    );
  }
}

// handleOnPress(id) {
//   let updatedIds = [];,
//   if (this.state.artIds.includes(id)) {
//     updatedIds = this.state.artIds.filter(item => item !== id);
//   } else {
//     updatedIds = [...this.state.artIds, id];
//   }
//   console.log('updatedIds', updatedIds)
//   this.setState({
//     artIds: updatedIds,
//   });
//   console.log('artids after', this.state.artIds);
// }
// handleSave(artIds) {
//   this.props.linkArtToExh(this.state.artIds);
//   this.setState({ artIds: [] });
// }
// componentDidMount() {
//   const { getArt, loaded } = this.props;
//   if (!loaded) getArt();
// }

// render() {
//   const { art } = this.props;
//   console.log('state', this.state, 'props', this.props);
//   return (
//     <View>
//       <FlatList
//         data={art}
//         renderItem={({ item }) => (
//           <TouchableOpacity onPress={id => this.handleOnPress(item._id)}>
//             <View>
//               {!item.imageUrl && true ? (
//                 <Image
//                   style={styles.thumbnail}
//                   source={{
//                     uri: `data:${
//                       item.img1.contentType
//                     };base64,${arrayBufferToBase64(item.img1.data.data)}`,
//                   }}
//                 />
//               ) : (
//                 <Image
//                   style={styles.thumbnail}
//                   source={{ uri: `${item.imageUrl}` }}
//                 />
//               )}
//               <Text style={styles.title}>{item.title}</Text>
//               <Text>{item.date}</Text>
//             </View>
//           </TouchableOpacity>
//         )}
//       />
//     </View>
//   );
// }

const mapState = state => {
  return {
    loaded: state.art.loaded,
    art: state.art.all,
  };
};

const mapDispatch = dispatch => ({
  getArt: () => dispatch(getArt()),
  linkArtToExh: ids => dispatch(linkArtToExh(ids)),
});

export default connect(
  mapState,
  mapDispatch
)(ArtworkListForLinks);
