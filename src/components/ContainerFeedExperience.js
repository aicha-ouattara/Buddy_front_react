import React, {useContext, useState, createRef, useEffect} from 'react';
import BlocExperience from '../components/BlocExperience';
import {
    StyleSheet,
    TextInput,
    View,
    Text,
    ScrollView,
    Image,
    Keyboard,
    TouchableOpacity,
    KeyboardAvoidingView,
    } from 'react-native';
    

    function ContainerFeedExperience ({experiences, navigation}) {
        return (
            <View>
      { experiences.map(experience => 
   
            <BlocExperience navigation={navigation} key={experience.id} experience={experience} user= {experience.user}/>
   
          )} 
          </View>
          ) 
           }

    export default ContainerFeedExperience;