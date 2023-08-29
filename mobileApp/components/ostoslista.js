import React, { useState } from 'react';
import { FlatList, Button, StyleSheet, Text, View, TextInput } from 'react-native';

export default function Ostoslista() {
    const [inputValue, setInputValue] = useState('');
    const [listItems, setListItems] = useState([]);
  
    const handleAddButtonClick = () => {
      if (inputValue.trim() !== '') {
        setListItems([...listItems, inputValue]);
        setInputValue('');
      }
    };
  
    const handleClearButtonClick = () => {
      setListItems([]);
    };
  
    return (
      <View style={styles.container}>
        <Text style={styles.header}>Ostoslista App</Text>
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            placeholder="Enter item"
            value={inputValue}
            onChangeText={setInputValue}
          />
 </View>
        <View>
          <Button title="Add" onPress={handleAddButtonClick} />
          <Button title="Clear" onPress={handleClearButtonClick} />
          </View>

          <Text style={styles.lista} >Shopping List</Text>
        <FlatList
          style={styles.list}
          data={listItems}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item }) => <Text style={styles.listItem}>{item}</Text>}
        />
      </View>
    );
  }

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      marginTop: 50,
    },
    header: {
      fontSize: 24,
      marginBottom: 20,
    },
    lista : {
    color: 'blue',
    fontWeight: 'bold',
    fontSize: 22
    },
    inputContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      marginBottom: 10,
    },
    input: {
      flex: 1,
      padding: 5,
      marginRight: 10,
      borderColor: 'black',
      borderWidth: 1,
    },
    list: {
      marginTop: 20,
    },
    listItem: {
      fontSize: 16,
      marginVertical: 5,
    },
  });