import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, TextInput, Button, FlatList,ScrollView} from 'react-native';
import {Picker} from '@react-native-picker/picker';


export default function App() {
  const [keyword, setKeyword] = useState('');
  const [documentation, setDocumentation] = useState([]);
  const [selectedCurrency, setSelectedCurrency] = useState('USD'); // Default currency
  const [amount, setAmount] = useState('1'); // Default amount

  const fetchCurrencyData = () => {
    fetch(`https://api.apilayer.com/exchangerates_data/convert?to=${selectedCurrency}&from=from&amount=${amount}`, {
      method: 'GET',
      headers: {
        "apikey": "sqVWUfaMifRD7MwyvAAoVh5etNDfUbOZ",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        // Assuming the API response is an array of documentation items
        setDocumentation(data);
      })
      .catch((error) => {
        console.error('Error fetching documentation:', error);
      });
  };

  const handleCurrencyChange = (currency) => {
    setSelectedCurrency(currency);
  };

  const handleAmountChange = (text) => {
    setAmount(text);
  };

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
          onValueChange={(itemValue) => handleCurrencyChange(itemValue)}
        >
          <Picker.Item label="USD" value="USD" />
          <Picker.Item label="EUR" value="EUR" />
          {/* Add more currency options as needed */}
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
