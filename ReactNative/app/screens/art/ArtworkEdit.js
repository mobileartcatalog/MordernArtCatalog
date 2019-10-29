import React, { Component } from 'react';
import { withNavigation } from 'react-navigation';
import { connect } from 'react-redux';
import { Text, View } from 'react-native';
import { Formik } from 'formik';
import styles from '../../stylesheets/forms.js';
import { StyledButton, StyledInput } from '../formComponents';
import MultiImages from './MultiImagesUpload';
import { artValidationSchema } from './artValidationSchema';
import { updateArtwork } from '../../reducers/artReducer/updateArtwork';

class ArtworkEdit extends Component {
  static navigationOptions = () => {
    return {
      headerBackTitle: 'Cancel',
    };
  };

  render() {
    const { navigate } = this.props.navigation;
    const {
      _id,
      inventorynumber,
      title,
      date,
      medium,
      height,
      width,
      depth,
    } = this.props.selected;
    return (
      <View style={styles.container}>
        <Text style={styles.headlineText}>Edit Artwork</Text>
        <View style={styles.innerContainer}>
          <Formik
            initialValues={{
              inventorynumber: inventorynumber,
              title: title,
              date: date,
              medium: medium,
              height: height,
              width: width,
              depth: depth,
            }}
            onSubmit={(values, actions) => {
              this.props
                .updateArtwork(_id, values)
                .catch(error => {
                  actions.setFieldError('general', error.message);
                })
                .finally(() => {
                  actions.setSubmitting(false);
                  actions.resetForm();
                  navigate('ArtworkDetail', {
                    id: this.props.selected._id,
                  });
                });
            }}
            validationSchema={artValidationSchema}
          >
            {formikProps => (
              <React.Fragment>
                <StyledButton
                  title="Save artwork"
                  onPress={formikProps.handleSubmit}
                />

                <StyledInput
                  formikProps={formikProps}
                  formikKey={'inventorynumber'}
                  placeholder="inventory number"
                  defaultValue={formikProps.initialValues.inventorynumber}
                  autoFocus
                />
                <StyledInput
                  formikProps={formikProps}
                  formikKey={'title'}
                  placeholder="title"
                  defaultValue={formikProps.initialValues.title}
                />
                <StyledInput
                  formikProps={formikProps}
                  formikKey={'date'}
                  placeholder={'date'}
                  defaultValue={formikProps.initialValues.date}
                />
                <StyledInput
                  formikProps={formikProps}
                  formikKey={'medium'}
                  placeholder={'medium'}
                  defaultValue={formikProps.initialValues.medium}
                />
                {/* <View style={{ flexDirection: 'row' }}>
                  <StyledInput
                    formikProps={formikProps}
                    formikKey={'height'}
                    placeholder={'height'}
                    defaultValue={formikProps.initialValues.height}
                  />
                  <StyledInput
                    formikProps={formikProps}
                    formikKey={'width'}
                    placeholder={'width'}
                    defaultValue={formikProps.initialValues.width}
                  />
                  <StyledInput
                    formikProps={formikProps}
                    formikKey={'depth'}
                    placeholder={'depth'}
                    defaultValue={formikProps.initialValues.depth}
                  />
                </View> */}
              </React.Fragment>
            )}
          </Formik>
        </View>

        <MultiImages artworkId={this.props.selected._id} />
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
  updateArtwork: (id, artData) => dispatch(updateArtwork(id, artData)),
});

export default withNavigation(
  connect(
    mapState,
    mapDispatch
  )(ArtworkEdit)
);
