import React from 'react';
import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import { createBottomTabNavigator } from 'react-navigation-tabs';
import AccountScreen from './src/screens/AccountScreen';
import SigninScreen from './src/screens/SigninScreen';
import SignupScreen from './src/screens/SignupScreen';
import TrackCreateScreen from './src/screens/TrackCreateScreen';
import TrackDetailScreen from './src/screens/TrackDetailScreen';
import TrackListScreen from './src/screens/TrackListScreen';
import ResolveAuthScreen from './src/screens/ResolveAuthScreen'
import {Provider as AuthProvider} from  './src/context/AuthContext';
import { setNavigator } from './src/navigationRef'
import {Provider as LocationProvider} from './src/context/LocationContext'
import {Provider as TrackProvider} from './src/context/TrackContext'
import { FontAwesome } from '@expo/vector-icons';

const trackListFlow = createStackNavigator({
  TrackList: TrackListScreen,
  TrackDetail: TrackDetailScreen
})

trackListFlow.navigationOptions = {
  title: 'Tracks',
  tabBarIcon: <FontAwesome name="th-list" size={20} color="black" />
}

//create top level navigator(switch)
const switchNavigator = createSwitchNavigator({
  //show loading screen while checking for token in localStorage
  ResolveAuth: ResolveAuthScreen,
  //camelCase is community standard for a differnt flow
  //in switch navigator we will have two different navigators
  loginFlow: createStackNavigator({
    Signup: SignupScreen,
    Signin: SigninScreen
  }),
  mainFlow: createBottomTabNavigator({
    //stack navigator for moving between track list and track details screen
    trackListFlow: trackListFlow,
    TrackCreate: TrackCreateScreen,
    Account: AccountScreen,

  })
})

//create app container wraps it all in a react jsx element set it to variable so we can export it using AuthProvider
const App =  createAppContainer(switchNavigator)

export default () => {
  return (
    <TrackProvider>
    <LocationProvider>
       <AuthProvider>
      <App ref={(navigator) => { setNavigator(navigator)}} />
    </AuthProvider>
    </LocationProvider>
    </TrackProvider>
    

  )
}
