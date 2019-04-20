import React from 'react';
import SignUpForm from '../components/forms/SignUpForm';

// STRINGS --------------------------------------------------------------------
const SIGNUP_SCREEN_TITLE_FR = 'Créer un compte';

export default class SignUpScreen extends React.Component {
  static navigationOptions = {
    title: SIGNUP_SCREEN_TITLE_FR,
  };

  // TODO: send informations to server
  handleSubmit = (data) => {
    alert(JSON.stringify(data));
  };

  render() {
    return <SignUpForm handleSubmit={data => this.handleSubmit(data)} />;
  }
}
