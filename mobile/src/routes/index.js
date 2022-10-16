import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  ImageBackground,
  Button,
  TouchableOpacity,
} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createDrawerNavigator} from '@react-navigation/drawer';
import Home from '../screens/home';
import SignUp from '../screens/signup';
import SignIn from '../screens/signin';
import ForgetPassword from '../screens/forget-password';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  DrawerContentScrollView,
  DrawerItemList,
} from '@react-navigation/drawer';
import styles from './styles';
import LogOutIcon from '../assets/images/icon-logout.png';
import CalendarIcon from '../assets/images/icon-calendar.png';
import VaccineIcon from '../assets/images/icon-vaccine.png';

const Drawer = createDrawerNavigator();

function Navigator() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const userData = AsyncStorage.getItem('user');
    if (userData) {
      setUser(userData);
    }
  }, []);

  const onHandleSignOu = ({navigation}) => {
    setUser(null);
    AsyncStorage.removeItem('user');
    navigation.closeDrawer();
  };

  if (user) {
    return (
      <NavigationContainer>
        <Drawer.Navigator
          initialRouteName="Home"
          screenOptions={{
            drawerStyle: {
              backgroundColor: '#ADD4D0',
              justifyContent: 'center',
              textAlign: 'center',
            },
          }}
          drawerContent={props => (
            <DrawerContentScrollView style={styles.drawer} {...props}>
              <View style={styles.labelUsername}>
                <Text style={styles.username}>
                  Olá {user.displayName ?? 'Anônimo'}
                </Text>
              </View>
              {props.state.routeNames.map((route, index) => {
                let icon;
                let title = '';
                switch (route) {
                  case 'Home':
                    title = 'Minhas vacinas';
                    icon = VaccineIcon;
                    break;
                  case 'Vaccine':
                    title = 'Próximas vacinas';
                    icon = CalendarIcon;
                    break;
                }
                return (
                  <TouchableOpacity
                    key={index}
                    style={styles.drawerItem}
                    onPress={() => props.navigation.navigate(route)}>
                    {icon && (
                      <ImageBackground source={icon} style={styles.icon} />
                    )}
                    <Text style={styles.button}>{title}</Text>
                  </TouchableOpacity>
                );
              })}
              <TouchableOpacity
                style={styles.drawerItem}
                onPress={() => onHandleSignOu(props)}>
                <ImageBackground source={LogOutIcon} style={styles.icon} />
                <Text style={styles.button}>Sair</Text>
              </TouchableOpacity>
            </DrawerContentScrollView>
          )}>
          {[
            {name: 'Home', component: Home},
            {name: 'Vaccine', component: Home},
          ].map((route, index) => (
            <Drawer.Screen
              key={index}
              name={route.name}
              component={route.component}
              options={{
                title: 'Minhas vacinas',
                headerTitleStyle: {
                  fontSize: 24,
                  fontFamily: 'averia-libre',
                  color: '#419ED7',
                },
                headerTintColor: '#419ED7',
                headerStyle: {
                  backgroundColor: '#C1E7E3',
                },
              }}
            />
          ))}
        </Drawer.Navigator>
      </NavigationContainer>
    );
  }

  return (
    <NavigationContainer>
      <Drawer.Navigator
        initialRouteName="SignIn"
        drawerContent={() => null}
        screenOptions={{
          headerShown: false,
        }}>
        <Drawer.Screen name="SignIn" options={{headerShown: false}}>
          {props => <SignIn {...props} setUser={setUser} />}
        </Drawer.Screen>
        <Drawer.Screen name="SignUp" options={{headerShown: false}}>
          {props => <SignUp {...props} setUser={setUser} />}
        </Drawer.Screen>
        <Drawer.Screen name="ForgetPassword" options={{headerShown: false}}>
          {props => <ForgetPassword {...props} />}
        </Drawer.Screen>
      </Drawer.Navigator>
    </NavigationContainer>
  );
}

export default Navigator;
