import React, { Component } from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import { withNavigation } from 'react-navigation';
import styles from '../../stylesheets/art';
import { arrayBufferToBase64 } from '../../utils';

class ArtworkListRow extends Component {
  render() {
    const { artwork } = this.props;
    const { navigate } = this.props.navigation;

    return (
      <TouchableOpacity
        onPress={() => navigate('ArtworkDetail', { id: artwork._id })}
      >
        <View>
          {!artwork.imageUrl && true ? (
            <Image
              style={styles.thumbnail}
              source={{
                uri: `data:${
                  artwork.img1.contentType
                };base64,${arrayBufferToBase64(artwork.img1.data.data)}`
              }}
            />
          ) : (
            <Image
              style={styles.thumbnail}
              source={{ uri: `${artwork.imageUrl}` }}
            />
          )}
          <Text style={styles.title}>{artwork.title}</Text>
          <Text>{artwork.date}</Text>
        </View>
      </TouchableOpacity>
    );
  }
}

export default withNavigation(ArtworkListRow);
