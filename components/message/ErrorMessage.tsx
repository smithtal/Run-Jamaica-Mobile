import React from 'react';
import {Text, View} from 'react-native';
import {error} from '../../constants/colors';

function ErrorMessage({children}: React.PropsWithChildren<{}>) {
  return (
    <View>
      <Text style={{color: error, textAlign: 'center'}}>{children}</Text>
    </View>
  );
}

export default ErrorMessage;
