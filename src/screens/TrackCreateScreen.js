import '../_mockLocation'
import React, {useEffect, useState, useContext} from 'react';
import { StyleSheet} from 'react-native';
import {Text} from 'react-native-elements';
import Map from '../components/Map';
import {SafeAreaView} from 'react-navigation';
import {requestPermissionsAsync, watchPositionAsync, Accuracy} from 'expo-location';
import '../_mockLocation'
import {Context as LocationContext} from '../context/LocationContext';


const TrackCreateScreen = () => {
  //get context
  const {addLocation} = useContext(LocationContext)
  //state for tracking errors
  const [err, setErr] = useState(null)
  //helper function to check for permissions
  const startWatching = async () => {
    try {
      const{ granted } = await requestPermissionsAsync();
      if(!granted) {
        throw new Error ('Location permission not granted')
      }
      await watchPositionAsync({
        accuracy: Accuracy.BestForNavigation,
        timeInterval: 1000,
        distanceInterval: 10
      }, (location) => {
          //DISPATCH action to update location property
          addLocation(location)
      })
    } catch (e) {
      setErr(e)
    }
  }
  // call startWatching() upon component render once
  useEffect(() => {
    startWatching();
  }, [])

  return (
    <SafeAreaView forceInset={{top: 'always'}}>
      <Text h2>Create a Track</Text>
      <Map />
      {err ? <Text>Please enable location services.</Text> : null}
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  
});

export default TrackCreateScreen