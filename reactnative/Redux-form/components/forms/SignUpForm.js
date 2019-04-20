import React from 'react';
import { reduxForm, Field, formValueSelector } from 'redux-form';
import {
  Text, TextInput, TouchableOpacity, View, StyleSheet, Alert,
} from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import DatePicker from 'react-native-datepicker';
import moment from 'moment';

import { connect } from 'react-redux';

// STRINGS --------------------------------------------------------------------
const REQUIRED_MSG_FR = 'Champs requis';
const INVALID_FIELD_MSG_FR = field => `${field} invalide`;
const MIN_VAL_MSG_FR = val => `${val} caractères minimum`;
const MAX_VAL_MSG_FR = val => `${val} caractères maximum`;

const FIELD_EMAIL_FR = 'Adresse E-mail';
const FIELD_PASSWORD_FR = 'Mot de passe';
const FIELD_NAME_FR = 'Prénom';
const FIELD_LASTNAME_FR = 'Nom de famille';

const CONFIRM_FR = 'Confirmer';
const CANCEL_FR = 'Retour';
const STREET_NO_FR = 'Numéro de rue';
const STREET_FR = 'Rue';
const NPA_FR = 'Code postal';

const LABEL_INFO_ACCOUNT_FR = 'Informations du compte';
const LABEL_INFO_PERSO_FR = 'Informations personnelles';
const LABEL_INFO_ADDRESS_FR = 'Adresse';
const TEXT_BTN_SUBMIT_SIGNUP_FR = 'Envoyer l\'inscription';

// GENERAL --------------------------------------------------------------------

const MIN_AGE_TO_SIGNUP = 8;

const infoAlert = (title, msg) => {
  Alert.alert(
    title,
    msg,
    [{ text: 'OK' }],
    { cancelable: true },
  );
};

// VALIDATORS ---- https://redux-form.com/8.1.0/examples/fieldlevelvalidation/

const requiredValidator = value => (value || typeof value === 'number' ? undefined : REQUIRED_MSG_FR);
const emailValidator = value => (value && !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value)
  ? INVALID_FIELD_MSG_FR('Adresse E-mail')
  : undefined);
