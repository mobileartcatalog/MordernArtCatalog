import React, { Component } from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { withNavigation } from 'react-navigation';
import styles from '../../stylesheets/art';
import { arrayBufferToBase64 } from '../../utils';

class LinkedArtwork extends Component {
  render() {
    const { exhId, linkedArtworks, artwork, updateExh } = this.props;
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

          <Icon
            name='trash'
            type='font-awesome'
            size={16}
            onPress={() => {
              let updatedArtworks = linkedArtworks.filter(
                item => item !== artwork._id
              );
              updateExh(exhId, {
                artworks: updatedArtworks,
                deleteArtId: artwork._id
              });
            }}
          />
          {/* <Text style={styles.title}>{artwork.title}</Text>
          <Text>{artwork.date}</Text> */}
        </View>
      </TouchableOpacity>
    );
  }
}

export default withNavigation(LinkedArtwork);
