import * as Location from 'expo-location';

//measures 10m(ish) in long/lat terms
const tenMetersWithDegrees = 0.0001;

//test function to trick device into thinking location is changing by 10 meters
const getLocation = increment => {
  return {
    timestamp: 1000000,
    coords: {
      speed: 0,
      heading: 0,
      accuracy: 5,
      altitudeAccuracy: 5,
      altitude: 5,
      longitude: -122.0312186 + increment * tenMetersWithDegrees,
      latitude: 37.33233141 + increment * tenMetersWithDegrees
    }
  }
}
//counter updates every seconds for incremeent arg on getLocation
let counter = 0;
setInterval(() => {
  Location.EventEmitter.emit('Expo.locationChanged', {
    watchId: Location._getCurrentWatchId(),
    location: getLocation(counter)
  })
  counter++
}, 1000)