import React, {useContext} from 'react';
import { StyleSheet} from 'react-native';
import {Button, Text} from 'react-native-elements'
import Spacer from '../components/Spacer'
import {Context as AuthContext} from '../context/AuthContext'
import {SafeAreaView} from 'react-navigation';
import { FontAwesome } from '@expo/vector-icons';
import { Accuracy } from 'expo-location';

const AccountScreen = () => {
  const {signout} = useContext(AuthContext)
  return (
    <SafeAreaView forceInset={{top: 'always'}}>
        <Text h4>Manage Account</Text>
    <Spacer>
    <Button title="Sign Out" onPress={signout} />
    </Spacer>
    </SafeAreaView>
    
  )
}

AccountScreen.navigationOptions = {
  title: 'Account',
  tabBarIcon: <FontAwesome name="gear" size={20} color="black" />
}

const styles = StyleSheet.create({
  
});

export default AccountScreen