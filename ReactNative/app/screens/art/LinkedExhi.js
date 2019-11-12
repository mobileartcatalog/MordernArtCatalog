import React from 'react';
import { View, Text, FlatList, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { withNavigation } from 'react-navigation';
import LinkExhiModal from './LinkExhiModal';
import styles from '../../stylesheets/art';

class LinkedExhi extends React.Component {
  constructor() {
    super();
    this.state = {
      edit: false,
    };
  }

  renderHeader() {
    return (
      <View style={styles.sectionHeader}>
        <Text style={styles.headlineText}>Exhibitions</Text>
        <Icon
          name="edit"
          type="font-awesome"
          size={18}
          color="slategray"
          onPress={() => {
            this.setState({ edit: !this.state.edit });
          }}
        />
      </View>
    );
  }

  renderItem(item) {
    let text;
    item.startDate
      ? (text = `${item.title}, ${item.startDate}`)
      : (text = `${item.title}`);

    return (
      <View style={styles.listRow}>
        <TouchableOpacity
          onPress={() =>
            this.props.navigation.navigate('ExhDetail', {
              id: item._id,
            })
          }
        >
          <Text style={styles.bodyText}>{text}</Text>
        </TouchableOpacity>
        {this.state.edit ? (
          <Icon
            name="trash"
            type="font-awesome"
            size={16}
            color="grey"
            onPress={() => {
              let updatedExhis = exhibitions.filter(ele => ele !== item._id);
              updateArtwork(artId, {
                exhibitions: updatedExhis,
                deleteExhId: item._id,
              });
            }}
          />
        ) : null}
      </View>
    );
  }

  render() {
    const {
      exhisInArt,
      navigation,
      artId,
      updateArtwork,
      exhibitions,
    } = this.props;
    return (
      <View>
        <FlatList
          data={exhisInArt}
          extraData={this.state}
          renderItem={({ item }) => this.renderItem(item)}
          keyExtractor={item => item._id}
          ListHeaderComponent={() => this.renderHeader()}
        />
        {this.state.edit ? <LinkExhiModal /> : null}
      </View>
    );
  }
}

export default withNavigation(LinkedExhi);
