import React, { useState, useEffect} from 'react';
import { View, Text, Image, ScrollView, TextInput, Title, StyleSheet, TouchableOpacity } from 'react-native';

<<<<<<< Updated upstream
const BlocExperience = ({ user, interest, navigation, experience}) => {
=======
const BlocExperience = ({ interest, navigation, experience}) => {
>>>>>>> Stashed changes

    return (
      <View>
      
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

     

     
         <Text onPress={() => {navigation.navigate('Experience', {id:experience.id})}}>{experience.title}</Text>
         <Text onPress={() => {navigation.navigate('User', {id : user.id})}} >{user.login}</Text>
         
       </View>
  );
}
  
    
export default BlocExperience;