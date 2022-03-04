import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';



const BlocExperience = ({experience, user, navigation}) => {
  // experience&&console.log(experience);

  
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
  tinyLogo: {
    width: 70,
    height: 70,
    borderRadius: 10,
  },

  box: {
    flexDirection: "row",
    marginTop: 20
  },

  blocText: {
    marginLeft: 10,
    flexDirection: 'column',
    justifyContent: 'space-between'
  },

});
    
export default BlocExperience;