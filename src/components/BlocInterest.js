import React, {useState} from 'react';
import { View, Text, Image, SafeAreaView, ScrollView, TextInput, Title, StyleSheet } from 'react-native';



const BlocInterest = ({interest, experience, user, navigation}) => {
    interest&&console.log(interest);

  
    return (
      <View style={styles.containerBlocExperience}>
        <Image source={require('../../assets/exemple_ville.jpeg')}/>
         <Text>id = {interest.id}</Text>
         <Text onPress={() => {navigation.navigate('Interest', {id:interest.id})}}>title = {interest.message}</Text>
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