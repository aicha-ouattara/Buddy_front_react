import React from 'react';
import { SafeAreaView, FlatList, StyleSheet } from 'react-native';
import BlocExperience from './BlocExperience'

function ContainerFeedExperience({ experiences, navigation}) {

  const renderItem = ({ item }) => (
      <BlocExperience navigation={navigation} key={item.id} 
      experience={item} user={item.user} 
      hasActions={true} />
  );

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={experiences}
        renderItem={renderItem}
        keyExtractor={(item, index) => {
          return item.id;
        }}
      />
    </SafeAreaView>)

}

const styles = StyleSheet.create({
  container: {
    marginTop: 10,
    marginBottom: 10,
  },

});

export default ContainerFeedExperience;
