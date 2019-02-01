import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import {createStore} from 'redux';
import reducer from './reducers';
import { Provider } from 'react-redux';

import Incrementer from './Incrementer';


const initialState =  { // Creating the initial state
  counter: 0,           // Initial state of the counter
  clickReset: 0,
  clickDecrement: 0,
  clickIncrement: 0,
  step: 1,
  stepDisp: '1',
  resetValue: 0,
  resetValueDisp: '0',
}

const store = createStore(reducer, initialState); // Create the store with the reducer

export default class App extends React.Component {
  render() {
    return (
      <Provider store={store}>
        <Incrementer value={store.getState().counter} />
      </Provider>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
