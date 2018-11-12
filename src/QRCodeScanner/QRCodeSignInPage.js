import React from 'react';
import { StyleSheet, Text, View, Button, TouchableOpacity } from 'react-native';

import { RNCamera, FaceDetector } from 'react-native-camera';

export default class QRCodeSignInPage extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      shouldFaceDetect: false,
    };
  }

  componentWillMount() {
    console.log('componentWillMount');
    this.setState({shouldFaceDetect: true});

  }

  takePicture = async function() {
    if (this.camera) {
      const options = { quality: 0.5, base64: true };
      const data = await this.camera.takePictureAsync(options)
      console.log(data.uri);
    }
  };

  _resetCameraState() {
    this.setState({shouldFaceDetect: true});
  }

  _onBarCodeRead(){
    console.log('_onBarCodeRead start.');
    this.setState({shouldFaceDetect: false});
    alert("hey sported barcode!");
    console.log('_onBarCodeRead end.');
    
  }

  render() {

    return (
      <View style={styles.container}>
        <RNCamera
            ref={ref => {
              this.camera = ref;
            }}
            style = {styles.preview}
            type={RNCamera.Constants.Type.back}
            flashMode={RNCamera.Constants.FlashMode.on}
            permissionDialogTitle={'Permission to use camera'}
            permissionDialogMessage={'We need your permission to use your camera phone'}
            onBarCodeRead={this.state.shouldFaceDetect ? this._onBarCodeRead.bind(this) : null}
        />
        <View style={{flex: 0, flexDirection: 'row', justifyContent: 'center',}}>
        <TouchableOpacity
            onPress={this.takePicture.bind(this)}
            style = {styles.capture}
        >
            <Text style={{fontSize: 14}}> SNAP. </Text>
        </TouchableOpacity>

        <TouchableOpacity
            onPress={this._resetCameraState.bind(this)}
            style = {styles.capture}
        >
            <Text style={{fontSize: 14}}> ReScan. </Text>
        </TouchableOpacity>

        <TouchableOpacity
            onPress={() =>
              this.props.navigation.navigate('Home')
            }
            style = {styles.capture}
        >
            <Text style={{fontSize: 14}}> Home. </Text>
        </TouchableOpacity>

        </View>
      </View>
    );
  }

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: 'black',
  },

  preview: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center'
  },

  capture: {
    flex: 0,
    backgroundColor: '#fff',
    borderRadius: 5,
    padding: 15,
    paddingHorizontal: 20,
    alignSelf: 'center',
    margin: 20
  },
});
