import React from 'react';

import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  SafeAreaView,
  Platform,
  StatusBar,
  StyleSheet,
  Image,
  Dimensions,
  ImageBackground,
} from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize';
import { Header, Avatar } from 'react-native-elements';
import firebase from 'firebase';
import HeaderComponent from './Header';
//let states = require('./temp.json');

export default class HomeScreen extends React.Component {
  constructor() {
    super();
    this.state = {
      states: {},
    };
  }
  componentDidMount() {
    this.fetchStates();
  }
  fetchStates = () => {
    firebase
      .database()
      .ref('/states/')
      .on('value', (snapshot) => {
        let states = [];
        if (snapshot.val()) {
          //      console.log(snapshot.val())
          var statesList = snapshot.val();
          for (var s in statesList) {
            //      console.log('statesInfo : ', statesList[s]);

            states.push(statesList[s]);
          }
        }

        this.setState({ states: states });
      });
  };

  renderItem = ({ item }) => {
    return (
      <TouchableOpacity
        style={styles.itemContainer}
        onPress={() => {
          this.props.navigation.navigate('StateInfo', {
            stateinfo: item,
          });
        }}>
        <ImageBackground
          source={{
            uri: item['image_url'],
          }}
          resizeMode="cover"
          style={styles.image}>
          <View>
            <Text style={styles.stateText}>{item['name']}</Text>
          </View>
        </ImageBackground>
      </TouchableOpacity>
    );
  };

  keyExtractor = (item, index) => index.toString();
  render() {
    const { states } = this.state;
    return (
      <View style={styles.container}>
       
        <ImageBackground
          source={require('../assets/statebg1.png')}
          style={{ width: '100%', height: '100%' }}>
          <View>
            <HeaderComponent />
          </View>

          {!states[0] ? (
            <View style={styles.noStates}>
              <Text style={styles.welcomeMsg}>Loading.....</Text>
            </View>
          ) : (
            <View style={styles.cardContainer}>
              <FlatList
                keyExtractor={this.keyExtractor}
                data={states}
                renderItem={this.renderItem}
              />
            </View>
          )}

          <View style={{ flex: 0.15 }} />
        </ImageBackground>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  droidSafeArea: {
    marginTop: Platform.OS === 'android' ? StatusBar.currentHeight : RFValue(0),
  },
  itemContainer: {
    margin: RFValue(13),
    height: 200,
  },
  cardContainer: {
    margin: RFValue(13),
    flex: 0.85,
    marginBottom: 35,
  },

  welcomeMsg: {
    textAlign: 'center',
    fontWeight: '600',
    marginTop: '60%',
    fontSize: 25,
    justifyContent: 'center',
    fontStyle: 'italic',
  },
  noStates: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    flex: 1,
    justifyContent: 'center',
    width: '100%',
    height: '100%',
    borderRadius: RFValue(50),
    marginTop: 20,
  },
  stateText: {
    color: 'white',
    fontSize: 20,
    lineHeight: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    backgroundColor: '#000000c0',
    fontStyle: 'italic',
    marginTop: 55,
  },
});
