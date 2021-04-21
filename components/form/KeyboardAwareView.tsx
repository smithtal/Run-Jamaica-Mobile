import React from 'react';
import {Animated, StyleProp, ViewProps, ViewStyle} from 'react-native';
import {
  useKeyboardAnimation,
  KeyboardAnimationOptions,
} from './use-keyboard-animation';

export interface KeyboardAwareViewProps extends ViewProps {
  animationOptions?: KeyboardAnimationOptions;
  children?: React.ReactNode;
}

export function KeyboardAwareView(props: KeyboardAwareViewProps) {
  const {animationOptions, style, children, ...otherProps} = props;

  const shift = useKeyboardAnimation(animationOptions);

  const mergedStyle = {
    transform: [{translateY: shift}],
    ...(style as object),
  };

  return (
    <Animated.View style={mergedStyle} {...otherProps}>
      {children}
    </Animated.View>
  );
}
