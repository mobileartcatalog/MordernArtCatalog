import * as yup from 'yup';

export const loginValidationSchema = yup.object().shape({
  email: yup
    .string()
    .required()
    .email()
    .label('Email'),
  password: yup
    .string()
    .required()
    .min(6, 'Password must be at least 6 characters')
    .label('Password'),
  stayLoggedIn: yup.boolean().label('stayLoggedIn')
});

export const signupValidationSchema = yup.object().shape({
  email: yup
    .string()
    .required()
    .email()
    .label('Email'),
  password: yup
    .string()
    .required()
    .min(6, 'Password must be at least 6 characters')
    .label('Password'),
  confirmPassword: yup
    .string()
    .required()
    .test('passwords-match', 'The passwords must match', function(value) {
      return this.parent.password === value;
    })
    .label('Confirm password'),
  stayLoggedIn: yup.boolean().label('stayLoggedIn')
});
