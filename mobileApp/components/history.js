
import { FlatList, Button, StyleSheet, Text, View, TextInput } from 'react-native';

export default function History({ route, navigation }){

    const { historyData } = route.params;


    return (
        <View style={styles.container}>
          <Text>History</Text>
          <FlatList
            style={{ maxHeight: 200 }}
            data={historyData}
            renderItem={({ item }) => (
              <View style={styles.itemContainer}>
                <Text style={styles.calculationText}>{item}</Text>
              </View>
            )}
            keyExtractor={(item, index) => index.toString()}
          />
        </View>
      );
    };
    
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