import React from 'react';
import {
  Animated,
  Dimensions,
  Keyboard,
  KeyboardEventListener,
  TextInput,
} from 'react-native';

export interface KeyboardAnimationOptions {
  keyboardShowDuration?: number;
  keyboardHideDuration?: number;
}

export function useKeyboardAnimation(
  options?: KeyboardAnimationOptions,
): Animated.Value {
  const mergedOptions = {
    keyboardShowDuration: 500,
    keyboardHideDuration: 300,
    ...options,
  };

  const {keyboardShowDuration, keyboardHideDuration} = mergedOptions;

  const shift = new Animated.Value(0);

  React.useEffect(() => {
    const handleKeyboardDidShow: KeyboardEventListener = event => {
      const {height: windowHeight} = Dimensions.get('window');
      const keyboardHeight = event.endCoordinates.height;
      const currentlyFocusedInput = TextInput.State.currentlyFocusedInput();

      currentlyFocusedInput.measure(
        (
          _x: number,
          _y: number,
          _width: number,
          height: number,
          _pageX: number,
          pageY: number,
        ) => {
          const fieldHeight = height;
          const fieldTop = pageY;
          let gap =
            windowHeight - keyboardHeight - (fieldTop + 2 * fieldHeight);

          if (gap < 0) {
            Animated.timing(shift, {
              toValue: gap,
              duration: keyboardShowDuration,
              useNativeDriver: true,
            }).start();
          }
        },
      );
    };

    const handleKeyboardDidHide: KeyboardEventListener = () => {
      Animated.timing(shift, {
        toValue: 0,
        duration: keyboardHideDuration,
        useNativeDriver: true,
      }).start();
    };

    const onKeyboardDidShow = Keyboard.addListener(
      'keyboardDidShow',
      handleKeyboardDidShow,
    );

    const onKeyboardDidHide = Keyboard.addListener(
      'keyboardDidHide',
      handleKeyboardDidHide,
    );

    return () => {
      onKeyboardDidShow.remove();
      onKeyboardDidHide.remove();
    };
  }, []);
  return shift;
}
