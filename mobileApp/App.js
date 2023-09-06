
import React, { useState } from 'react';
import {FlatList, Image, Alert, Button, StyleSheet, Text, View, TextInput } from 'react-native';

import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';



import Laskin from './components/laskin.js'
import GuessNumber from './components/guessNumber.js'
import Ostoslista from './components/ostoslista.js'
import HomeScreen from './components/Homescreen.js';
import History from './components/history.js';


const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();


export default function App() {



  return (
    <View style={styles.container}>
<NavigationContainer>
<Stack.Navigator>
  <Stack.Screen name="Laskin" component={Laskin} />
  <Stack.Screen name="History" component={History}/>
</Stack.Navigator>
</NavigationContainer>
    </View>
 
  );
}

//<Laskin></Laskin>  <GuessNumber></GuessNumber>  <Ostoslista></Ostoslista>
const styles = StyleSheet.create({
  container: {
    flex: 1,
   
  },
});