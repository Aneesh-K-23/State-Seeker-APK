import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import StackNavigator from './StackNavigator';
import Profile from '../screens/Profile';
import Logout from '../screens/Logout';
import AboutUs from '../screens/AboutUs';
import QuizScreen from '../screens/QuizScreen';

import CustomSidebarMenu from '../screens/CustomSidebarMenu';

const Drawer = createDrawerNavigator();

export default class DrawerNavigator extends React.Component {
  render() {
    let props = this.props;
    return (
      <Drawer.Navigator
        drawerContent={(props) => <CustomSidebarMenu {...props} />}
        screenOptions={{
          headerShown: true,
          drawerActiveTintColor: '#e91e63',
          drawerInactiveTintColor: 'grey',
          itemStyle: { marginVertical: 5 },
        }}>
        <Drawer.Screen
          name="MyHome"
          component={StackNavigator}
          options={{ unmountOnBlur: true }}
        />
        <Drawer.Screen
          name="Profile"
          component={Profile}
          options={{ unmountOnBlur: true }}
        />
        <Drawer.Screen
          name="Quiz"
          component={QuizScreen}
          options={{ unmountOnBlur: true }}
        />
        <Drawer.Screen
          name="AboutUS"
          component={AboutUs}
          options={{ unmountOnBlur: true }}
        />

        <Drawer.Screen
          name="Logout"
          component={Logout}
          options={{ unmountOnBlur: true }}
        />
      </Drawer.Navigator>
    );
  }
}
