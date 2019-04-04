import React, { Component } from 'react';
import Boundary, {Events} from 'react-native-boundary';
import RNReverseGeocode from "@kiwicom/react-native-reverse-geocode";
import MapView from 'react-native-maps'
import { AppRegistry, List, Button, KeyboardAvoidingView, Text, Dimensions, View, StyleSheet, Alert, TouchableOpacity, Vibration, FlatList } from 'react-native';
import { SearchBar, ListItem} from 'react-native-elements';

//target coords
const latitude = 51.5185847
const longitude = -0.0856228
const locName = "Chilangos"
const DURATION = 10000 ;
const PATTERN = [ 100, 50] ;
const selectedMapType = "standard"


export default class StartNap extends Component {
 

  state = {
    error: null,
    loading: false,
    searchText: "",
    searchResults: [],
   
  }



 //===========POI SEARCH==================

 region = {
  latitude: !!this.props.cLatitude ? this.props.cLatitude : 0,
  longitude: !!this.props.cLongitude ? this.props.cLongitude : 0,
  latitudeDelta: 0.1,
  longitudeDelta: 0.1
};

  setSearchText = (text) => {
    this.setState({
      searchText: text
    }, this.placeSearch(this.state.searchText))
  }
  
  placeSearch = (searchText) => {
    RNReverseGeocode.searchForLocations(
      searchText,
      this.region,
      (err, results) => {
        this.setState({
          error: err,
          searchResults: this.state.searchText !== "" ? results : []
        });
      }
    );
  }

 
  

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
      lat: this.props.cordLatitude,
      lng: this.props.cLongitude,
      radius: 50, // in meters
      id: locName,
    })
      .then(() => console.log("success!"))
      .catch(e => console.error("error :(", e));
   
    Boundary.on(Events.ENTER, ids => {
      Alert.alert(`Wake up! you are at ${locName}!!`)
      this.startVibrationFunction()
      
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
        flex: 12,
        flexDirection: 'column',
        justifyContent: 'center',
      }}>

{/* ================ LatLong ========================== */}
        <View style={{
        paddingTop: 40,
     
        flexDirection: 'row',
        justifyContent: 'center',
        }}>
          <View style={{
            padding: 20,
            flex: 1, 
            backgroundColor: 'white',
            flexDirection: 'column',
            justifyContent: 'center'
          }}>
            <Text>Current Location</Text>
            <Text> Latitude: {this.props.cLatitude} </Text>
            <Text> Longitude: {this.props.cLongitude} </Text>
            <Text> {this.props.cError} </Text>
          </View>

          <View style={{
            padding: 20,
            flex: 1, 
            backgroundColor: 'white',
            flexDirection: 'column',
            justifyContent: 'center'
          }}>
            <Text>Destination Location</Text>
            <Text> Latitude: {this.props.cordLatitude} </Text>
            <Text> Longitude: {this.props.cordLongitude} </Text>
            <Text> {this.props.cError} </Text>
          </View>
          <View><Text>{this.state.searchText}</Text></View>
          
          </View>
{/* ================ MAP ========================== */}
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

       {/* ================ SEARCH ========================== */}
       <KeyboardAvoidingView behavior="padding" enabled>

    
            <SearchBar        
                  placeholder="Where are you going?" 
                  lightTheme
                  round={true}
                  inputStyle={styles.searchInput}
                  onClear={() => this.placeSearch('')}         
                  onChangeText={text => this.setSearchText(text)}
                  value={this.state.searchText}
                  autoCorrect={false}             
                />    
              <FlatList 
                  data={this.state.searchResults} 
                  renderItem={({item}) => 
                    <ListItem 
                      title={item.name}
                      onPress={() => this.props.setSelectionLocation(item.location)}
                      
                    />} 
                  />

</KeyboardAvoidingView>

            
    {/* ================ BUTTONS ========================== */}

        <View style={{
          padding: 20,
          flex: 3,
          flexDirection: 'column',
          justifyContent: 'center'
          }}>
            <Button title="Set Route" onPress={this.props.setRoute} />
          <View style={{
            flexDirection: 'row',
            justifyContent: 'center'
          }}>
            <Button title="Drop Boundary" onPress={() => this.dropBoundary(locName)} />
            <Button title="Fake Search" onPress={() => this.placeSearch("charles")} />
          </View>
          <View style={{
            flexDirection: 'row',
            justifyContent: 'center'
          }}>
            <Button title="Start Vibration" onPress={this.startVibrationFunction} />
            <Button title="End Vibration" onPress={this.stopVibrationFunction} />
          </View>

        </View>
      </View>
 
     );
  }
}

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
  },
  flatList: {
    flex: 6
  },
  searchInput: {
    color: "black"
  }
})

AppRegistry.registerComponent('NappPlayground', () => StartNap);

