import React from 'react';

import {
  View,
  Text,
  TextInput,
  ImageBackground,
  TouchableOpacity,
  SafeAreaView,
  Platform,
  StatusBar,
  Alert,
  StyleSheet,
  Image,
} from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize';
import { Header, Avatar } from 'react-native-elements';
import firebase from 'firebase';
import HeaderComponent from './Header';

export default class Profile extends React.Component {
  constructor() {
    super();
    this.state = {
      email: firebase.auth().currentUser.email,
      fullname: '',
      uname: '',
      bio: '',
      username: '',
      bestQuizScore: '',
    };
  }
  componentDidMount() {
    this.fetchUser();
  }

  fetchUser = () => {
    let username;
    firebase
      .database()
      .ref('/users/' + firebase.auth().currentUser.uid)
      .on('value', (snapshot) => {
        username = snapshot.val().username;
        this.setState({
          uname: username[0],
          fullname: username,
          bio: snapshot.val().bio,
          username: snapshot.val().username,
          bestQuizScore: snapshot.val().bestQuizScore,
        });
      });
  };
  handleSubmit = (username, bio) => {
    var userRef = firebase
      .database()
      .ref('users/' + firebase.auth().currentUser.uid);
    userRef.update({
      username: username,
      bio: bio,
    });

    Alert.alert('Profile updated Successfully!!!');
  };
  render() {
    return (
      <View style={styles.container}>
        <View style={styles.avatarContainer}>
          <Avatar
            size="large"
            rounded
            title={this.state.uname}
            containerStyle={{ backgroundColor: 'gray' }}
          />
          <Text style={styles.nameText}>{this.state.fullname}</Text>
        </View>
        <View style={styles.form}>
          <Text style={styles.label}>Name</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter Name"
            value={this.state.username}
            onChangeText={(text) => this.setState({ username: text })}
          />
          <Text style={styles.label}>Email</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter Email"
            value={this.state.email}
            editable={false}
            onChangeText={(text) => this.setState({ email: text })}
          />
          <Text style={styles.label}>Bio</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter Bio"
            value={this.state.bio}
            onChangeText={(text) => this.setState({ bio: text })}
          />
          <Text style={styles.label}>
            Best Quiz Score : {this.state.bestQuizScore}
          </Text>

          <TouchableOpacity
            style={styles.button}
            onPress={() =>
              this.handleSubmit(this.state.username, this.state.bio)
            }>
            <Text style={styles.buttonText}>Submit</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#EBEBEB',
  },
  form: {
    width: '80%',
  },
  label: {
    marginTop: 10,
  },
  input: {
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
    padding: 10,
    fontSize: 15,
  },
  button: {
    marginTop: 10,
    backgroundColor: '#1E90FF',
    borderRadius: 5,
    paddingVertical: 10,
    paddingHorizontal: 20,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 15,
  },
  avatarContainer: {
    marginTop: 10,
    alignItems: 'center',
  },
});
