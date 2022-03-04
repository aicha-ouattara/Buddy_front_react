import React from 'react';
import { View, Text, Image, ScrollView, TextInput, Title, StyleSheet } from 'react-native';


const BlocInterest = ({interest, navigation}) => {

    return (
      <View  style={styles.box}>
       { console.log(interest)}
         <Text>id = {interest.id}</Text>
         <Text>message = {interest.message}</Text>
         <Text>date = {interest.date}</Text>
         {<Text onPress={() => {navigation.navigate('User', {id : user.id})}} >by = {user.login}</Text> }
       </View>
  );
}
  
const styles = StyleSheet.create({

 

  box: {

   borderColor: "black",

    borderWidth: 1,

  },

});
    
export default BlocInterest;