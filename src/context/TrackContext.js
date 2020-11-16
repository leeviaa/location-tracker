import createDataContext from './createDataContext';
import trackerApi from '../api/tracker';

const trackReducer = (state, action) => {
  switch(action.type) {
    case 'fetch_tracks':
      return action.payload
    default: 
      return state
  }
}
//get all trakcs from logged in user
const fetchTracks = dispatch => async () => {
  try {
    const res = await trackerApi.get('/tracks');
    dispatch({type: 'fetch_tracks', payload: res.data})
  } catch (e) {
    
  }
};

const createTrack = dispatch => async (name, locations) => {
  try {
    await trackerApi.post('/tracks', {name, locations})
  } catch (e) {
    return console.error(e.message)
  }

};

export const {Provider, Context} = createDataContext(
  trackReducer, 
  {fetchTracks, createTrack},
  []
)