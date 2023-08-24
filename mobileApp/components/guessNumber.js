import React, { useState } from 'react';
import {Alert, Button, StyleSheet, Text, View, TextInput } from 'react-native';

export default function guessNumber(props){


    const [text, setText] = useState();

    const[vastaus, setVastaus] = useState("Guess a number between 1-100");

    const [count, setCount] = useState(0);
    const [randomNumber, setRandomNumber] = useState(Math.floor(Math.random() * 100)+1);


        
    

   



    const buttonPressed = () => {
        const numero = parseInt(text, setText);
            setCount(count + 1);
           
            if (numero === randomNumber ) {
                Alert.alert("You guessed the number in " + count + " guesses");
                setCount(0);
            }else if (numero > randomNumber) {
                setVastaus("Your guess " + numero + " is too high" )       
         }   else if (numero < randomNumber) {
                setVastaus("Your guess " + numero + " is too low" )
         }
    };



    return(
        <View style={styles.container}>

            <Text>{vastaus}</Text>

            <TextInput style={{ width: 50, borderColor: 'gray', borderWidth: 1}}
      keyboardType='numeric'
onChangeText={text => setText(text)} value={text} />

<Button onPress={buttonPressed} title="Make a Guess" />

        </View>
    )
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
    },
  });