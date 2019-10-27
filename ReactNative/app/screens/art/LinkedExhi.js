import React from 'react';
import { View, Text, FlatList, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { withNavigation } from 'react-navigation';
import LinkExhiModal from './LinkExhiModal';

class LinkedExhi extends React.Component {
  constructor() {
    super();
    this.state = {
      edit: false
    };
  }

  render() {
    const {
      exhisInArt,
      navigation,
      artId,
      updateArtwork,
      exhibitions
    } = this.props;
    return (
      <View>
        <Text>Exhibitions:</Text>
        <Icon
          name='edit'
          type='font-awesome'
          size={18}
          color='blue'
          onPress={() => {
            this.setState({ edit: !this.state.edit });
          }}
        />
        <FlatList
          data={exhisInArt}
          extraData={this.state}
          renderItem={({ item }) => (
            <View style={{ flexDirection: 'row' }}>
              <TouchableOpacity
                onPress={() =>
                  navigation.navigate('ExhDetail', {
                    id: item._id
                  })
                }
              >
                <Text
                  style={{
                    fontStyle: 'italic',
                    textDecorationLine: 'underline'
                  }}
                >
                  {item.title}
                </Text>
              </TouchableOpacity>
              {this.state.edit ? (
                <Icon
                  name='trash'
                  type='font-awesome'
                  size={16}
                  color='grey'
                  onPress={() => {
                    let updatedExhis = exhibitions.filter(
                      ele => ele !== item._id
                    );
                    updateArtwork(artId, {
                      exhibitions: updatedExhis,
                      deleteExhId: item._id
                    });
                  }}
                />
              ) : null}
            </View>
          )}
          keyExtractor={item => item._id}
        />
        {this.state.edit ? <LinkExhiModal /> : null}
      </View>
    );
  }
}

export default withNavigation(LinkedExhi);
