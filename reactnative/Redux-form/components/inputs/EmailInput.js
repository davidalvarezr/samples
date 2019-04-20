import React from 'react';
import { TextInput, View, Text } from 'react-native';

/**
 * to be wrapped with redux-form Field component
 */
export default function EmailInput(props) {
  const { input, meta, ...inputProps } = props;

  const formStates = ['active', 'autofilled', 'asyncValidating', 'dirty', 'invalid', 'pristine',
    'submitting', 'touched', 'valid', 'visited'];

  return (
    <View>
      <TextInput
        {...inputProps}
        onChangeText={input.onChange}
        onBlur={input.onBlur}
        onFocus={input.onFocus}
        value={input.value}
      />
      <Text>{inputProps.error}</Text>
      <Text>The {input.name} input is:</Text>
      {
        formStates.filter(state => meta[state]).map(state => <Text key={state}> - {state}</Text>)
      }
    </View>
  );
}
