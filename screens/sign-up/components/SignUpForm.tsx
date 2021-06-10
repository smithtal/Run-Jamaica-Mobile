import React from 'react';
import {Formik} from 'formik';
import {View} from 'react-native';
import SignupFormSchema from '../singup-validation';
import {CustomTextInput} from '../../../components/form/CustomTextInput';
import CustomButton from '../../../components/CustomButton';
import {SignupRequestBody} from '../../../services/auth';
import ErrorMessage from '../../../components/message/ErrorMessage';

interface SignupFormProps {
  onSubmit: (fields: SignupRequestBody) => void;
  error?: boolean;
  errorMessage?: string;
}

function SignupForm(props: SignupFormProps): JSX.Element {
  type SignupFormFields = {
    name: string;
    emailAddress: string;
    password: string;
    confirmPassword: string;
  };

  const {onSubmit} = props;

  const initialValues: SignupFormFields = {
    name: '',
    emailAddress: '',
    password: '',
    confirmPassword: '',
  };

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={onSubmit}
      validationSchema={SignupFormSchema}>
      {({handleChange, handleBlur, handleSubmit, values, touched, errors}) => {
        return (
          <View style={{width: '70%'}}>
            <CustomTextInput
              onChangeText={handleChange('name')}
              placeholder="Name"
              value={values.name}
              onBlur={handleBlur('name')}
              hasError={(errors.name && touched.name) as boolean}
              errorMessage={errors.name}
              maxLength={160}
            />
            <CustomTextInput
              onChangeText={handleChange('emailAddress')}
              placeholder="Email"
              keyboardType="email-address"
              value={values.emailAddress}
              onBlur={handleBlur('emailAddress')}
              hasError={
                (errors.emailAddress && touched.emailAddress) as boolean
              }
              errorMessage={errors.emailAddress}
            />
            <CustomTextInput
              onChangeText={handleChange('password')}
              placeholder="Password"
              secureTextEntry
              value={values.password}
              onBlur={handleBlur('password')}
              hasError={(errors.password && touched.password) as boolean}
              errorMessage={errors.password}
            />
            <CustomTextInput
              onChangeText={handleChange('confirmPassword')}
              placeholder="Confirm Password"
              secureTextEntry
              value={values.confirmPassword}
              onBlur={handleBlur('confirmPassword')}
              hasError={
                (touched.confirmPassword && errors.confirmPassword) as boolean
              }
              errorMessage={errors.confirmPassword}
            />
            {props.error && <ErrorMessage>{props.errorMessage}</ErrorMessage>}
            <CustomButton buttonStyle={{marginTop: 35}} onPress={handleSubmit}>
              SIGN UP
            </CustomButton>
          </View>
        );
      }}
    </Formik>
  );
}

export default SignupForm;
