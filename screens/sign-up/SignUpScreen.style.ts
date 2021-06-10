import {StyleSheet} from 'react-native';

export default StyleSheet.create({
  container: {
    flexDirection: 'column',
    alignItems: 'center',
  },
  heading: {
    width: '80%',
    marginTop: 40,
    marginBottom: 30,
  },
  title: {
    fontSize: 30,
  },
  subTitle: {
    fontSize: 18,
  },
  logo: {
    width: 210,
    height: 210,
    marginBottom: 25,
    resizeMode: 'contain',
    alignSelf: 'center',
  },
  termsLinks: {
    width: '55%',
    textAlign: 'center',
    marginTop: 20,
  },
});
