import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TextInput, Button } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import axios from 'axios';
import * as Location from 'expo-location'; 

export default function App() {
  const [address, setAddress] = useState('');
  const [coordinates, setCoordinates] = useState(null);
  const [currentLocation, setCurrentLocation] = useState(null); 

  MAPQUEST_API_KEY = 'xwqLQXu92yoAYZEwBfwua5FfUrqUDv8P';

  useEffect(() => {
    // Haetaan nykyinen sijainti kun sovellus avataan
    const getCurrentLocation = async () => {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status === 'granted') {
        const locationData = await Location.getCurrentPositionAsync({});
        setCurrentLocation(locationData.coords);
      }
    };

    getCurrentLocation();
  }, []);

  const handleShowButtonPress = async () => {
    try {
      const response = await axios.get(
        `https://www.mapquestapi.com/geocoding/v1/address?key=${MAPQUEST_API_KEY}&location=${address}`
      );

      const { lat, lng } = response.data.results[0].locations[0].latLng;
      setCoordinates({ latitude: lat, longitude: lng });
    } catch (error) {
      console.error('Virhe osoitetta haettaessa:', error);
    }
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Syötä osoite"
        value={address}
        onChangeText={(text) => setAddress(text)}
      />
      <Button title="Show" onPress={handleShowButtonPress} />
      {(coordinates || currentLocation) && (
        <MapView
          style={styles.map}
          region={
            coordinates
              ? { ...coordinates, latitudeDelta: 0.0322, longitudeDelta: 0.0221 }
              : {
                  // Jos osoitetta ei ole haettu, käytetään nykyistä sijaintia
                  ...currentLocation,
                  latitudeDelta: 0.0322,
                  longitudeDelta: 0.0221,
                }
          }>
          {coordinates && <Marker coordinate={coordinates} />}
          {currentLocation && <Marker coordinate={currentLocation} pinColor="blue" />}
        </MapView>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  input: {
    width: '80%',
    borderColor: 'gray',
    borderWidth: 1,
    padding: 10,
    marginBottom: 10,
  },
  map: {
    width: '100%',
    height: '70%',
  },
});
