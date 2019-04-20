import React from 'react';
import { createStackNavigator, createAppContainer } from 'react-navigation';
import { Provider } from 'react-redux';
import SignUp from './screens/SignUpScreen';
import store from './redux/store';

const MainNavigator = createStackNavigator({
  SignUp: { screen: SignUp },
});

const Navigation = createAppContainer(MainNavigator);

// Render the app container component with the provider around it
export default class App extends React.Component {
  render() {
    return (
      <Provider store={store}>
        <Navigation />
      </Provider>
    );
  }
}
