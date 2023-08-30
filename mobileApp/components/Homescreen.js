import React from 'react';
import { FlatList, Button, StyleSheet, Text, View, TextInput } from 'react-native';

export default function HomeScreen({ navigation }) {
    return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Text>Hello screen</Text>
        <Button
        title="Laskin"
        onPress={() => navigation.navigate('Laskin')} // Navigate to Settings screen
        />
        </View>
        );
        }