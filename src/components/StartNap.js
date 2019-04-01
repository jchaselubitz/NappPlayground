import React, { Component } from 'react';
import Boundary, {Events} from 'react-native-boundary';
import { AppRegistry, Button, Text, View, StyleSheet, Alert, TouchableOpacity } from 'react-native';
import Geofencer from './Geofencer';

const latitude = 51.516666666
const longitude = -0.08583333333333333
const locName = "Chilangos"

const styles = StyleSheet.create({
  introText: {
    color: 'blue',
    fontWeight: 'bold',
    fontSize: 40,
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
    Alert.alert("pressed!")
    this.setBoundary()
    
  }

  setBoundary = () =>  {
    Boundary.add({
      lat: 51.516666666,
      lng: -0.08583333333333333,
      radius: 50, // in meters
      id: "Chilangos",
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

  componentDidMount() {
    this.setBoundary()
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
          flex: 4,
          backgroundColor: 'powderblue',
          flexDirection: 'column',
          justifyContent: 'center'
          }}>
          <Text style={styles.introText}>
          Press the button to set alarm
          </Text>
          <TouchableOpacity onPress={this.handlePress} underlayColor="white">
            <View 
              style={styles.button}
            > 
              <Text> Tap Here </Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>
     );
  }
}

AppRegistry.registerComponent('NappPlayground', () => StartNap);

