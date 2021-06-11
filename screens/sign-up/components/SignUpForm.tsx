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
    firstName: string;
    lastName?: string;
    emailAddress: string;
    password: string;
    confirmPassword: string;
  };

  const {onSubmit} = props;

  const initialValues: SignupFormFields = {
    firstName: '',
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
              onChangeText={handleChange('firstName')}
              placeholder="First Name"
              value={values.firstName}
              onBlur={handleBlur('firstName')}
              hasError={(errors.firstName && touched.firstName) as boolean}
              errorMessage={errors.firstName}
              maxLength={255}
            />
            <CustomTextInput
              onChangeText={handleChange('lastName')}
              placeholder="Last Name"
              value={values.lastName}
              onBlur={handleBlur('lastName')}
              hasError={(errors.lastName && touched.lastName) as boolean}
              errorMessage={errors.lastName}
              maxLength={255}
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
            <CustomButton buttonStyle={{marginTop: 20}} onPress={handleSubmit}>
              SIGN UP
            </CustomButton>
          </View>
        );
      }}
    </Formik>
  );
}

export default SignupForm;
