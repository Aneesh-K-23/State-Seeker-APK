import React, { Component } from 'react';
import { View, StyleSheet, Image } from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize';

import firebase from 'firebase';
import db from '../config';

import {
  DrawerContentScrollView,
  DrawerItemList,
} from '@react-navigation/drawer';

export default class CustomSidebarMenu extends Component {
  render() {
    let props = this.props;
    return (
      <View
        style={{
          flex: 1,
          backgroundColor: '#EBEBEB',
        }}>
        <Image
          source={require('../assets/usa-logo.png')}
          style={styles.sideMenuProfileIcon}></Image>
        <DrawerContentScrollView {...props}>
          <DrawerItemList {...props} />
        </DrawerContentScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  sideMenuProfileIcon: {
    width: RFValue(140),
    height: RFValue(140),
    borderRadius: RFValue(70),
    alignSelf: 'center',
    marginTop: RFValue(60),
    resizeMode: 'contain',
  },
});
