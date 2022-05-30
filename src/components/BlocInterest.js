import React, { useState, useEffect} from 'react';
import { View, Text, Image, ScrollView, TextInput, Title, StyleSheet, TouchableOpacity } from 'react-native';
import { Avatar } from 'react-native-paper';


const BlocExperience = ({ user, interest, navigation, experience}) => {

    return (
      <View>
     
        <TouchableOpacity style={styles.blocExperience} onPress={() => { navigation.navigate('Experience', { id: experience.id }) }}>
          
         
          <View style={styles.blocText}>
            <Text><Text style={{fontWeight: "bold"}}>{experience.title}</Text><Text> | </Text><Text style={{fontStyle: "italic"}}>{experience.location}</Text></Text>
          </View>
  
        </TouchableOpacity>
 
   

         
       </View>
  );
}
  
const styles = StyleSheet.create({
  experiencePicture: {
    width: 72,
    height: 72,
    borderRadius: 10,
  },
  avatar: {
    backgroundColor: "white"
  },
  blocExperience: {
    flex: 1,
    flexDirection: "row",
  },

  blocText: {
    flex: 1,
    width: "100%",
    marginLeft: 10,
    marginRight: 10,
    flexDirection: 'column',
  },

});

    
export default BlocExperience;