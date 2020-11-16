import { useContext } from 'react';
import {Context as TrackContext} from '../context/TrackContext';
import {Context as LocationContext} from '../context/LocationContext';
import {navigate} from '../navigationRef'

//function to link together TrackContext and LocationContext
export default () => {
  const {createTrack} = useContext(TrackContext);
  const { state: { name, locations }, reset } = useContext(LocationContext);

  const saveTrack = async () => {   
    await createTrack(name, locations);
    reset();
    //use custom navigate function to reroute user to track list screen after save
    navigate('TrackList')
  }

  return [saveTrack]
}