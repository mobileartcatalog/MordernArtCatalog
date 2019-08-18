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
      dimensions: '',
      imageData: '',
      imageType: ''
    };
    this.handleSave = this.handleSave.bind(this);
    this.handleImage = this.handleImage.bind(this);
  }

  handleSave() {
    const {
      title,
      date,
      medium,
      dimensions,
      imageData,
      imageType
    } = this.state;
    const artwork = { title, date, medium, dimensions, imageData, imageType };
    this.props.addArtwork(artwork);
    console.log(
      'in form',
      title,
      date,
      medium,
      dimensions,
      imageData,
      imageType
    );
  }

  handleImage(imageData, imageType) {
    this.setState({
      imageData,
      imageType
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
          placeholder='dimensions'
          leftIcon={<Icon name='pencil' style={styles.icon} />}
          value={this.state.dimensions}
          onChangeText={dimensions => this.setState({ dimensions })}
        />
        <Button
          style={styles.button}
          title='Save Changes'
          onPress={this.handleSave}
        />
        <Button style={styles.button} title='Clear' />
        <UploadImage getimageData={this.handleImage} />
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
