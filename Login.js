import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ImageBackground,
  Image,
} from 'react-native';
import firebase from 'firebase';
import { RFValue } from 'react-native-responsive-fontsize';

export default class Login extends React.Component {
  constructor() {
    super();
    this.state = {
      email: '',
      password: '',
    };
  }
  signIn = async (email, password) => {
    firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .then(() => {
        this.props.navigation.replace('Dashboard');
      })
      .catch((error) => {
        Alert.alert(error.message);
      });
  };
  render() {
    const { email, password } = this.state;
    return (
      <View style={styles.container}>
        <ImageBackground
          source={require('../assets/stateseeker.png')}
          style={{ resizeMode: 'cover', width: '100%', height: '100%' }}>
          <View
            style={{
              justifyContent: 'center',
              alignItems: 'center',
              marginTop: RFValue(340),
              marginLeft: 15
            }}>
          
            <View >
              <TextInput
                style={styles.input}
                value={email}
                onChangeText={(text) => this.setState({ email: text })}
                placeholder="Enter Email"
              />
              <TextInput
                style={styles.input}
                value={password}
                onChangeText={(text) => this.setState({ password: text })}
                placeholder="Enter password"
                secureTextEntry
              />
            </View>
            <View style={{
              justifyContent: 'center',
              alignItems: 'center',
             
            }}>
            <TouchableOpacity
              style={styles.button}
              onPress={() => this.signIn(email, password)}>
              <Text style={styles.buttonText}>Log In</Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => this.props.navigation.navigate('Register')}>
              <Text style={styles.registerText}>Register</Text>
            </TouchableOpacity>
            </View>
          </View>
        </ImageBackground>
      </View>
    );
  }
}

const styles = {
  container: {
    flex: 1,

    backgroundColor: '#f2f2f2',
  },
  label: {
    fontSize: 16,
    marginTop: 20,
    marginBottom: 5,
  },
  input: {
    width: 200,
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    marginTop: 10,
  },
  button: {
    width: 200,
    height: 40,
    backgroundColor: '#3F7BC8',
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 20,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
  },
  registerText: {
    marginTop: 10,
    fontSize: 16,
  },
};
