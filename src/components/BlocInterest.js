import React from 'react';
import { View, Text, Image, ScrollView, TextInput, Title, StyleSheet } from 'react-native';


const BlocExperience = ({interest, navigation, experience, user}) => {

    return (
      <View  style={styles.box}>
       { console.log(interest)}
        
         <Text onPress={() => {navigation.navigate('Experience', {id:experience.id})}}>title = {experience.title}</Text>
         <Text onPress={() => {navigation.navigate('User', {id : user.id})}} >by = {user.login}</Text>
       </View>
  );
}
  
const styles = StyleSheet.create({

 

  box: {

   borderColor: "black",

    borderWidth: 1,

  },

});
    
export default BlocExperience;