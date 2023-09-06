import React, { useState } from 'react';
import { View, Text, TextInput, Button, FlatList, Alert, Image, StyleSheet } from 'react-native';

function App() {
  const [keyword, setKeyword] = useState('');
  const [meals, setMeals] = useState([]);

  const API_URL = `https://www.themealdb.com/api/json/v1/1/filter.php?i=${keyword}`;

  const getMeals = () => {
    fetch(API_URL)
      .then((response) => response.json())
      .then((data) => {
        if (data.meals) {
          setMeals(data.meals);
        } else {
          setMeals([]);
        }
      })
      .catch((error) => {
        Alert.alert('Error', error.message);
      });
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Enter a keyword"
        value={keyword}
        onChangeText={(text) => setKeyword(text)}
      />
      <Button title="Find Meals" onPress={getMeals} />
      <FlatList
        data={meals}
        keyExtractor={(item) => item.idMeal}
        renderItem={({ item }) => (
          <View style={styles.mealContainer}>
            <Image source={{ uri: item.strMealThumb }} style={styles.mealImage} />
            <Text style={styles.mealName}>{item.strMeal}</Text>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  input: {
    fontSize: 18,
    marginBottom: 10,
    marginTop: 20,
    padding: 8,
    borderColor: 'gray',
    borderWidth: 1,
  },
  mealContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 10,
  },
  mealImage: {
    width: 100,
    height: 100,
    marginRight: 10,
  },
  mealName: {
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default App;
