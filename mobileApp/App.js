
import React, { useState } from 'react';
import {FlatList, Image, Alert, Button, StyleSheet, Text, View, TextInput } from 'react-native';

import Laskin from './components/laskin.js'
import GuessNumber from './components/guessNumber.js'
import Ostoslista from './components/ostoslista.js'


export default function App() {



  return (
    <View style={styles.container}>

        <Ostoslista></Ostoslista>
        
    </View>
  );
}

//<Laskin></Laskin>  <GuessNumber></GuessNumber>
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});