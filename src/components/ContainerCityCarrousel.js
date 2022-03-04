import React from 'react';
import { SafeAreaView, TouchableOpacity, View, FlatList, StyleSheet, Text, ImageBackground } from 'react-native';



function ContainerCityCarrousel({ experiences, navigation }) {

  function groupBy(objectArray, property) {
    return Object.entries(objectArray.reduce(function (acc, obj) {
      let key = obj[property]
      if (!acc[key]) {
        acc[key] = []
      }
      acc[key].push(obj)
      return acc
    }, {}))
  }


  const locationsTemporary = groupBy(experiences, 'location')
  const locations = locationsTemporary.sort(function (a, b) {
    return b[1].length - a[1].length;
  });

  const renderItem = ({ item }) => (
    <TouchableOpacity style={styles.item} onPress={() => {navigation.navigate('Search',  {screen: 'Protected',
    location: item[0]})}}>
      <ImageBackground style={styles.image} imageStyle={{ borderRadius: 20}} source={require('../../assets/exemple_ville.jpeg')} resizeMode="cover" >
      <View style={styles.blocText}>
        <View style={styles.text}>
        <Text style={styles.title}>{item[0]}</Text>
        <Text>{item[1].length} expérience.s</Text>
        </View>
      </View>
      </ImageBackground>
    </TouchableOpacity>
  );


  return (

    <SafeAreaView style={styles.container}>
      <FlatList
        horizontal={true}
        data={locations}
        renderItem={renderItem}
        keyExtractor={item => item[0]}
      />
    </SafeAreaView>)

}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 10,
    marginBottom: 10,
  },
  item: {
    borderRadius: 50,
    width: 150,
    height: 150,
    marginVertical: 8,
    marginHorizontal: 16,
  },
  blocText: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    flex: 1,
  },
  title: {
    fontSize: 20,
  },
  text: {
    backgroundColor: '#fde2e1',
    padding: 10,
    textAlign: 'center'
  }
});

export default ContainerCityCarrousel;