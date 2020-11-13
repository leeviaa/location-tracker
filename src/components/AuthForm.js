import React, {useState} from 'react';
import {StyleSheet} from 'react-native'
import {Text, Button, Input} from 'react-native-elements';
import Spacer from './Spacer'

const AuthForm = ({errorMessage, headerText, onSubmit, onSubmitButtonText}) => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')


  return (
  <>
    <Spacer>
    <Text h3>{headerText}</Text>
  </Spacer>
   <Spacer>
     <Input
        label="Email"
         value={email} 
         onChangeText={(newEmail) => setEmail(newEmail) } 
         autoCapitalize="none"
         autoCorrect={false}
         />
   </Spacer>
   <Spacer>
     <Input 
      label="Password" 
      value={password}
      onChangeText={setPassword}
      autoCapitalize="none"
      autoCorrect={false}
      secureTextEntry
       />
   </Spacer>
   {errorMessage ? <Text style={styles.errorMessage}>{errorMessage} :</Text> : null}
   <Spacer>
    <Button title={onSubmitButtonText} onPress={() => onSubmit({email, password})} />
   </Spacer>
  </>
    
  )
}

const styles = StyleSheet.create({
  errorMessage: {
    fontSize: 16,
    color: 'red',
    marginLeft: 16,
  },
});

export default AuthForm