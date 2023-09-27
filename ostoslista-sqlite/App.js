import { StatusBar } from 'expo-status-bar';
import { FlatList, Button, StyleSheet, Text, View, TextInput } from 'react-native';
import * as SQLite from 'expo-sqlite';
import React, { useState, useEffect } from 'react';



export default function App() {

const [product, setProduct] = useState('');
const [amount, setAmount] = useState('');

const [listItems, setListItems] = useState([]);

const db = SQLite.openDatabase('listItemsdb.db');


useEffect(() => {
  db.transaction(tx => {
  tx.executeSql('create table if not exists listItems (id integer primary key not null, product text, amount text);');
  }, () => console.error("Error when creating DB"), updateList);
  }, []);
  


  const saveItem = () => {
    db.transaction(tx => {
    tx.executeSql('insert into listItems (product, amount) values (?, ?);',
    [product, amount]);
    }, null, updateList)
    }
    
    const updateList = () => {
      db.transaction(tx => {
      tx.executeSql('select * from listItems;', [], (_, { rows }) =>
      setListItems(rows._array)
      );
      }, null, null);
      }
       
      const deleteItem = (id) => {
        db.transaction(
          tx => {
            tx.executeSql(`delete from listItems where id = ?;`, [id]);
          }, null, updateList
        )    
      }
           


  return (
    <View style={styles.container}>
     
      <TextInput
            style={{marginTop: 200, fontSize: 18, width: 200, borderColor: 'gray', borderWidth: 1}}
            placeholder="Product"
            value={product}
            onChangeText={setProduct}
          />
      <TextInput
            style={{marginTop: 30, fontSize: 18, width: 200, borderColor: 'gray', borderWidth: 1}}
            placeholder="Amount"
            value={amount}
            onChangeText={setAmount}
          />
          
       
          <Button title="Save" onPress={saveItem} />
         

          <Text style={{marginTop: 30, fontSize: 20}}>Shopping list</Text>

          <FlatList
style={{marginLeft : "5%"}}
keyExtractor={item => item.id.toString()}
renderItem={({item}) =>
<View style={styles.listcontainer}>
<Text>{item.product},{item.amount} </Text>
<Text style={{color: '#0000ff'}} onPress={() => deleteItem(item.id)}>Bought</Text>
</View>}
data={listItems}
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
