import React from 'react';
import {Text} from 'react-native-elements';
import {TouchableOpacity, StyleSheet} from 'react-native';
import Spacer from './Spacer'
import {withNavigation} from 'react-navigation';

const NavLink = ({navigation, text, routeName}) => {
  return(
    
    <TouchableOpacity onPress={() => navigation.navigate(routeName)}>
      <Spacer>
      <Text h5 style={styles.link}>{text}</Text>
      </Spacer>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  link: {
    color: 'blue'
  }
});

export default withNavigation(NavLink)