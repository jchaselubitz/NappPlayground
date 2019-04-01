import React, { Component } from 'react';
import Boundary, {Events} from 'react-native-boundary';
import { AppRegistry, Text, View, StyleSheet, Alert, TouchableOpacity } from 'react-native';

const latitude = 51.516666666
const longitude = -0.08583333333333333
const locName = "Chilangos"

export class Geofencer {
    componentWillMount() {
      Boundary.add({
        lat: latitude,
        lng: longitude,
        radius: 50, // in meters
        id: locName,
      })
        .then(() => console.log("success!"))
        .catch(e => console.error("error :(", e));
     
      Boundary.on(Events.ENTER, ids => {
        Alert.alert(`Wake up! you are at ${ids[0]}!!`)
      });
      
      Boundary.on(Events.EXIT, ids => {
        Alert.alert(`Seems you have left ${ids[0]}. SAD!`)
      })
    }
    
    // componentWillUnmount() {
    //   Boundary.remove('Chipotle')
    //     .then(() => console.log('Goodbye Chipotle :('))
    //     .catch(e => console.log('Failed to delete Chipotle :)', e))
    // }
  }
  


AppRegistry.registerComponent('NappPlayground', () => Geofencer);