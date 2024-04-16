import { string } from 'yup';

export const yupRequiredNameField = string()
  .min(2, 'שדה זה חייב להכיל 2 תווים לפחות')
  .required('* חובה להזין שדה זה');

export const yupRequiredField = string().required('* שדה חובה');
export const yupRequiredFieldGoalCard = string()
  .required('* שדה חובה')
  .max(20, 'שדה זה מכיל מקסימום 20 תווים');
