import React, { Component } from 'react';
import { View, Button } from 'react-native';
import { Input } from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';
import styles from '../../stylesheets/forms.js';
import UploadImage from './UploadImage';
import { connect } from 'react-redux';
import { addArt } from '../../reducers/artReducer/addArtwork';

class ArtworkForm extends Component {
  static navigationOptions = {
    title: 'Enter New Artwork'
  };

  constructor() {
    super();
    this.state = {
      title: '',
      date: '',
      medium: '',
      dimension: '',
      img1: null,
      imageShow: false
    };
    this.handleSave = this.handleSave.bind(this);
    this.handleImage = this.handleImage.bind(this);
  }

  handleSave() {
    this.props.addArtwork(this.state);
    this.setState({
      title: '',
      date: '',
      medium: '',
      dimension: '',
      img1: null,
      imageShow: !this.state.imageShow
    });
  }

  handleImage(img1) {
    this.setState({
      img1
    });
  }

  render() {
    // const { navigate } = this.props.navigation;
    return (
      <View>
        <Input
          style={styles.field}
          placeholder='title'
          leftIcon={<Icon name='pencil' style={styles.icon} />}
          value={this.state.title}
          onChangeText={title => this.setState({ title })}
        />
        <Input
          style={styles.field}
          placeholder='date'
          leftIcon={<Icon name='pencil' style={styles.icon} />}
          value={this.state.date}
          onChangeText={date => this.setState({ date })}
        />
        <Input
          style={styles.field}
          placeholder='medium'
          leftIcon={<Icon name='pencil' style={styles.icon} />}
          value={this.state.medium}
          onChangeText={medium => this.setState({ medium })}
        />
        <Input
          style={styles.field}
          placeholder='dimension'
          leftIcon={<Icon name='pencil' style={styles.icon} />}
          value={this.state.dimension}
          onChangeText={dimension => this.setState({ dimension })}
        />
        <Button
          style={styles.button}
          title='Save Changes'
          onPress={this.handleSave}
        />
        <Button style={styles.button} title='Clear' />
        <UploadImage
          getimageData={this.handleImage}
          imageShow={this.state.imageShow}
        />
      </View>
    );
  }
}

const mapDispatch = dispatch => ({
  addArtwork: artwork => dispatch(addArt(artwork))
});

export default connect(
  null,
  mapDispatch
)(ArtworkForm);