const min8Validator = value => (value && value.length > 7 ? undefined : MIN_VAL_MSG_FR(7 + 1));
const nameValidator = value => (value && !/^[A-zÀ-ÿ'´’ -]+$/.test(value)
  ? INVALID_FIELD_MSG_FR(FIELD_NAME_FR)
  : undefined);
const lastnameValidator = value => (value && !/^[A-zÀ-ÿ'´’ -]+$/.test(value)
  ? INVALID_FIELD_MSG_FR(FIELD_LASTNAME_FR)
  : undefined);
const noStreetValidator = value => (value && !/^[A-z0-9]+$/.test(value)
  ? INVALID_FIELD_MSG_FR(STREET_NO_FR)
  : undefined);
const streetValidator = value => (value && !/^[A-zÀ-ÿ'´’ -]*$/.test(value)
  ? INVALID_FIELD_MSG_FR(STREET_FR)
  : undefined);
const npaValidator = value => (value && !/[0-9]{4}/.test(value)
  ? INVALID_FIELD_MSG_FR(NPA_FR)
  : undefined);

// WARNINGS -------------------------------------------------------------------

const max15Warner = value => (value && value.length < 16 ? undefined : MAX_VAL_MSG_FR(16 - 1));

// FORM -----------------------------------------------------------------------

const renderField = ({
  input,
  label,
  keyboardType,
  secureTextEntry,
  autoCapitalize,
  autoCorrect,
  meta: {
    touched, error, warning, active, dirty,
  },
}) => (
  <View>
    <TextInput
      style={[styles.textInput, (active) && styles.active,
        (touched) && (((error) && styles.error)
        || ((warning) && styles.warning))]}
      {...input}
      onChangeText={input.onChange}
      onBlur={input.onBlur}
      onFocus={input.onFocus}
      value={input.value}
      keyboardType={keyboardType}
      placeholder={label}
      secureTextEntry={secureTextEntry}
      autoCapitalize={autoCapitalize}
      autoCorrect={autoCorrect}
    />
    {(touched && !active && dirty) && (((error) && infoAlert('Erreur', error))
      || ((warning) && infoAlert('Attention', warning)))}
  </View>
);

const renderDatePicker = ({
  input,
  label,
  meta: {
    touched, error, warning, active, dirty,
  },
}) => (
  <View>
    <DatePicker
      {...input}
      style={styles.datePicker}
      locale="fr"
      date={input.value}
      mode="date"
      placeholder={`${label} (${MIN_AGE_TO_SIGNUP} ans min.)`}
      format="DD.MM.YYYY"
      minDate="01.01.1920"
      maxDate={moment().subtract(MIN_AGE_TO_SIGNUP, 'years').format('DD.MM.YYYY')}
      confirmBtnText={CONFIRM_FR}
      cancelBtnText={CANCEL_FR}
      customStyles={{
        dateIcon: {
          position: 'absolute',
          left: 0,
          top: 0,
          marginLeft: 0,
        },
        dateInput: {
          marginLeft: 36,
          ...styles.textInput,
        },
        // ... You can check the source to find the other keys.
      }}
      onDateChange={input.onChange}
    />
    {(touched && !active && dirty) && (((error) && infoAlert('Erreur', error))
      || ((warning) && infoAlert('Attention', warning)))}
  </View>
);

let SignUpForm = (props) => {
  // const formStates = ['asyncValidating', 'dirty', 'pristine', 'valid', 'invalid', 'submitting',
  //   'submitSucceeded', 'submitFailed'];

  const { handleSubmit, allFields } = props;

  return (
    <KeyboardAwareScrollView
      style={styles.form}
      contentContainerStyle={styles.formContainer}
      keyboardShouldPersistTaps="always"
    >
      <View style={styles.titleInput}>
        <Text adjustsFontSizeToFit>{LABEL_INFO_ACCOUNT_FR}</Text>
      </View>
      <Field
        name="email"
        label={FIELD_EMAIL_FR}
        component={renderField}
        validate={[requiredValidator, emailValidator]}
        textContentType="emailAdress"
        autoCapitalize="none"
        autoCorrect={false}
      />
      <Field
        name="password"
        label={FIELD_PASSWORD_FR}
        component={renderField}
        validate={[requiredValidator, min8Validator]}
        warn={max15Warner}
        secureTextEntry
      />

      <View style={styles.titleInput}>
        <Text adjustsFontSizeToFit>{LABEL_INFO_PERSO_FR}</Text>
      </View>
      <Field
        name="name"
        label={FIELD_NAME_FR}
        component={renderField}
        validate={[requiredValidator, nameValidator]}
        textContentType="emailAdress"
      />
      <Field
        name="lastname"
        label={FIELD_LASTNAME_FR}
        component={renderField}
        validate={[requiredValidator, lastnameValidator]}
      />
      <Field
        name="birthdate"
        label="Date de naissance"
        component={renderDatePicker}
        validate={[requiredValidator]}
      />

      {/* <Text>The form is:</Text>
      {
        formStates.filter(state => props[state]).map(state => <Text key={state}> - {state}</Text>)
      } */}
      <View style={styles.titleInput}>
        <Text adjustsFontSizeToFit>{LABEL_INFO_ADDRESS_FR}</Text>
      </View>
      <Field
        name="no"
        label="N°"
        component={renderField}
        validate={[requiredValidator, noStreetValidator]}
      />
      <Field
        name="address"
        label={STREET_FR}
        component={renderField}
        validate={[requiredValidator, streetValidator]}
      />
      <Field
        name="npa"
        label={NPA_FR}
        component={renderField}
        validate={[requiredValidator, npaValidator]}
      />
      <TouchableOpacity onPress={() => handleSubmit(allFields)} style={styles.button}>
        <Text style={styles.buttonText}>{TEXT_BTN_SUBMIT_SIGNUP_FR}</Text>
      </TouchableOpacity>
    </KeyboardAwareScrollView>
  );
};

SignUpForm = reduxForm({
  form: 'signUp',
})(SignUpForm);

const selector = formValueSelector('signUp');
SignUpForm = connect((state) => {
  const allFields = selector(state, 'email', 'password', 'name', 'lastname', 'birthdate',
    'no', 'address', 'npa');
  return { allFields };
})(SignUpForm);

const styles = StyleSheet.create({
  datePicker: {
    marginTop: 5,
    width: '100%',
  },
  buttonText: {
    color: 'white',
  },
  button: {
    height: 40,
    borderRadius: 20,
    backgroundColor: 'black',
    justifyContent: 'center',
    alignItems: 'center',
  },
  titleInput: {
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  formContainer: {
    padding: 10,
  },
  form: {
    flex: 1,
  },
  textInput: {
    height: 40,
    marginBottom: 10,
    paddingLeft: 10,
    borderWidth: 1,
    borderColor: 'black',
    borderRadius: 20,
  },
  active: {
    borderWidth: 2,
  },
  error: {
    borderColor: 'red',
  },
  warning: {
    borderColor: 'orange',
  },
});

export default SignUpForm;
