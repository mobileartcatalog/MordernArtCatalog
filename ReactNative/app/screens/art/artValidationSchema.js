import * as yup from 'yup';

export const artValidationSchema = yup.object().shape({
  title: yup.string().label('Title'),
  date: yup.string().label('Date'),
  medium: yup.string().label('Medium'),
  dimensions: yup.string().label('Dimensions'),
});
