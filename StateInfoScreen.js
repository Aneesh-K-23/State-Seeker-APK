import React from 'react';

import {
  View,
  Text,
  TouchableOpacity,
  SafeAreaView,
  Platform,
  StatusBar,
  StyleSheet,
  Image,
  FlatList,
  ImageBackground,
} from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize';
import HeaderComponent from './Header';

export default class StateInfoScreen extends React.Component {
  constructor() {
    super();
    this.state = {
      name: '',
      capital: '',
      facts: [],
      bg_img: '',
    };
  }
  componentDidMount() {
    this.setState({
      name: this.props.route.params.stateinfo['name'],
      capital: this.props.route.params.stateinfo['capital'],
      facts: this.props.route.params.stateinfo['facts'],
      bg_img: this.props.route.params.stateinfo['image_url'],
    });
  }
  renderItem = ({ item }) => { 
    return (
      <View style={styles.itemContainer}>
        <Text style={styles.stateText}>{item}</Text>
      </View>
    );
  };
  keyExtractor = (item, index) => index.toString();
  render() {
    const { bg_img } = this.state;
    return (
      <View style={styles.container}>
        <ImageBackground
          source={{ uri: bg_img }}
          imageStyle={{ opacity: 0.3 }}
          style={{ width: '100%', height: '100%' }}> 
          <SafeAreaView style={styles.droidSafeArea} />
          <View>
            <HeaderComponent />
          </View>
          <View>
            <View style={{ flexDirection: 'row', justifyContent: 'center' }}>
              <Text style={[styles.stateNText, { color: '#3F7BC8' }]}>
                State Name:
              </Text>
              <Text style={[styles.stateNText, { color: '#E91E2B' }]}>
                {this.state.name}
              </Text>
            </View>
            <View style={{ flexDirection: 'row', justifyContent: 'center' }}>
              <Text style={[styles.stateNText, { color: '#3F7BC8' }]}>
                Capital:
              </Text>
              <Text style={[styles.stateNText, { color: '#E91E2B' }]}>
                {this.state.capital}
              </Text>
            </View>
          </View>
          <View style={styles.cardContainer}>
            <FlatList
              data={this.state.facts}
              renderItem={this.renderItem}
              keyExtractor={this.keyExtractor}
            />
          </View>
          <View style={{ flex: 0.05}} />
        </ImageBackground>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  droidSafeArea: {
    marginTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
  },
  itemContainer: {
    margin: RFValue(13),
    backgroundColor: 'white',
    borderRadius: RFValue(20),
  },
  cardContainer: {
    margin: RFValue(13),
    flex: 0.95,
   
  },
  stateText: {
    color: '#3F7BC8',
    marginLeft: 20,
    fontSize: 20,
    fontStyle: 'italic',
  },
  stateNText: {
    color: 'darkslategrey',
    fontWeight: 'bold',
    textAlign: 'center',
    fontSize: 30,
    fontStyle: 'italic',
  },
});
