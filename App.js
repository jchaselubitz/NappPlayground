import React, {Component} from 'react';
import MapView from 'react-native-maps'
import StartNap from './src/components/StartNap'
import { AppRegistry, FlatList, StyleSheet, SectionList, Text, View } from 'react-native';

const DirectionsAPIKey =  "AIzaSyBc5h8qGXJ39QaQL0pGNtFXCo57gwGZf9M"

export default class App extends Component {

  state = { 
    longitude: null,
    latitude: null,
    error: null,
    coords: [],
    x: 'false',
    cordLatitude:5.52,
    cordLongitude:-0.08,
   }

   
  
  componentDidMount () {
    navigator.geolocation.requestAuthorization()
    navigator.geolocation.getCurrentPosition(
      (position) => {
        console.log(position)
        this.setState({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
          error: null
        })
        this.mergeLot()
      }, 
      (error) => this.setState({ error: error.message }),
      { enableHighAccuracy: false, timeout: 200000, maximumAge: 1000 },
    )
  }

  mergeLot = () => {
    if (this.state.latitude != null && this.state.longitude!=null)
     {
       let concatLot = this.state.latitude +","+this.state.longitude
       this.setState({
         concat: concatLot
       }, () => {
         this.getDirections(concatLot, "-6.270565,106.759550");
       });
     }
  }


  async getDirections(tripOrigin, tripDestination) {
    try {
        let resp = await fetch(`https://maps.googleapis.com/maps/api/directions/json?origin=${tripOrigin}&destination=${tripDestination}&key=${DirectionsAPIKey}`)
        let respJson = await resp.json();
        let points = Polyline.decode(respJson.routes[0].overview_polyline.points);
        let coords = points.map((point, index) => {
            return  {
                latitude : point[0],
                longitude : point[1]
            }
        })
        this.setState({coords: coords})
        return coords
    } catch(error) {
        alert(error)
        return error
    }
  }

  render() { 
    return ( 
      <StartNap 
        cLatitude={this.state.latitude}
        cLongitude={this.state.longitude}
        cError={this.state.error}
        coords={this.state.coords}
        x={this.state.x}
        cordLatitude={this.state.cordLatitude}
        cordLongitude={this.state.cordLongitude} />
     );
  }
}



AppRegistry.registerComponent('NappPlayground', () => App);

   