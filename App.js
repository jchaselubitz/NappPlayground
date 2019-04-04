import React, {Component} from 'react';
import Keys from './src/APIKey'
import MapView from 'react-native-maps'
import StartNap from './src/components/StartNap'
import * as Polyline from '@mapbox/polyline'
import { AppRegistry, FlatList, StyleSheet, SectionList, Text, View } from 'react-native';



export default class App extends Component {

  state = { 
    longitude: null,
    latitude: null,
    error: null,
    coords: [],
    x: 'true',
    cordLatitude: null,
    cordLongitude: null,
    destinationName: undefined,
    concatStart: undefined,
    concatDestination: undefined
   }

  setSelectionLocation = (location) => {
    this.setState({ 
      cordLatitude: location.latitude,
      cordLongitude: location.longitude
     });
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
        // this.mergeLot()
      }, 
      (error) => this.setState({ error: error.message }),
      { enableHighAccuracy: false, timeout: 200000, maximumAge: 1000 },
    )
  }

  setRoute = () => {
    if (this.state.latitude != null && this.state.longitude!=null)
     {
       let concatStart = this.state.latitude +","+this.state.longitude
       let concatDestination = this.state.cordLatitude +","+this.state.cordLongitude
       this.setState({
         concatStart,
         concatDestination
       }, () => {
         this.getDirections(concatStart, concatDestination);
       });
     }
  }


  async getDirections(tripOrigin, tripDestination) {
    try {

        let resp = await fetch(`https://maps.googleapis.com/maps/api/directions/json?origin=${tripOrigin}&destination=${tripDestination}&key=${Keys.GoogleKey}`)
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
        cordLongitude={this.state.cordLongitude}
        setSelectionLocation={this.setSelectionLocation}
        setRoute={this.setRoute}/>
     );
  }
}



AppRegistry.registerComponent('NappPlayground', () => App);

   