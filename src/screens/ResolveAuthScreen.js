import React, {useEffect, useContext} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {Context as AuthContext} from '../context/AuthContext'

const ResolveAuthScreen = () => {
  //pull signIn function from AuthContext file
  const { tryLocalSignIn} = useContext(AuthContext)
  //useEffect to try local sign in upon app loading
  useEffect(() => {
    tryLocalSignIn()
  },[])

  return null;
}

export default ResolveAuthScreen;