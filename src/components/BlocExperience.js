import React, {useState} from 'react';
import { View, Text, Image, SafeAreaView, ScrollView, TextInput, Title, StyleSheet } from 'react-native';



const BlocExperience = ({experience, user, navigation}) => {
  experience&&console.log(experience);

  
    return (
      <View  style={styles.box}>
        <Image style={styles.tinyLogo} source={require('../../assets/exemple_ville.jpeg')}/>
         <Text>id = {experience.id}</Text>
         <Text onPress={() => {navigation.navigate('Experience', {id:experience.id})}}>title = {experience.title}</Text>
         <Text onPress={() => {navigation.navigate('User', {id : user.id})}} >by = {user.login}</Text>
       </View>
  );
}
  

  tinyLogo: {
    width: 50,
    height: 50,
  },

  box: {

   borderColor: "black",

    borderWidth: 1,

  },

});
    
export default BlocExperience;