import '../_mockLocation'
import React, { useContext, useCallback} from 'react';
import { StyleSheet} from 'react-native';
import {Text} from 'react-native-elements';
import Map from '../components/Map';
import {SafeAreaView, withNavigationFocus} from 'react-navigation';
import {Context as LocationContext} from '../context/LocationContext';
import useLocation from '../hooks/useLocation'
import TrackForm from '../components/TrackForm'
import { FontAwesome } from '@expo/vector-icons';


const TrackCreateScreen = ({ isFocused }) => {
  //get context
  const { state: {recording}, addLocation} = useContext(LocationContext)
  //usecallback hook to prevent infinite reRender loop
  const callback = useCallback(location => {
    addLocation(location, recording)
  }, [recording])
  //first arg is checking for a true on either isFocused or recording
  const [err] = useLocation(isFocused || recording, callback) 
  return (
    <SafeAreaView forceInset={{top: 'always'}}>
      <Map />
      {err ? <Text>Please enable location services.</Text> : null}
      <TrackForm />
    </SafeAreaView>

  )
}
TrackCreateScreen.navigationOptions = {
  title: 'Record',
  tabBarIcon: <FontAwesome name="plus" size={20} color="black" />
}

const styles = StyleSheet.create({
  
});

export default withNavigationFocus(TrackCreateScreen)