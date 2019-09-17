import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withNavigation } from 'react-navigation';
import { View, Text, TouchableOpacity } from 'react-native';
import styles from '../../stylesheets/art';

class ExhListRow extends Component {


  render() {
    const {
      _id,
      title,
      venue,
      location,
      startDate,
      endDate,
    } = this.props.exhibition;

    let venueDisplay, dateDisplay;
    venue && location
      ? (venueDisplay = `${venue}, ${location}`)
      : (venueDisplay = `${venue}`);

    startDate && endDate
      ? (dateDisplay = `${startDate} – ${endDate}`)
      : (dateDisplay = `${startDate}`);

    return (
      <TouchableOpacity
        style={styles.innerContainer}
        onPress={id => this.props.navigation.navigate('ExhDetail', { id: _id })}
      >
        <View style={{ margin: 10 }}>
          <Text style={styles.title}>{title}</Text>
          <Text>{venueDisplay}</Text>
          <Text>{dateDisplay}</Text>
        </View>
      </TouchableOpacity>
    );
  }
}

const mapState = state => {
  return {
    selected: state.exhibitions.selected,
  };
};

export default withNavigation(
  connect(
    mapState,
    null
  )(ExhListRow)
);
