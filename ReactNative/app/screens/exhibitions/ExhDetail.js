import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withNavigation } from 'react-navigation';
import { View, Text, Image, SafeAreaView, Alert } from 'react-native';
import { StyledButton, StyledSecondaryButton } from '../formComponents';
import { getExhDetail } from '../../reducers/exhReducer/getExhDetail';
import { deleteExh } from '../../reducers/exhReducer/deleteExh';

import { filterArtworks, arrayBufferToBase64 } from '../../utils';
import styles from '../../stylesheets/forms';
import { clearSelected } from '../../reducers/exhReducer/getExhDetail';

class ExhDetail extends Component {
  componentDidMount() {
    const id = this.props.navigation.getParam('id');
    this.props.getExhDetail(id);
  }

  handleDelete() {
    this.props.deleteExh(this.props.selected._id);
    this.props.clearSelected();
    this.props.navigation.navigate('ExhList');
  }

  render() {
    const {
      _id,
      title,
      venue,
      location,
      startDate,
      endDate
    } = this.props.selected;

    const artworks = filterArtworks(
      this.props.artworkIds,
      this.props.allArtwork
    );

    console.log('artworks', artworks);

    let venueDisplay, dateDisplay;
    venue && location
      ? (venueDisplay = `${venue}, ${location}`)
      : (venueDisplay = `${venue}`);

    startDate && endDate
      ? (dateDisplay = `${startDate} – ${endDate}`)
      : (dateDisplay = `${startDate}`);

    if (this.props.selected) {
      return (
        <SafeAreaView style={styles.container}>
          <View style={{ margin: 10 }}>
            <View style={{ margin: 10 }}>
              <Text style={styles.title}>{title}</Text>
              <Text>{venueDisplay}</Text>
              <Text>{dateDisplay}</Text>

              <Text>Artworks</Text>

              {artworks.map(art => {
                return (
                  <View>
                    <Text>{art.title}</Text>
                    <Image
                      style={styles.thumbnail}
                      source={{
                        uri: `data:${
                          art.img1.contentType
                        };base64,${arrayBufferToBase64(art.img1.data.data)}`
                      }}
                    />
                  </View>
                );
              })}
            </View>

            <StyledSecondaryButton
              title="add artwork"
              onPress={() => Alert.alert(`this doesn't work yet`, `:(`)}
            />
            <StyledSecondaryButton
              title="delete exhibition"
              onPress={() =>
                Alert.alert(
                  'Delete?',
                  'Are you sure you want to permanently delete this exhibition?',
                  [
                    {
                      text: 'Cancel',
                      onPress: () => console.log('Cancel Pressed'),
                      style: 'cancel'
                    },
                    {
                      text: 'Delete',
                      onPress: () => this.handleDelete()
                    }
                  ]
                )
              }
            />
          </View>
        </SafeAreaView>
      );
    }
    return <Text>no.</Text>;
  }
}

const mapState = state => {
  return {
    allArtwork: state.art.all,
    selected: state.exhibitions.selected,
    artworkIds: state.exhibitions.artworkIds
  };
};

const mapDispatch = dispatch => ({
  getExhDetail: id => dispatch(getExhDetail(id)),
  deleteExh: id => dispatch(deleteExh(id)),
  clearSelected: () => dispatch(clearSelected())
});

export default withNavigation(
  connect(
    mapState,
    mapDispatch
  )(ExhDetail)
);
