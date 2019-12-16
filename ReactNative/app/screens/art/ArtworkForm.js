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
      imageShow: false,
    };

    this.handleImage = this.handleImage.bind(this);
  }

  handleImage(img1) {
    this.setState({
      img1,
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
              inventorynumber: '',
              title: '',
              date: '',
              medium: '',
              height: null,
              width: null,
              depth: null,
            }}
            onSubmit={(values, actions) => {
              values.img1 = this.state.img1;
              this.props
                .addArtwork(values,this.props.uid)
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
                  formikKey={'inventorynumber'}
                  placeholder="inventory number"
                  autoFocus
                />
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
                <View style={{ flexDirection: 'row' }}>
                  <StyledInput
                    formikProps={formikProps}
                    formikKey={'height'}
                    placeholder={'height (in.)'}
                  />
                  <StyledInput
                    formikProps={formikProps}
                    formikKey={'width'}
                    placeholder={'width (in.)'}
                  />
                  <StyledInput
                    formikProps={formikProps}
                    formikKey={'depth'}
                    placeholder={'depth (in.)'}
                  />
                </View>
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
    uid: state.auth.uid,
  };
};
const mapDispatch = dispatch => ({
  addArtwork: (art,uid) => dispatch(addArt(art,uid)),
});

export default withNavigation(
  connect(
    mapState,
    mapDispatch
  )(ArtworkForm)
);
