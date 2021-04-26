import React from 'react';
import {Image, View} from 'react-native';
import SecondaryText from '../../components/text/SecondaryText';
import PrimaryText from '../../components/text/PrimaryText';
import {CustomTextInput} from '../../components/form/CustomTextInput';
import CustomButton from '../../components/CustomButton';
import CustomText from '../../components/text/CustomText';
import LinkText from '../../components/text/LinkText';
import {signup, SignupRequestBody} from '../../services/auth';
import {KeyboardAwareView} from '../../components/form/KeyboardAwareView';
import {AuthContext} from '../../components/auth/auth.context';

function SignUpScreen(): JSX.Element {
  const {setAccessToken, setRefreshToken} = React.useContext(AuthContext);

  const handleFormSubmit = async (fields: SignupRequestBody) => {
    //TODO: Handle error that can happen here.
    const {accessToken, refreshToken} = await signup(fields);

    setAccessToken(accessToken);
    setRefreshToken(refreshToken);
  };

  return (
    <KeyboardAwareView
      style={{
        flexDirection: 'column',
        alignItems: 'center',
      }}>
      <View style={{width: '80%', marginTop: 40, marginBottom: 30}}>
        <PrimaryText style={{fontSize: 30}}>Create Account,</PrimaryText>
        <SecondaryText style={{fontSize: 18}}>
          Sign up to get started
        </SecondaryText>
      </View>
      <Image
        source={require('./img/warmup.png')}
        style={{
          width: 210,
          height: 210,
          marginBottom: 25,
          resizeMode: 'contain',
          alignSelf: 'center',
        }}
      />
      <SignupForm onSubmit={handleFormSubmit} />
      <CustomText style={{width: '55%', textAlign: 'center', marginTop: 20}}>
        <CustomText>By using this app you agree to our </CustomText>
        <LinkText>Terms of Use </LinkText>
        <CustomText>and </CustomText>
        <LinkText>Privacy Policy</LinkText>
      </CustomText>
    </KeyboardAwareView>
  );
}

interface SignupFormProps {
  onSubmit: (fields: SignupRequestBody) => void;
}

function SignupForm(props: SignupFormProps): JSX.Element {
  const {onSubmit} = props;

  const [name, setName] = React.useState<string>('');
  const [emailAddress, setEmailAddress] = React.useState<string>('');
  const [password, setPassword] = React.useState<string>('');
  const [confirmPassword, setConfirmPassword] = React.useState<string>('');

  const handleSubmit = (): void => {
    if (password === confirmPassword) {
      onSubmit({name, emailAddress, password});
    } else {
      console.error('Mismatch');
    }
  };

  return (
    <View style={{width: '70%'}}>
      <CustomTextInput onChangeText={setName} placeholder="Name" value={name} />
      <CustomTextInput
        onChangeText={setEmailAddress}
        placeholder="Email"
        keyboardType="email-address"
        value={emailAddress}
      />
      <CustomTextInput
        onChangeText={setPassword}
        placeholder="Password"
        secureTextEntry
        value={password}
      />
      <CustomTextInput
        onChangeText={setConfirmPassword}
        placeholder="Confirm Password"
        secureTextEntry
        value={confirmPassword}
      />
      <CustomButton buttonStyle={{marginTop: 35}} onPress={handleSubmit}>
        SIGN UP
      </CustomButton>
    </View>
  );
}
export default SignUpScreen;
