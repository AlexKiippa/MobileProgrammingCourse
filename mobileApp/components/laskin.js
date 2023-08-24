import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { FlatList, Button, StyleSheet, Text, View, TextInput } from 'react-native';

export default function Laskin() {
  const [text1, setText1] = useState('');
  const [text2, setText2] = useState('');
  const [data, setData] = useState([]);
  const [vastaus, setVastaus] = useState();


  const buttonPressed1 = () => {
    let luku1 = parseInt(text1);
    let luku2 = parseInt(text2);
    let summa = luku1 + luku2;
    setVastaus(summa)

    setData([
      ...data,
      { key: luku1, type: 'number' },
      { key: ' + ', type: 'operator' },
      { key: luku2, type: 'number' },
      { key: ' = ', type: 'operator' },
      { key: summa.toString(), type: 'result' },
      { key: '', type: 'empty' }, 
    ]);
  };

  const buttonPressed2 = () => {
    let luku1 = parseInt(text1);
    let luku2 = parseInt(text2);
    let summa = luku1 - luku2;
    setVastaus(summa)
    setData([
      ...data,
      { key: luku1, type: 'number' },
      { key: ' - ', type: 'operator' },
      { key: luku2, type: 'number' },
      { key: ' = ', type: 'operator' },
      { key: summa.toString(), type: 'result' },
      { key: '', type: 'empty' }, 
    ]);
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
      </View>
      <Text>History</Text>
      <FlatList
  style={{ maxHeight: 200 }}
  data={data}
  horizontal
  renderItem={({ item }) => (
    <View style={styles.itemContainer}>
      <Text
        style={[
          item.type === 'result' ? styles.resultText : styles.normalText,
          item.type === 'empty' && styles.emptyText, 
        ]}
      >
        {item.key}
      </Text>
    </View>
  )}
  keyExtractor={(item, index) => index.toString()}
/>
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
