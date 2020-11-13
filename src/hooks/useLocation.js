import {useState, useEffect} from 'react';
import {Accuracy, requestPermissionsAsync, watchPositionAsync} from 'expo-location';

//custom hook for gathering location and getting permissions for location
export default (callback) => {
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
      },callback 
      )
    } catch (e) {
      setErr(e)
    }
  }
  // call startWatching() upon component render once
  useEffect(() => {
    startWatching();
  }, [])

  return [err]
}