import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withNavigation } from 'react-navigation';
import { View, Text, Image, SafeAreaView, Alert, FlatList } from 'react-native';
import { StyledSecondaryButton } from '../formComponents';
import LinkArtModal from './LinkArtModal';
import ArtworkListRow from '../art/ArtworkListRow';
import { getExhDetail } from '../../reducers/exhReducer/getExhDetail';
import { deleteExh } from '../../reducers/exhReducer/deleteExh';
import { filterArtworks, arrayBufferToBase64 } from '../../utils';
import styles from '../../stylesheets/forms';

class ExhDetail extends Component {
  componentDidMount() {
    const id = this.props.navigation.getParam('id');
    this.props.getExhDetail(id);
  }

  handleDelete() {
    this.props.deleteExh(this.props.selected._id);
    this.props.navigation.navigate('ExhList');
  }

  render() {
    const {
      _id,
      title,
      venue,
      location,
      startDate,
      endDate,
    } = this.props.selected;

    let artworkData = [];

    let venueDisplay, dateDisplay;
    venue && location
      ? (venueDisplay = `${venue}, ${location}`)
      : (venueDisplay = `${venue}`);

    startDate && endDate
      ? (dateDisplay = `${startDate} – ${endDate}`)
      : (dateDisplay = `${startDate}`);

    if (this.props.selected) {
      artworkData = filterArtworks(
        this.props.selected.artworks,
        this.props.allArtwork
      );

      return (
        <SafeAreaView style={styles.container}>
          <View style={{ margin: 10 }}>
            <View style={{ margin: 10 }}>
              <Text style={styles.title}>{title}</Text>
              <Text>{venueDisplay}</Text>
              <Text>{dateDisplay}</Text>

              <Text style={styles.h1}>Artworks</Text>

              <FlatList
                data={artworkData}
                renderItem={({ item }) => <ArtworkListRow artwork={item} />}
                keyExtractor={item => item._id}
              />
            </View>

            <LinkArtModal />

            <StyledSecondaryButton
              title="edit exhibition"
              onPress={() =>
                this.props.navigation.navigate('ExhEdit', {
                  title: 'Edit Exhibition',
                })
              }
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
                      style: 'cancel',
                    },
                    {
                      text: 'Delete',
                      onPress: () => this.handleDelete(),
                    },
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
  };
};

const mapDispatch = dispatch => ({
  getExhDetail: id => dispatch(getExhDetail(id)),
  deleteExh: id => dispatch(deleteExh(id)),
});

export default withNavigation(
  connect(
    mapState,
    mapDispatch
  )(ExhDetail)
);
