import * as Yup from 'yup';

const SignupFormSchema = Yup.object({
  name: Yup.string()
    .min(2, 'Name is too short.')
    .max(160, 'Name is too long.')
    .required('Name is required.'),
  emailAddress: Yup.string()
    .email('Email address is invalid.')
    .required('Email address is required.'),
  password: Yup.string().required('Password is required.'),
  confirmPassword: Yup.string()
    .required('Confirm Password is required.')
    .oneOf([Yup.ref('password'), null], 'Must match password.'),
});

export default SignupFormSchema;
