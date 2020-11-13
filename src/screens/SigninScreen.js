import React, { useContext } from 'react';
import { View, StyleSheet } from 'react-native';
import  { NavigationEvents } from 'react-navigation'
import AuthForm from '../components/AuthForm';
import NavLink from '../components/NavLink'
import { Context } from '../context/AuthContext'

const SigninScreen = () => {
  const { state, signin, clearErrorMessage }= useContext(Context)
  return (
    <View style={styles.container}>
      <NavigationEvents
        onWillBlur={() => clearErrorMessage()} 
      />
      <AuthForm
        headerText="Sign in"
        onSubmitButtonText="Sign in"
        onSubmit={signin}
        errorMessage={state.errorMessage}
      />
      <NavLink
        text="Dont have an account? Sign up instead"
        routeName="Signup"
       />
      </View>
  )
}

SigninScreen.navigationOptions = () => {
  return {
    headerShown: false
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    marginBottom: 30,
  },
});

export default SigninScreen