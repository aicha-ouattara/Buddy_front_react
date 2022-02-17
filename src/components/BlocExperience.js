import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';



const BlocExperience = ({experience, user, navigation}) => {
  // experience&&console.log(experience);

  
    return (
      <View  style={styles.box}>
        <Image style={styles.tinyLogo} source={require('../../assets/exemple_ville.jpeg')}/>
        <View style={styles.blocText}>
          <Text onPress={() => {navigation.navigate('Experience', {id : experience.id})}}>id : {experience.id} | {experience.title}</Text>
          <Text onPress={() => {navigation.navigate('User', {id : user.id})}} >Local Buddy : {user.login}</Text>
          <Text >Description : {experience.content}</Text>
        </View>
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