import React from 'react';

import {
  View,
  SafeAreaView,
  Platform,
  StatusBar,
  StyleSheet,
  Image,
  Text,
  ScrollView,
  ImageBackground,
} from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize';
import HeaderComponent from './Header';

export default class AboutUs extends React.Component {
  render() {
    return (
      <View style={styles.container}>
     
        <ImageBackground
          source={require('../assets/statebg1.png')}
          style={{ width: '100%', height: '100%', resizeMode: 'cover' }}>
          <View>
            <HeaderComponent />
          </View>
          <View style={{ justifyContent: 'center' }}>
            <Image
              style={styles.textImage}
              source={require('../assets/aboutus.png')}
            />
            <Image
              style={styles.textImage}
              source={require('../assets/title.png')}
            />
          </View>
          <ScrollView>
            <Text style={styles.textAbout}>
              At State Seeker, we believe that learning about the United States
              can be an exciting adventure for kids of all ages. Our mobile
              application is designed to turn the journey of exploring the
              states into an interactive experience.
            </Text>

            <Text style={styles.textAbout}>
              State Seeker is not just about memorizing facts; it's about
              sparking curiosity, fostering a love of learning, and instilling a
              deeper appreciation for the incredible diversity of the United
              States. Whether you're a budding young explorer or a seasoned
              geography enthusiast, State Seeker is your passport to the
              ultimate American adventure.
            </Text>
            <Text style={[styles.textAbout, { fontWeight: 'bold' }]}>
              Download State Seeker today and start your journey of discovery
              across the states!
            </Text>
          </ScrollView>
        </ImageBackground>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  textImage: {
    alignSelf: 'center',
    marginTop: 10,
  },
  textAbout: {
    padding: 10,
    backgroundColor: '#EBEBEB',
    fontSize: 15,
  },
});
