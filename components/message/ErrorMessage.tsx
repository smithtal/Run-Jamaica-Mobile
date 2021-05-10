import React from 'react';
import {Text, View} from 'react-native';

function ErrorMessage({children}: React.PropsWithChildren<{}>) {
  return (
    <View>
      <Text>{children}</Text>
    </View>
  );
}

export default ErrorMessage;
