import React, { useState, useEffect } from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, Modal, Pressable } from 'react-native';
import { Avatar } from 'react-native-paper';
import { API_URL } from '@env';
import Bucket from './Bucket';
import ModalMessage from './ModalMessage';
import { genericFetch } from '../api/fetchApi';
import { genericFetchWithToken } from '../api/fetchApiWithToken';
import { genericFetchWithTokenBody } from '../api/fetchApiWithTokenBody';

const BlocExperience = ({ experience, user, userId = 0, navigation, hasActions = false }) => {

  const [token, setToken] = useState("");
  const [liked, setLiked] = useState(false);
  const [interestId, setInterestId] = useState(0)
  const [modalVisible, setModalVisible] = useState(false);
  /*récupère token automatiquement */
  const body = JSON.stringify({
    "login": "mioumiou",
    "password": "mioumiou"
  })
  useEffect(() => {
    genericFetch(`${API_URL}/login`, 'POST', body)
      .then(json => json.json())
      .then(data => setToken(data.token))
      .catch(error => console.error(error))

    experience?.interests && experience.interests.map(function (interest) { //set interest id and liked if it exists
      if (interest.user == `/api/users/${userId}`) {
        setLiked(true)
        setInterestId(interest.id)
      } else {console.log(interest.user, userId)}
    })
  }, [])


  const handleLike = (experience) => {
    if (liked === false) {
      if (experience.user.id != userId) { //if not your own experience
        const bodyInterest = JSON.stringify({
          "plan": false,
          "experience": `api/experiences/${experience.id}`
        })
        genericFetchWithTokenBody(`${API_URL}/interests`, 'POST', token, bodyInterest)
          .then(json => json.json())
          .then(data => {setInterestId(data.id), console.log(`liked ${experience.id} - interest ${data.id} created - by user ${userId}`)})
          .catch(error => console.error(error))
        
        setLiked(true)
      } else {
        console.log('Cannot like your own experiences')
        setModalVisible(true)
        setTimeout(() => {
          setModalVisible(false)
        }, 4000)
      }


    } else {
      genericFetchWithToken(`${API_URL}/interests/${interestId}`, 'DELETE', token)
      console.log(`unliked ${experience.id} - interest ${interestId} deleted - by user ${userId}`)
      setLiked(false)
    }
  }


  return (

    <View style={styles.box}>

      <TouchableOpacity style={styles.blocExperience} onPress={() => { navigation.navigate('Experience', { id: experience.id }) }}>
        {/* <Image style={styles.experiencePicture} source={require(`../../assets/${experience.image}`)} /> */}
        <View style={styles.blocText}>
          <Text><Text style={{fontWeight: "bold"}}>{experience.title}</Text><Text> | </Text><Text style={{fontStyle: "italic"}}>{experience.location}</Text></Text>
          <Text numberOfLines={3} >{experience.content}</Text>
        </View>
      </TouchableOpacity>

      {/* Actions line display only with props hasActions */}
      {hasActions &&
        <View style={styles.blocActions}>
          <TouchableOpacity onPress={() => { navigation.navigate('User', { id: user.id }) }}>
            <Avatar.Image style={styles.avatar} size={24} color="white" source={require('../../assets/profil.png')} />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => { handleLike(experience) }} >
            <Bucket liked={liked} />
          </TouchableOpacity>
        </View>
      }
    {modalVisible && 
      <ModalMessage message="Tu essayes d'ajouter une de tes propres expériences à ta bucket list :')" />
    }
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

  box: {
    flexDirection: "row",
    borderRadius: 10,
    backgroundColor: "white",
    padding: 10,
    margin: 10,
    shadowColor: "grey",
    shadowOpacity: 0.25,
    shadowRadius: 6,
    elevation: 5
  },

  blocText: {
    flex: 1,
    width: "100%",
    marginLeft: 10,
    marginRight: 10,
    flexDirection: 'column',
  },

  blocActions: {
    paddingLeft: 10,
    borderLeftWidth: 3,
    borderLeftColor: "#f14d53",
    justifyContent: "space-between"
  },

  
});

export default BlocExperience;