import {AsyncStorage} from 'react-native'
import createDataContext from './createDataContext';
import trackerApi from '../api/tracker';
import {navigate} from '../../src/navigationRef'

const authReducer = (state, action) => {
  switch(action.type) {
    case 'signup':
    case 'signin':
      return {
        token: action.payload,
        errorMessage: ''
      }
    case 'signout':
      return {
        ...state,
        errorMessage: '',
        token: null
      }
    case 'error': 
      return {
        ...state,
        errorMessage: action.payload
      }
    case 'clear_error': 
      return {
        ...state,
        errorMessage: ''
      }
    default:
      return state;
  }
};

//try to sign up with token stored in AsyncStorage if present
const tryLocalSignIn = dispatch => async() => {
  const token = await AsyncStorage.getItem('token');
  if(token) {
    dispatch({type: 'signin', payload: token})
    navigate('TrackList')
  } else {
    navigate('Signup')
  }
  
}

const clearErrorMessage = dispatch => () => {
  dispatch({type: 'clear_errors'})
}

const signup = dispatch => async ({email, password}) => { 
    try {
     //make api request to sign up with email password 
     const res = await trackerApi.post('/signup', {email, password}) //==>> returns token from api
      console.log({email, password})
     //save token to device so user can stay logged in
     await AsyncStorage.setItem('token', res.data.token)
     //if we sign up, modify state and make state aware of authentication
      dispatch({type: 'signup', token: res.data.token})
      //navigate user to main flow navigator using custom navigate function
      navigate('TrackList')
    } catch (e) {
         //If failure, send back error
         dispatch({type: 'error', payload: 'Something Went Wrong with sign up.' })
    }
  }

const signin = dispatch => async ({email, password}) => {
    try {
    // try to sign in through api 
     const res = await  trackerApi.post('/signin', {email, password}) //==> should return token
    //handle success by updating state and saving token
    await AsyncStorage.setItem('token', res.data.token)
    dispatch({type: 'signin', payload: res.data.token})
    navigate('TrackList')
    } catch (e) {
      //handle failure by sending error message
      dispatch({
        type: 'error',
        payload: 'Something went wrong with Sign in.'
      })
    }
   

    
  }
 

const signout = dispatch => async () => {
  try {
    await AsyncStorage.removeItem('token')
    dispatch({type: 'signout'})
    navigate('loginFlow')
  } catch (e) {
    
  }
}

export const {Provider, Context} = createDataContext(authReducer, {signup, signin, signout, clearErrorMessage, tryLocalSignIn}, { token: null, errorMessage: '' })