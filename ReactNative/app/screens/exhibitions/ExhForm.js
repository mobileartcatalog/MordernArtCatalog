import React, { Component } from 'react';
import { withNavigation } from 'react-navigation';
import { connect } from 'react-redux';
import { Text, View } from 'react-native';
import { Formik } from 'formik';
import styles from '../../stylesheets/forms.js';
import { StyledInput, StyledButton } from '../formComponents';
import { exhValidationSchema } from './exhValidationSchema';
import { addExh } from '../../reducers/exhReducer/addExh';

class ExhForm extends Component {
  render() {
    const { navigate } = this.props.navigation;
    return (
      <View style={styles.container}>
        <Text style={styles.headlineText}>New Exhibition</Text>
        <View style={styles.innerContainer}>
          <Formik
            initialValues={{
              title: '',
              venue: '',
              location: '',
              startDate: '',
              endDate: ''
            }}
            onSubmit={(values, actions) => {
              values.uid = this.props.uid;
              console.log('in exhform the uid is', values)
              this.props
                .addExh(values)
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
                  autoFocus
                />
                <StyledInput
                  formikProps={formikProps}
                  formikKey={'venue'}
                  placeholder={'venue'}
                />
                <StyledInput
                  formikProps={formikProps}
                  formikKey={'location'}
                  placeholder={'location'}
                />
                <StyledInput
                  formikProps={formikProps}
                  formikKey={'startDate'}
                  placeholder={'start date'}
                />

                <StyledInput
                  formikProps={formikProps}
                  formikKey={'endDate'}
                  placeholder={'end date'}
                />
                <StyledButton
                  title="Save exhibition"
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
    uid: state.auth.uid
  };
};

const mapDispatch = dispatch => ({
  addExh: (exh) => dispatch(addExh(exh))
});

export default withNavigation(
  connect(
    mapState,
    mapDispatch
  )(ExhForm)
);
