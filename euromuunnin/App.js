import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, TextInput, Button, FlatList,ScrollView} from 'react-native';
import {Picker} from '@react-native-picker/picker';


export default function App() {
  const [keyword, setKeyword] = useState('');
  const [documentation, setDocumentation] = useState([]);
  const [selectedCurrency, setSelectedCurrency] = useState(''); 
  const [amount, setAmount] = useState('1'); 



  const getData = () => {
    fetch('https://api.layer.com/exvhangerates_data/lastest',
    { headers: { 'apikey' : 'sqVWUfaMifRD7MwyvAAoVh5etNDfUbOZ'}})
    .then(response => response.json())
    .then(data => setRates(data.rates))
    .catch(err => RefreshControlBase.error(err))
  }

  const handleCurrencyChange = (currency) => {
    setSelectedCurrency(currency);
  };

  const handleAmountChange = (text) => {
    setAmount(text);
  };

  useEffect(() => {
    getData();
  }, []);
  

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <FlatList
        data={documentation}
        keyExtractor={(item) => item.id.toString()} // Replace 'id' with your actual documentation item identifier
        renderItem={({ item }) => (
          <View>
            {/* Render each documentation item */}
            <Text>{item.title}</Text>
            <Text>{item.description}</Text>
            {/* Add more fields as needed */}
          </View>
        )}
      />

      <View style={styles.inputContainer}>
   
        
        <TextInput
          style={styles.input}
          placeholder="Enter amount"
          value={amount}
          onChangeText={(text) => handleAmountChange(text)}
          keyboardType="numeric" // Allows input of numbers only
        />
      <View style={styles.row}>
      <Picker
          selectedValue={selectedCurrency}
          style={styles.picker}
          onValueChange={(value) => handleCurrencyChange(value)}
        >
          {
          <Picker.Item key={item} label={item} value={item} />
           }
        </Picker>

      <Button title="Convert" onPress={fetchCurrencyData} />
      </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 300,
  },
  inputContainer: {
    alignItems: 'center',
    marginBottom: 20,
  },
  picker: {
    height: 50,
    width: 200,
  },
  input: {
    fontSize: 18,
    padding: 8,
    borderColor: 'gray',
    borderWidth: 1,
  },
});
