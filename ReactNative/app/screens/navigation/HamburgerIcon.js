import React, { Component } from 'react';
import { withNavigation } from 'react-navigation';
import { TouchableOpacity } from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/SimpleLineIcons';

const HamburgerIcon = ({ ...rest }) => {
  return (
    <TouchableOpacity
      style={{
        width: 44,
        height: 44,
        marginTop: 20,
      }}
      {...rest}
    >
      <Icon name="menu" size={20} color="slategray" />
    </TouchableOpacity>
  );
};

export default withNavigation(HamburgerIcon);
