import React from 'react';
import {NavigationContainer} from '@react-navigation/native'
import StackNavigator from './navigation/StackNavigator'
import { View, Text } from 'react-native';
import HomeScreen from './screens/HomeScreen'; 
import { createStackNavigator } from "@react-navigation/stack";
import DrawerNavigator from './navigation/DrawerNavigator'
import Login from './screens/Login'
import Register from './screens/Register'
import WelcomeScreen from './screens/WelcomeScreen';

import firebase from 'firebase'

import {firebaseConfig} from './config'

if(!firebase.apps.length){
  firebase.initializeApp(firebaseConfig)
}else{
  firebase.app()
}
const Stack = createStackNavigator()

const StackNav = () =>{ 
   return (
    <Stack.Navigator
      initialRouteName="Welcome"
      screenOptions={{
        headerShown: false
      }}
    >
      <Stack.Screen name="Welcome" component={WelcomeScreen} />
      <Stack.Screen name="Login" component={Login} />
      <Stack.Screen name="Register" component={Register} />
      <Stack.Screen name="Dashboard" component={DrawerNavigator} />
    </Stack.Navigator>
  );
}

export default class App extends React.Component {
  render() {
    return (
      <NavigationContainer>
        <StackNav />
      </NavigationContainer>
    );
  }
}
