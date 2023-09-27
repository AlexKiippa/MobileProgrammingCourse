import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TextInput, Button, FlatList } from 'react-native';
import React, { useState, useEffect } from 'react';
import { initializeApp } from 'firebase/app';
import { getDatabase, ref, push, onValue, remove } from 'firebase/database';

export default function App() {
  const [product, setProduct] = useState('');
  const [amount, setAmount] = useState('');
  const [items, setItems] = useState([]);
  const [itemIdToDelete, setItemIdToDelete] = useState(null);

  const firebaseConfig = {
    apiKey: "AIzaSyA-Y9IONYfFSFcElU_cAihFVgmUOAltw_E",
    authDomain: "ostoslista-firebase-c2a65.firebaseapp.com",
    databaseURL: "https://ostoslista-firebase-c2a65-default-rtdb.europe-west1.firebasedatabase.app",
    projectId: "ostoslista-firebase-c2a65",
    storageBucket: "ostoslista-firebase-c2a65.appspot.com",
    messagingSenderId: "372232178586",
    appId: "1:372232178586:web:a96a69494902c02580c823",
    measurementId: "G-NGZWG22D1T"
  };

  // Initialize Firebase
  const app = initializeApp(firebaseConfig);
  const database = getDatabase(app);

  const saveItem = () => {
    if (product && amount) {
      const newItemRef = push(ref(database, 'items/'), {
        product: product,
        amount: amount
      });
      setProduct('');
      setAmount('');
      const newItemId = newItemRef.key;
     
    }
  };

  const deleteItem = (itemId) => {
    const itemRef = ref(database, 'items/' + itemId);
    remove(itemRef)
      .then(() => {
        setItemIdToDelete(itemId); 
      })
  
  };

  useEffect(() => {
    const itemsRef = ref(database, 'items/');
    onValue(itemsRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        const itemsArray = Object.entries(data).map(([id, item]) => ({ id, ...item }));
        setItems(itemsArray);
      } else {
        setItems([]);
      }
    });
  }, [itemIdToDelete]);

  return (
    <View style={styles.container}>
      <TextInput
        style={{ marginTop: 200, fontSize: 18, width: 200, borderColor: 'gray', borderWidth: 1 }}
        placeholder="Product"
        value={product}
        onChangeText={setProduct}
      />
      <TextInput
        style={{ marginTop: 30, fontSize: 18, width: 200, borderColor: 'gray', borderWidth: 1 }}
        placeholder="Amount"
        value={amount}
        onChangeText={setAmount}
      />

      <Button title="Save" onPress={saveItem} />

      <Text style={{ marginTop: 30, fontSize: 20 }}>Shopping list</Text>

      <FlatList
        style={{ marginLeft: "5%" }}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.listcontainer}>
            <Text>{item.product}, {item.amount}</Text>
            <Text style={{ color: '#0000ff' }} onPress={() => deleteItem(item.id)}>Delete</Text>
          </View>
        )}
        data={items}
      />
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
  listcontainer: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    alignItems: 'center'
  },
});
