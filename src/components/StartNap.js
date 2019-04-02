import React, { Component } from 'react';
import RNCalendarEvents from 'react-native-calendar-events';
import { AppRegistry, Button, Text, View, StyleSheet, Alert, TouchableOpacity } from 'react-native';

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
  setBoundary = () => {
    RNCalendarEvents.saveEvent('End of Nap', {
      startDate: '2018-08-19T19:26:00.000Z',
      endDate: '2019-08-19T19:26:00.000Z',
      alarms: [{
        structuredLocation: {
          title: locName,
          proximity: 'enter',
          radius: 50,
          coords: {
            latitude: latitude,
            longitude: longitude
          }
        } 
      }]
    })
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
          {/* <TouchableOpacity onPress={() => this.dropBoundary(locName)} underlayColor="white">
            <View 
              style={styles.button}
            > 
              <Text> End Nap </Text>
            </View>
          </TouchableOpacity> */}
        </View>
      </View>
     );
  }
}

AppRegistry.registerComponent('NappPlayground', () => StartNap);

