import React from 'react';

import {
  View,
  Text,
  TouchableOpacity,
  ImageBackground,
  TextInput,
  Alert,
} from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize';
import firebase from 'firebase'

export default class Register extends React.Component {
  constructor() {
    super();
    this.state = {
      username: '',
      email: '',
      password: '',
      confirmPassword: '',
    };
  }
  registerUser = (username,email,password,confirmPassword)=>{
    if(password==confirmPassword){
      firebase
      .auth()
      .createUserWithEmailAndPassword(email,password)
      .then((userCredential)=>{
        console.log('usercred : ',userCredential)
       // alert("user registered!!")
        
       firebase.database().ref('/users/'+userCredential.user.uid)
       .set({
         email: userCredential.user.email,
         username: username,
         bestQuizScore:0,
         bio:''
       })
       Alert.alert("user registered!!")
       this.props.navigation.replace('Login')
      })
    }else{
     // alert("Passwords dont match")
      Alert.alert("Passwords dont match")
    }
  }
  render() {
    const {username,email,password,confirmPassword} = this.state
    return (
    <View style={styles.container}>
    <ImageBackground
          source={require('../assets/register.png')}
          style={{ resizeMode: 'cover', width: '100%', height: '100%' }}>
          <View
            style={{
              justifyContent: 'center',
              alignItems: 'center',
              marginTop: 160,
            }}>
      
        <TextInput
          style={styles.input}
          value={username}
          onChangeText={(text) => this.setState({ username: text })}
          placeholder="Enter User name"
        />

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

        <TextInput
          style={styles.input}
          value={confirmPassword}
          onChangeText={(text) => this.setState({ confirmPassword: text })}
          placeholder="Confirm password"
          secureTextEntry
        />

        <TouchableOpacity style={styles.button} onPress={()=>
          this.registerUser(username,email,password,confirmPassword)
        }>
          <Text style={styles.buttonText}>Register</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => this.props.navigation.replace('Login')}>
          <Text style={styles.registerText}>
            Already have an account? Log in
          </Text>
        </TouchableOpacity> 
        </View>   
        </ImageBackground> 
      </View>

      
    );
  }
}

const styles = {
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
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
