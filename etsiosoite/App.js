import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, Button } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import axios from 'axios';

export default function App() {
  const [address, setAddress] = useState('');
  const [coordinates, setCoordinates] = useState(null);
  MAPQUEST_API_KEY = 'xwqLQXu92yoAYZEwBfwua5FfUrqUDv8P';

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
      {coordinates && (
        <MapView style={styles.map} region={{ ...coordinates, latitudeDelta: 0.0322, longitudeDelta: 0.0221 }}>
          <Marker coordinate={coordinates} />
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
