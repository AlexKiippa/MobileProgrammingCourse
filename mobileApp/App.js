
import React, { useState } from 'react';
import {FlatList, Image, Alert, Button, StyleSheet, Text, View, TextInput } from 'react-native';

import Laskin from './components/laskin.js'


export default function App() {



  return (
    <View style={styles.container}>

      <Laskin></Laskin>
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
});