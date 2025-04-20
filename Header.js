import React, { useState } from 'react';

import { View, Image, StyleSheet } from 'react-native';
import { Menu, MenuItem } from 'react-native-material-menu';
import { Header, Avatar } from 'react-native-elements';
import db from '../config';
import firebase from 'firebase';

export default class HeaderComponent extends React.Component {
  constructor() {
    super();
    this.state = {
      visible: false,
      uname: '',
    };
  }

  fetchUser = () => {
    let username;
    firebase
      .database()
      .ref('/users/' + firebase.auth().currentUser.uid)
      .on('value', (snapshot) => {
        username = snapshot.val().username;
        this.setState({ uname: username });
      });
  };

  componentDidMount() {
    this.fetchUser();
  }
  render() {
    return (
      <View style={{marginTop:0}}>
        <Header
          backgroundColor={'#EBEBEB'}
          leftComponent={
            <Image 
              source={require('../assets/usa-logo.png')}
              style={{
                width: 35,
                height: 35,
              
              }}></Image>
          }
          centerComponent={
              <Image 
              source={require('../assets/title.png')}
              style={{
               
                resizeMode: 'contain',
              
              }}></Image>
          }
          rightComponent={
           
                <Avatar
                  containerStyle={{
                    backgroundColor: '#1D82FF',
                    borderColor: 'white',
                    borderRadius: 55,
                  }}
                  rounded
                  title={this.state.uname[0]}
                  
                  activeOpacity={0.7}
                />
             
          }
        />
      </View>
    );
  }
}
