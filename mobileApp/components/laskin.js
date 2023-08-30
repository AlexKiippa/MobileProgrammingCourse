import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { FlatList, Button, StyleSheet, Text, View, TextInput } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';




export default function Laskin({ navigation }) {
  const [text1, setText1] = useState('');
  const [text2, setText2] = useState('');
  const [data, setData] = useState([]);
  const [vastaus, setVastaus] = useState();


  const buttonPressed1 = () => {
    let luku1 = parseInt(text1);
    let luku2 = parseInt(text2);
    let summa = luku1 + luku2;
    setVastaus(summa);
  
    const calculationString = `${luku1} + ${luku2} = ${summa}`;
    setData([...data, calculationString, '']);
  };
  
  const buttonPressed2 = () => {
    let luku1 = parseInt(text1);
    let luku2 = parseInt(text2);
    let summa = luku1 - luku2;
    setVastaus(summa);
  
    const calculationString = `${luku1} - ${luku2} = ${summa}`;
    setData([...data, calculationString, '']);
  };

  return (
    <View style={styles.container}>
      <Text>Result:  {vastaus} </Text>
      <TextInput
        style={{ width: 200, borderColor: 'gray', borderWidth: 1 }}
        keyboardType='numeric'
        onChangeText={(text1) => setText1(text1)}
        value={text1}
      />
      <TextInput
        style={{ width: 200, borderColor: 'gray', borderWidth: 1 }}
        keyboardType='numeric'
        onChangeText={(text2) => setText2(text2)}
        value={text2}
      />
      <View style={{ flexDirection: 'row', justifyContent: 'space-around' }}>
        <Button onPress={buttonPressed1} title='+' />
        <Button onPress={buttonPressed2} title='-' />
        <Button title="History" onPress={() => navigation.navigate('History', { historyData: data } )} />
      </View>
      
    
      <StatusBar style='auto' />
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
  normalText: {
    fontSize: 18,
  },
  emptyText: {
    width: 30,
  },
  resultText: {
    fontSize: 18,
    fontWeight: 'bold',
  },
});
