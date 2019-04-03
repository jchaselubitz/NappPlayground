import React, { Component } from 'react';
import MapView from 'react-native-maps'
import AppStyles from '../AppStyles'


let selectedMapType = "standard"


class MapClass extends Component {

  state = {  }
  render() { 
    return ( 
 

      <MapView 
        style={AppStyles.styles.map}
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
      
     );
  }
}
 
export default MapClass;