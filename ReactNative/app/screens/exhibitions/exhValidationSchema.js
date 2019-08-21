import * as yup from 'yup';

export const exhValidationSchema = yup.object().shape({
  title: yup
    .string()
    .required()
    .label('Title'),
  venue: yup.string().label('Venue'),
  location: yup.string().label('Location'),
  startDate: yup.date().label('Start date'),
  endDate: yup.date().label('End date')
});
