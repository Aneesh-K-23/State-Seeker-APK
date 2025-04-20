import React from 'react';
import {
  View,
  SafeAreaView,
  Dimensions,
  StatusBar,Platform,
  ImageBackground,
  TouchableOpacity,
  StyleSheet,
  Image,
} from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize';

export default class WelcomeScreen extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <SafeAreaView style={styles.droidSafeArea} />
        <TouchableOpacity
          activeOpacity={0.5}
          style={{ height: '300%' }}
          onPress={() => this.props.navigation.navigate('Login')}>
          <Image
            style={styles.bgImage}
            source={require('../assets/welcome.png')}
          />
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  droidSafeArea: {
    marginTop:
      Platform.OS === 'android' ? StatusBar.currentHeight : RFValue(0),
  },
  bgImage: {
    resizeMode: 'cover',
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
  },
});
