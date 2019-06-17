import React from 'react';
import { View , StyleSheet} from 'react-native'; 
import MapView from 'react-native-maps';
const usersMap = props => {
    let userLocationMarker = null; 
    // Conditionally rends the userlocation marker. Set to null as default and populates on button press
    if (props.userLocation) {
        userLocationMarker = <MapView.Marker coordinate={props.userLocation} />;
    }
    // maps all userPlaces objects and creates marker out of all from db
    const usersMarkers = props.usersPlaces.map(userPlace => (
    <MapView.Marker coordinate={userPlace} key={userPlace.id} />
    ));
    return (
        <View style={styles.mapContainer}>
            <MapView 
            initialRegion={{
                latitude: 37.78825,
                longitude: -122.4324,
                latitudeDelta: 0.0622,
                longitudeDelta: 0.0421,
            }}
            region={props.userLocation}
            style={styles.map}>
                {userLocationMarker}
                {usersMarkers}
            </MapView>
        </View>
    );
};

const styles = StyleSheet.create({
    mapContainer: {
        width: '100%',
        height: 200,
        marginTop: 20
    },
    map: {
        width: '100%',
        height: '100%'
    }
})

export default usersMap