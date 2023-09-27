import React, {useState} from 'react';
import { View, StyleSheet, Button, TextInput } from 'react-native';
import * as Speech from 'expo-speech';

export default function App() {

  const [sana, setSana] = useState('')

  const speak = () => {
    
    Speech.speak(sana);
  };

  return (
    <View style={styles.container}>
      <TextInput style={{marginTop: 10, fontSize: 18, width: 200, borderColor: 'gray', borderWidth: 1}}
            placeholder=""
            value={sana}
            onChangeText={setSana}
          />
      <Button title="Press to hear text" onPress={speak} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  contactItem: {
    marginBottom: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
  },
});