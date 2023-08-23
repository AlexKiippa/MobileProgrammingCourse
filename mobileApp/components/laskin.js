import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import {FlatList, Image, Alert, Button, StyleSheet, Text, View, TextInput } from 'react-native';



export default function Laskin() {


  const [text1, setText1] = useState("");
  const [text2, setText2] = useState("");
  const [data, setData] = useState([]);
  const [summa, setSumma] = useState("");

  

  const buttonPressed1 = () => {
    let luku1 = parseInt(text1);
    let luku2 = parseInt(text2);

    setSumma([luku1+luku2])
    };

    const buttonPressed2 = () => {
      let luku1 = parseInt(text1);
      let luku2 = parseInt(text2);
  
      setSumma([luku1-luku2])
      };
   

  return (
    <View style={styles.container}>

      <Text>Result:{summa}</Text>   
      <TextInput style={{width: 200, borderColor: 'gray', borderWidth: 1}}
      keyboardType='numeric'
onChangeText={text1 => setText1(text1)} value={text1} />

<TextInput style={{width: 200, borderColor: 'gray', borderWidth: 1}}
keyboardType='numeric'
onChangeText={text2 => setText2(text2)} value={text2} />

  <View style={{flexDirection: 'row', justifyContent: 'space-around'}}>
      <Button onPress={buttonPressed1} title="+" />
      <Button onPress={buttonPressed2} title="-" />
    </View>
   
      <StatusBar style="auto" />
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