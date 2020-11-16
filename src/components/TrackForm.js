import React, { useContext} from 'react'
import {Input, Button} from 'react-native-elements';
import {Context as LocationContext} from '../context/LocationContext'
import Spacer from './Spacer';
import useSaveTrack from '../hooks/useSaveTrack';

const TrackForm = () => {

  const { state: { name, recording, locations},
    startRecording,
     stopRecording, 
     changeName} = useContext(LocationContext)
     const [saveTrack] = useSaveTrack();
  return(

    <>
      <Input onChangeText={changeName} value={name} placeholder="Enter Track Name" />
      {recording ? <Button title="Stop" onPress={stopRecording} /> 
       : <Spacer> 
         <Button title="Start Recording" onPress={startRecording} />
       </Spacer>  }
       {
         !recording && locations.length ?
        <Spacer>
            <Button title="Save Recording" onPress={() => saveTrack(name, locations)} /> 
        </Spacer> : null
       }
    </>
  )
}

export default TrackForm;