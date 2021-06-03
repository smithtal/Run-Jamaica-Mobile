import {StyleSheet} from 'react-native';

export default StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    paddingTop: 165,
  },
  signupIcon: {
    width: 350,
    height: 200,
    resizeMode: 'contain',
    alignSelf: 'center',
  },
  signupButton: {
    width: 300,
    alignSelf: 'center',
    marginTop: 155,
  },
  signInTextContainer: {
    marginTop: 20,
    display: 'flex',
    justifyContent: 'center',
    flexDirection: 'row',
    width: '100%',
  },
  signInText: {
    fontSize: 14,
  },
});
