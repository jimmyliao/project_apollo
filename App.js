/**
 * Sample App for Camera preview and QRScanner
 * Refrence: https://alligator.io/react/react-native-navigation/
 */

import React, {Component} from 'react';

import {
  createStackNavigator,
} from 'react-navigation';

import {
  Platform, View,
  Dimensions,
  StyleSheet,
  Text,
  TouchableOpacity, Button
} from 'react-native';

import { RNCamera, FaceDetector } from 'react-native-camera';

import HomePage from './HomePage';
import ProfilePage from './ProfilePage';
import QRCodeSignInPage from './src/QRCodeScanner/QRCodeSignInPage';
import CameraPage from './src/Camera/CameraPage';

const RootStack = createStackNavigator(
  {
    Home: { screen: HomePage },
    Profile: { screen: ProfilePage },
    QRCodeSignInPage: { screen: QRCodeSignInPage },
    CameraPage: { screen: CameraPage },
  },
  {
    initialRouteName: 'Home',
  }
  
  );

export default class App extends React.Component {
  render() {
    return <RootStack />;
  }
}

