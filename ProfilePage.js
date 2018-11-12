import React from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';
// import HomePage from './HomePage';

export default class ProfilePage extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <Text>PofilePage here.</Text>
        <Button
          title="Go to HomePage"
          onPress={() =>
            this.props.navigation.navigate('Home')
        }
        />
        
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
