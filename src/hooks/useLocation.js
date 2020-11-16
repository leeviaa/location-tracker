import {useState, useEffect} from 'react';
import {Accuracy, requestPermissionsAsync, watchPositionAsync} from 'expo-location';

//custom hook for gathering location and getting permissions for location
export default ( shouldTrack, callback) => {
   //state for tracking errors
   const [err, setErr] = useState(null)
   //state for tracking subscriber in watchPosition
   const [subscriber, setSubscriber] = useState(null)
    //helper function to check for permissions
  const startWatching = async () => {
    try {
      const{ granted } = await requestPermissionsAsync();
      if(!granted) {
        throw new Error ('Location permission not granted')
      }
     const sub = await watchPositionAsync({
        accuracy: Accuracy.BestForNavigation,
        timeInterval: 1000,
        distanceInterval: 10
      },callback 
      );
      setSubscriber(sub)
    } catch (e) {
      setErr(e)
    }
  }
  // call startWatching() if shouldTrack === true, else turn off tracking
  useEffect(() => {
    if(shouldTrack) {
      startWatching()
    } else {
      //stop watching
      subscriber.remove()
      //set subscriber to null so it stops watching
      setSubscriber(null)
    }
  }, [shouldTrack])

  return [err]
}