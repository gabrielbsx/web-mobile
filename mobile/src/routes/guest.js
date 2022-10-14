import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createDrawerNavigator} from '@react-navigation/drawer';
import SignIn from '../screens/signin';
import SignUp from '../screens/signup';

const Drawer = createDrawerNavigator();

function Guest() {
  return (
    <NavigationContainer>
      <Drawer.Navigator initialRouteName="SignIn">
        <Drawer.Screen
          name="SignIn"
          component={SignIn}
          options={{headerShown: false}}
        />
        <Drawer.Screen
          name="SignUp"
          component={SignUp}
          options={{headerShown: false}}
        />
        <Drawer.Screen
          name="ForgetPassword"
          component={SignUp}
          options={{headerShown: false}}
        />
      </Drawer.Navigator>
    </NavigationContainer>
  );
}

export default Guest;
