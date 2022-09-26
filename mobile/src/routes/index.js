import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createDrawerNavigator} from '@react-navigation/drawer';
import Home from '../screens/home';
import SignUp from '../screens/signup';

const Drawer = createDrawerNavigator();

function Navigator() {
  return (
    <NavigationContainer>
      <Drawer.Navigator initialRouteName="Home">
        <Drawer.Screen name="Home" component={Home} />
        <Drawer.Screen name="SignUp" component={SignUp} />
      </Drawer.Navigator>
    </NavigationContainer>
  );
}

export default Navigator;
