import React, { Component } from 'react';
import { SearchBar } from 'react-native-elements';
import styles from '../../stylesheets/forms';

class ExhSearch extends Component {
  render() {
    return (
      <SearchBar
        placeholder="search exhibitions"
        // inputContainerStyle={styles.innerContainer}
      />
    );
  }
}

export default ExhSearch;
