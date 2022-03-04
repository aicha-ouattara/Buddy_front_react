import React, {useState} from 'react';
import { View, Text, Image, SafeAreaView, ScrollView, TextInput, Title, StyleSheet } from 'react-native';



const BlocExperience = ({experience, user, navigation}) => {
  experience&&console.log(experience);

  
    return (
      <View style={styles.containerBlocExperience}>
        <Image source={require('../../assets/exemple_ville.jpeg')}/>
         <Text>id = {experience.id}</Text>
         <Text onPress={() => {navigation.navigate('Experience', {id:experience.id})}}>title = {experience.title}</Text>
         <Text onPress={() => {navigation.navigate('User', {id : user.id})}} >by = {user.login}</Text>
         
       </View>
      
  );
}
  

const styles = StyleSheet.create({

  containerBlocExperience:{
    flex: 0.6,
    flexDirection: "column",
    justifyContent: 'space-between',
  },

  


});

    
export default BlocExperience;