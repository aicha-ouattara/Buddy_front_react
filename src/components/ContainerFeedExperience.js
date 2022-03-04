import React, {useContext, useState, createRef, useEffect} from 'react';
import BlocExperience from '../components/BlocExperience';
import PinkLine from './PinkLine';
import {
    StyleSheet,
    View, Text
    } from 'react-native';
    

    function ContainerFeedExperience ({experiences, navigation}) {
        return (
            <View style={styles.box}>
            <PinkLine/>
        {experiences.length > 0 ? experiences.map(experience => 
            <BlocExperience navigation={navigation} key={experience.id} experience={experience} user= {experience.user}/>
        ) : 
        <Text>Il n'y a rien ici.</Text>
        } 
          </View>
          ) 
    }


    const styles = StyleSheet.create({
        box: {
            padding: 10
          },

        line: {
         height: 10,
         width: 100,
         backgroundColor: '#fde2e1',
          marginTop: 10
        },
      
      });

    export default ContainerFeedExperience;