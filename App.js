import React, {Component} from 'react';
import MapView from 'react-native-maps'
import StartNap from './src/components/StartNap'
import { AppRegistry, FlatList, StyleSheet, SectionList, Text, View } from 'react-native';

export default class App extends Component {

  state = { 
    longitude: null,
    latitude: null,
    error: null
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
      }, 
      (error) => this.setState({ error: error.message }),
      { enableHighAccuracy: false, timeout: 200000, maximumAge: 1000 },
    )
  }


  render() { 
    return ( 
      <StartNap cLongitude={this.state.longitude} cLatitude={this.state.latitude} cError={this.state.error}/>
     );
  }
}



// const styles= StyleSheet.create({
//   container: {
//     flex: 1,
//     paddingTop: 22
//   },
//   Header: {
//     paddingTop: 2,
//     paddingLeft: 10,
//     paddingRight: 10,
//     paddingBottom: 2,
//     fontSize: 16,
//     fontWeight: 'bold',
//   },
//   button: {
//     padding: 10,
//     fontSize: 18,
//     height: 44,
//   },
// })
 

AppRegistry.registerComponent('NappPlayground', () => App);

     /* <View style={{flex: 1,
        backgroundColor: 'red',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'stretch', }}/>
     
      <View style={{ flex: 4,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'stretch',}} > 
    <Text style={styles.bigBlue}>Hello, world!</Text>
        
        </View> */



// const styles = StyleSheet.create({
//   bigBlue: {
//     color: 'blue',
//     fontWeight: 'bold',
//     fontSize: 30,
//   }
// })

// export default class Blink extends Component {
//   constructor(props) {
//     super(props)
//     this.state = { text: ''}
//   }

//   render() { 
//     return ( 
//       <View style={styles.container}>
//         <View style={styles.buttonContainer}>
//           <TextInput 
//             style= {{height:40}}
//             placeholder="Type your text here"
//             onChangeText={(text) => this.setState({text})}
//           /> 
//           <Text style={{padding: 18, fontSize: 42}}>
//             {this.state.text.split(' ').map((word) => 
//               word && '🙂').join(' ')}
//           </Text>
//           <Button
//             onPress={() => {
//               Alert.alert('You tapped the button!');
//             }}
//             title="Press Me"
//           />
//           <Button
//             onPress={this._onPressButton} 
//             title="Press Me"
//             color="#841548" />
//           </View>
//       </View>
     
//      );
//   }
// }
 