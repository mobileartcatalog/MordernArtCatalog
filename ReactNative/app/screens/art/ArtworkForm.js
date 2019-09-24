import React, { Component } from 'react';
import { withNavigation } from 'react-navigation';
import { connect } from 'react-redux';
import { Text, View } from 'react-native';
import { Formik } from 'formik';
import styles from '../../stylesheets/forms.js';
import { StyledInput, StyledButton } from '../formComponents';
import UploadImage from './UploadImage';
import { artValidationSchema } from './artValidationSchema';
import { addArt } from '../../reducers/artReducer/addArtwork';

class ArtworkForm extends Component {

  constructor() {
    super();
    this.state = {
      img1: null,
      imageShow: false
    };

    this.handleImage = this.handleImage.bind(this);
  }

  handleImage(img1) {
    this.setState({
      img1
    });
  }

  render() {
    const { navigate } = this.props.navigation;
    return (
      <View style={styles.container}>
        <Text style={styles.headlineText}>Add New Artwork</Text>
        <View style={styles.innerContainer}>
          <Formik
            initialValues={{
              title: '',
              date: '',
              medium: '',
              dimension: '',
            }}
            onSubmit={(values, actions) => {
              values.img1 = this.state.img1;
              this.props
                .addArtwork(values)
                .catch(error => {
                  actions.setFieldError('general', error.message);
                })
                .finally(() => {
                  actions.setSubmitting(false);
                  actions.resetForm();
                  this.setState({
                    img1: null,
                    imageShow: !this.state.imageShow,
                  });
                  navigate('ArtworkDetail', { id: this.props.selected._id });
                });
            }}
            validationSchema={artValidationSchema}
          >
            {formikProps => (
              <React.Fragment>
                <UploadImage
                  getimageData={this.handleImage}
                  imageShow={this.state.imageShow}
                />
                <StyledButton
                  title="Save artwork"
                  onPress={formikProps.handleSubmit}
                />
                <StyledButton title="Clear" onPress={formikProps.handleReset} />

                <StyledInput
                  formikProps={formikProps}
                  formikKey={'title'}
                  placeholder="title"
                  autoFocus
                />
                <StyledInput
                  formikProps={formikProps}
                  formikKey={'date'}
                  placeholder={'date'}
                />
                <StyledInput
                  formikProps={formikProps}
                  formikKey={'medium'}
                  placeholder={'medium'}
                />
                <StyledInput
                  formikProps={formikProps}
                  formikKey={'dimension'}
                  placeholder={'dimensions'}
                />
              </React.Fragment>
            )}
          </Formik>
        </View>
      </View>
    );
  }
}

const mapState = state => {
  return {
    selected: state.art.selected,
  };
};
const mapDispatch = dispatch => ({
  addArtwork: art => dispatch(addArt(art)),
});

export default withNavigation(
  connect(
    mapState,
    mapDispatch
  )(ArtworkForm)
);
