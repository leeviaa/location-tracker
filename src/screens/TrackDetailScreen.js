import React, {useContext} from 'react';
import { Text, StyleSheet} from 'react-native';
import {Context as TrackContext} from '../context/TrackContext';
import MapView, {PolyLine} from 'react-native-maps';


const TrackDetailScreen = ({navigation}) => {
  const { state } = useContext(TrackContext);
  const _id = navigation.getParam('_id');
  //find track that was clicked on by id and by looping over state
  const track = state.find( t => t._id === _id );
// extrack initial coordinates from track 
  const initialCoords =  track.locations[0].coords



  return (
    <>
    <Text style={{fontSize: 48}}>{track.name}</Text>
    {/* <MapView
    style={styles.map}
      initialRegion={{
        longitudeDelta: 0.01,
        latitudeDelta: 0.01,
        ...initialCoords
      }}
      >
      <PolyLine coordinates={track.locations.map(loc=> loc.coords)} />
    </MapView> */}
    </>
  )
}

const styles = StyleSheet.create({
  map: {
    height: 300
  }
});

export default TrackDetailScreen