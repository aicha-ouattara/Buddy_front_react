import React from 'react';
import { View, Text, Image, ScrollView, TextInput, Title, StyleSheet } from 'react-native';


const BlocExperience = ({ interest, navigation, experience, user}) => {

    return (
      <View  style={styles.box}>
      
       {(
         interest &&(
          interest.accepted == 0 && 
             <Text>Accepté</Text>
           )

       )}

      {(
         interest &&(
          interest.accepted == 1 && 
          <Text>Refusé</Text>
         )
       )}

       {(
        interest &&(
          interest.accepted == null && 
             <Text>En attente</Text>
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