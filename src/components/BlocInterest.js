import React from 'react';
import { View, Text, Image, ScrollView, TextInput, Title, StyleSheet } from 'react-native';


const BlocExperience = ({ interest, navigation, experience, user}) => {

    return (
      <View  style={styles.box}>
      
       {(
         interest &&(
           interest.plan == 1 &&
          interest.accepted == 0 && 
          <Image 
          style={{ width: 25, height: 25 }} source={require('../../assets/refused.png')}  />
           )

       )}

      {(
         interest &&(
          interest.plan == 1 &&
          interest.accepted == 1 && 
          <Image 
          style={{ width: 25, height: 25 }} source={require('../../assets/accepted.png')}  />
         )
       )}

       {(
        interest &&(
          interest.plan == 1 &&
          interest.accepted == null && 
          <Image 
          style={{ width: 25, height: 25 }} source={require('../../assets/attente.png')}  />
         )

      )}

      
     
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