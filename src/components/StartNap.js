import React, { Component } from 'react';
import Boundary, {Events} from 'react-native-boundary';
import { AppRegistry, Button, Text, View, StyleSheet, Alert, TouchableOpacity } from 'react-native';
// import Geofencer from './Geofencer';

const latitude = 51.586111111
const longitude = -0.034444444444
const locName = "Chilangos"

const styles = StyleSheet.create({
  introText: {
    color: 'blue',
    fontWeight: 'bold',
    textAlign: 'center',
    fontSize: 30,
  },
  button: {
    marginBottom: 30,
    padding: 30,
    width: 260,
    alignItems: 'center',
    backgroundColor: '#2196F3'
  }
})

export default class StartNap extends Component {
  state = {  }

  handlePress = () => {
    
    this.setBoundary() 
  }

  setBoundary = () =>  {
    Alert.alert("You have set a location")
    Boundary.add({
      lat: latitude,
      lng: longitude,
      radius: 50, // in meters
      id: locName,
    })
      .then(() => console.log("success!"))
      .catch(e => console.error("error :(", e));
   
    Boundary.on(Events.ENTER, ids => {
      Alert.alert(`Wake up! you are at ${locName}!!`)
    });
  }

  dropBoundary = (locName) => {
    Alert.alert("Location Removed")
    Boundary.remove(locName)
    .then(() => console.log('Location Dropped'))
    .catch(e => console.log('failed to drop location', e))
  }

  render() { 
    return (
      <View style={{
        flex: 5,
        flexDirection: 'column',
        justifyContent: 'center',
      }}>
        <View style={{
          padding: 20,
          flex: 1, 
          backgroundColor: 'white',
          flexDirection: 'column',
          justifyContent: 'center'
        }}>
          <Text style={styles.introText}>
          Napp
          </Text>
        </View>
        <View style={{
          padding: 20,
          flex: 4,
          
          flexDirection: 'column',
          justifyContent: 'center'
          }}>

          <TouchableOpacity onPress={this.setBoundary} underlayColor="white">
            <View 
              style={styles.button}
            > 
              <Text> Start Nap </Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => this.dropBoundary(locName)} underlayColor="white">
            <View 
              style={styles.button}
            > 
              <Text> End Nap </Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>
     );
  }
}

AppRegistry.registerComponent('NappPlayground', () => StartNap);

