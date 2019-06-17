import React from 'react';
import { StyleSheet, Text, View, Button} from 'react-native';
import FetchLocation from './components/FetchLocation';
import UsersMap from './components/UsersMap'
export default class App extends React.Component {
  state = {
    userLocation: null,
    usersPlaces: []
  }
  getUserLocationHandler = () => {
    // retrieves user location and saves in state
    navigator.geolocation.getCurrentPosition(position => {
      console.log(position)
      this.setState({
        userLocation: {
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
          latitudeDelta: 0.0622,
          longitudeDelta: 0.0421,
        }
      })
      // Makes POST request to firebase database and sends user location to db
      fetch('https://striking-decker-244017.firebaseio.com/places.json', {
        method: 'POST',
        body: JSON.stringify({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
        })
      })
      .then(res => console.log(res))
      .catch(err => console.log(err));  
    }, err => console.log(err));
  }

   // Makes GET request from firebase DB and retrieves all user location data
  getUserPlacesHandler = () => {
    fetch('https://striking-decker-244017.firebaseio.com/places.json')
      .then(res => res.json())
      .then(parsedRes => {
        const placesArray = [];
        // for loop that populates placesArray to be passed down as props
        for (const key in parsedRes) {
          placesArray.push({
            latitude: parsedRes[key].latitude,
            longitude: parsedRes[key].longitude,
            id:key
          })
        }
        this.setState({
          usersPlaces: placesArray
        })
      })
      .catch(err => console.log(err));
  }
  render () {
      return (
        <View style={styles.container}>
          <View style={{marginBottom:20}}>
            <Button title="Get User Places" onPress={this.getUserPlacesHandler} />
          </View>
          <FetchLocation onGetLocation={this.getUserLocationHandler} />
          <UsersMap userLocation={this.state.userLocation} usersPlaces={this.state.usersPlaces}/>
        </View>
      );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
