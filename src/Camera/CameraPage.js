import React from 'react';
import { Dimensions, StyleSheet, Text, View, Button, TouchableOpacity, ImageBackground } from 'react-native';

import { RNCamera, FaceDetector } from 'react-native-camera';

// https://github.com/react-native-community/react-native-camera/issues/1485
export default class CameraPage extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      shouldFaceDetect: false,
      path: null,
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
      console.log('takePicture, data.uri: ' + data.uri);
      // console.log('takePicture, data: ' + data);
      this.setState({ 
        path: data.uri,
        shouldFaceDetect: false,
      });
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

  renderCamera() {
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
          // onBarCodeRead={this.state.shouldFaceDetect ? this._onBarCodeRead.bind(this) : null}
      />

          
      <View style={{flex: 0, flexDirection: 'row', justifyContent: 'center',}}>
      <TouchableOpacity
          onPress={this.takePicture.bind(this)}
          style = {styles.capture}
      >
          <Text style={{fontSize: 14}}> SNAP. </Text>
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

  renderImage() {
    return (
      <View style={styles.container}>
        <ImageBackground
          source={{ uri: this.state.path }}
          style={styles.preview}
        >
          <Text
            style={styles.cancel}
            onPress={() => this.setState({ path: null })}
          >Cancel
          </Text>
        </ImageBackground>
      </View>
    );
  }  

  render() {
    return (
      <View style={styles.container}>
        {this.state.path ? this.renderImage() : this.renderCamera()}
      </View>
    );
  }

  render_old() {
    if (this.state.imgUri != "") {
      return <ImageBackground source={imageUri}/>;
    } else {
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

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#000',
  },

  preview: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
    height: Dimensions.get('window').height,
    width: Dimensions.get('window').width
  },

  capture: {
    width: 70,
    height: 70,
    borderRadius: 35,
    borderWidth: 5,
    borderColor: '#FFF',
    marginBottom: 15,
  },

  cancel: {
    position: 'absolute',
    right: 20,
    top: 20,
    backgroundColor: 'transparent',
    color: '#FFF',
    fontWeight: '600',
    fontSize: 17,
  }

});
