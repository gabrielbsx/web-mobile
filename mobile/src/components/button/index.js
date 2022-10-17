import React from 'react';
import {Text} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';

function Button({title, onPress, color}) {
  return (
    <TouchableOpacity onPress={onPress} style={{backgroundColor: color}}>
      <Text>{title}</Text>
    </TouchableOpacity>
  );
}

export default Button;
