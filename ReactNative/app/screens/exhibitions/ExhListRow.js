import React, { Component } from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import { withNavigation } from 'react-navigation';
import styles from '../../stylesheets/art';

class ExhListRow extends Component {
  render() {
    const { id, title, venue, location, startDate, endDate } = this.props.exhibition;
    const { navigate } = this.props.navigation;

    let venueDisplay, dateDisplay;
    venue && location
      ? (venueDisplay = `${venue}, ${location}`)
      : (venueDisplay = `${venue}`);

    startDate && endDate
      ? (dateDisplay = `${startDate} – ${endDate}`)
      : (dateDisplay = `${startDate}`);

    return (
      <TouchableOpacity onPress={() => navigate('ExhDetail', { id })}>
        <View>
          <Text style={styles.title}>{title}</Text>
          <Text>{venueDisplay}</Text>
          <Text>{dateDisplay}</Text>
        </View>
      </TouchableOpacity>
    );
  }
}

export default withNavigation(ExhListRow);
