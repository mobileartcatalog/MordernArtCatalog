import React, { Component } from 'react';
import { withNavigation } from 'react-navigation';
import { connect } from 'react-redux';
import { Text, View } from 'react-native';
import { Formik } from 'formik';
import styles from '../../stylesheets/forms.js';
import { StyledInput, StyledButton } from '../formComponents';
import { exhValidationSchema } from './exhValidationSchema';
import { updateExh } from '../../reducers/exhReducer/updateExh';

class ExhEdit extends Component {
  render() {
    console.log(this.props);
    const { navigate } = this.props.navigation;
    const {
      _id,
      title,
      venue,
      location,
      startDate,
      endDate,
    } = this.props.selected;
    return (
      <View style={styles.container}>
        <Text style={styles.headlineText}>Edit Exhibition</Text>
        <View style={styles.innerContainer}>
          <Formik
            initialValues={{
              title: title,
              venue: venue,
              location: location,
              startDate: startDate,
              endDate: endDate,
            }}
            onSubmit={(values, actions) => {
              this.props
                .updateExh(_id, values)
                .catch(error => {
                  actions.setFieldError('general', error.message);
                })
                .finally(() => {
                  actions.setSubmitting(false);
                  actions.resetForm();
                  navigate('ExhDetail', { id: this.props.selected._id });
                });
            }}
            validationSchema={exhValidationSchema}
          >
            {formikProps => (
              <React.Fragment>
                <StyledInput
                  formikProps={formikProps}
                  formikKey={'title'}
                  placeholder="title"
                  defaultValue={formikProps.initialValues.title}
                  autoFocus
                />
                <StyledInput
                  formikProps={formikProps}
                  formikKey={'venue'}
                  placeholder={'venue'}
                  defaultValue={formikProps.initialValues.venue}
                />
                <StyledInput
                  formikProps={formikProps}
                  formikKey={'location'}
                  placeholder={'location'}
                  defaultValue={formikProps.initialValues.location}
                />
                <StyledInput
                  formikProps={formikProps}
                  formikKey={'startDate'}
                  placeholder={'start date'}
                  defaultValue={formikProps.initialValues.startDate}
                />

                <StyledInput
                  formikProps={formikProps}
                  formikKey={'endDate'}
                  placeholder={'end date'}
                  defaultValue={formikProps.initialValues.endDate}
                />
                <StyledButton
                  title="Save changes"
                  onPress={formikProps.handleSubmit}
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
    selected: state.exhibitions.selected,
  };
};

const mapDispatch = dispatch => ({
  updateExh: (id, exhData) => dispatch(updateExh(id, exhData)),
});

export default withNavigation(
  connect(
    mapState,
    mapDispatch
  )(ExhEdit)
);
