/* eslint-disable quotes */
import { mixed, ref, string } from 'yup';

const phoneRegExp =
  /^(?:(?:(\+?972|\(\+?972\)|\+?\(972\))(?:\s|\.|-)?([1-9]\d?))|(0[5]{1}[01234578]))(?:\s|\.|-)?([^0\D]{1}\d{2}(?:\s|\.|-)?\d{4})$/gm;

const passwordRegExp = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/;

// Only Hebrew or English letters and spaces
const nameRegExp = /^[a-zA-Z\u0590-\u05FF\u0020]{3,15}$/;

const SUPPORTED_FORMAT = ['image/jpg', 'image/jpeg', 'image/png'];

export const yupFirstName = string()
  .min(2, 'אורך השם הפרטי צריך להיות 2 תווים לפחות')
  .max(40, 'אורך השם הפרטי צריך להיות 40 תווים לכל היותר')
  .matches(nameRegExp, 'שם פרטי חייב להכיל אותיות בעברית, אנגלית או רווחים')
  .required('חובה להזין שם פרטי');

export const yupLastName = string()
  .min(2, 'אורך שם המשפחה צריך להיות 2 תווים לפחות')
  .max(40, 'אורך שם המשפחה צריך להיות 40 תווים לכל היותר')
  .matches(nameRegExp, 'שם משפחה חייב להכיל אותיות בעברית, אנגלית או רווחים')
  .required('חובה להזין שם משפחה');

export const yupEmail = string()
  .email('כתובת האימייל שהוזנה אינה תקינה')
  .required('חובה להזין כתובת אימייל');

export const yupPhoneNumber = string()
  .matches(phoneRegExp, "מס' טלפון לא תקין עליך להזין מס' טלפון בתבנית 050-000-0000")
  .required("חובה להזין מס' טלפון");

export const yupPassword = string()
  .min(10, 'אורך הסיסמה חייב להיות 10 תווים לפחות')
  .matches(
    passwordRegExp,
    'הסיסמה חייבת לכלול אות גדולה, אות קטנה, מספר, ותו מיוחד (מהתווים הבאים: #?!@$%^&*-)'
  )
  .required('חובה להזין סיסמה');

export const yupPasswordConfirm = string()
  .oneOf([ref('password')], 'הסיסמאות לא תואמות')
  .required('חובה להזין סיסמה');

export const yupPhotoUpload = mixed()
  .nullable()
  .test('FILE_FORMAT', 'Uploaded file has unsupported format.', (value) => {
    // @ts-expect-error
    return !value || typeof value === 'string' || (value && SUPPORTED_FORMAT.includes(value.type));
  });
