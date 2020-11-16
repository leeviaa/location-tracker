import {useState, useEffect} from 'react';
import {Accuracy, requestPermissionsAsync, watchPositionAsync} from 'expo-location';

//custom hook for gathering location and getting permissions for location
export default ( shouldTrack, callback) => {
   //state for tracking errors
   const [err, setErr] = useState(null)
   
  // call startWatching() if shouldTrack === true, else turn off tracking
  useEffect(() => {
    let subscriber;
     //helper function to check for permissions
  const startWatching = async () => {
    try {
      const{ granted } = await requestPermissionsAsync();
      if(!granted) {
        throw new Error ('Location permission not granted')
      }
      subscriber = await watchPositionAsync({
        accuracy: Accuracy.BestForNavigation,
        timeInterval: 1000,
        distanceInterval: 10
      },callback 
      );
    } catch (e) {
      setErr(e)
    }
  }
    if(shouldTrack) {
      startWatching();
    } else {
      //defensive code to check for subscriber
      if(subscriber) {
           //stop watching
        subscriber.remove()
      }
      //set subscriber to null so it stops watching
      subscriber = null;
    }
    // returning a cleanup function to be called on 2nd useEffect call to cleanup subscriber so it doesnt get called multiple times
    return () => {
      if(subscriber){
        subscriber.remove();
      }
    }
  }, [shouldTrack, callback])

  return [err]
}