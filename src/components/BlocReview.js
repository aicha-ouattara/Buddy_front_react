import React from 'react';
import { View, Text, Image, ScrollView, TextInput, Title, StyleSheet } from 'react-native';


const BlocExperience = ({review, navigation}) => {

    return (
      <View  style={styles.box}>
       { console.log(review)}
         <Text>id = {review.id}</Text>
         <Text>message = {review.message}</Text>
         <Text>rating = {review.rating}</Text>
         {/* <Text onPress={() => {navigation.navigate('User', {id : user.id})}} >by = {user.login}</Text> */}
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