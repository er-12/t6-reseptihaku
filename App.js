import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { Alert, StyleSheet, Text, View, Button, Image, FlatList, TextInput } from 'react-native';

export default function App() {

  const [keyword, setKeyword] = useState('');
  const [repositories, setRepositories] = useState([]);

  const getRepositories = () => {
    fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${keyword}`)
    .then(response => response.json())
    .then(responseJson => setRepositories(responseJson.meals))
    .catch(error => {
      Alert.alert('Error', error);
    });
  }

  const listSeparator = () => {
    return (
      <View
        style={{
          height: 1,
          backgroundColor: '#CED0CE',
        }}
      />
    );
  }

  return (
    <View style={styles.container}>
      <StatusBar hidden={false} />
      <FlatList 
        contentContainerStyle={styles.list}
        data={repositories}
        ItemSeparatorComponent={listSeparator}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({item}) =>
          <View>
            <Text>{item.strMeal}</Text>
            <Image style={{width: 50, height: 50}} source={{uri:`${item.strMealThumb}`}}/>
          </View>}  
      />
      <TextInput 
        style= {styles.input}
        placeholder='Keyword'
        onChangeText={text => setKeyword(text)}
        value= {keyword} //
        />
      <Button title='Find' onPress={getRepositories}/>  
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'center',
  },
  input: {
    marginTop: 15,
    fontSize: 16,
    width: 100,
    borderColor: 'grey',
    borderWidth: 1,
    height: 25,
    padding: 2,
    alignSelf: 'center'
  },
  list: {
    alignItems: 'left',
    marginTop: 25,
    marginLeft: 15
  }
});
