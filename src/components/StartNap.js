import React, { Component } from 'react';
import Boundary, {Events} from 'react-native-boundary';

import MapView from 'react-native-maps'
import { AppRegistry, Button, Text, Dimensions, View, StyleSheet, Alert, TouchableOpacity, Vibration } from 'react-native';


const latitude = 51.52027777777778
const longitude = -0.0875
const locName = "Chilangos"
const DURATION = 10000 ;
const PATTERN = [ 100, 50] ;
let selectedMapType = "standard"

const styles = StyleSheet.create({
  button: {
    marginBottom: 10,
    padding: 10,
    width: 260,
    alignItems: 'center',
    backgroundColor: '#2196F3'
  },
  map: {
    flex: 4,
    backgroundColor: 'gray',
    flexDirection: 'column',
    justifyContent: 'center',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0
  }
})

export default class StartNap extends Component {


  //===========ALERT==================
  startVibrationFunction = () => {
    Vibration.vibrate(PATTERN, true)
  }
  stopVibrationFunction = () => {
    Vibration.cancel()
  }

  //===========GEOFENCE==================
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
      startVibrationFunction()
    });
  }

  dropBoundary = (locName) => {
    Alert.alert("Location Removed")
    Boundary.remove(locName)
    .then(() => console.log('Location Dropped'))
    .catch(e => console.log('failed to drop location', e))
  }

  


  //===========RENDER==================
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
          <Text> Latitude: {this.props.cLatitude} </Text>
          <Text> Longitude: {this.props.cLongitude} </Text>
          <Text> {this.props.cError} </Text>
        </View>

        <MapView 
          style={styles.map}
          mapType={selectedMapType}
          region={{
            latitude: !!this.props.cLatitude ? this.props.cLatitude : 0,
            longitude: !!this.props.cLongitude ? this.props.cLongitude : 0,
            latitudeDelta: 1,
            longitudeDelta: 1,
          }}
          >
            {!!this.props.cLatitude && !!this.props.cLongitude && <MapView.Marker
              coordinate={{"latitude": this.props.cLatitude,"longitude": this.props.cLongitude}}
              title={"Your Location"}
            />}

            {!!this.props.cordLatitude && !!this.props.cordLongitude && <MapView.Marker
              coordinate={{"latitude":this.props.cordLatitude,"longitude":this.props.cordLongitude}}
              title={"Your Destination"}
            />}
            
           {!!this.props.cLatitude && !!this.props.cLatitude && this.props.x == 'true' && 
            <MapView.Polyline
                coordinates={this.props.coords}
                strokeWidth={2}
                strokeColor="red"
              />
            }

            {!!this.props.cLatitude && !!this.props.cLatitude && this.props.x == 'error' && 
              <MapView.Polyline
                      coordinates={[
                          {latitude: this.props.cLatitude, longitude: this.props.cLatitude},
                          {latitude: this.props.cordLatitude, longitude: this.props.cordLongitude},
                      ]}
                      strokeWidth={2}
                      strokeColor="red"
              />
            }          
        </MapView>
        

        
        <View style={{
          padding: 20,
          flex: 3,
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

          <TouchableOpacity onPress={this.startVibrationFunction} underlayColor="white">
            <View 
              style={styles.button}
            > 
              <Text> Start Vibration </Text>
            </View>
          </TouchableOpacity>

          <TouchableOpacity onPress={this.stopVibrationFunction} underlayColor="white">
            <View 
              style={styles.button}
            > 
              <Text> Stop Vibration </Text>
            </View>
          </TouchableOpacity>

        </View>
      </View>
     );
  }
}

AppRegistry.registerComponent('NappPlayground', () => StartNap);

