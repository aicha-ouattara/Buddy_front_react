import React, { useContext, useEffect, useState } from 'react';
import { StyleSheet, ScrollView, Text, View, Button, Modal, Image, TouchableOpacity, TextInput } from 'react-native';
import { Divider, Avatar } from 'react-native-paper';

// import { GlobalContext } from '../context/Provider';
import { genericFetch } from '../api/fetchApi';
import { genericFetchWithToken } from '../api/fetchApiWithToken';
import { genericFetchWithTokenBody } from '../api/fetchApiWithTokenBody';
import { API_URL } from '@env';
import { authState } from "../store/auth/selectors";
import { useDispatch, useSelector } from "react-redux";
import Loading from '../components/Loading';
import Bucket from '../components/Bucket';
import ModalMessage from '../components/ModalMessage';
import UpdateEvent from '../components/UpdateEvent';

const Experience = ({ route, navigation }) => {

  // const state = useContext(GlobalContext);


  const [isLoading, setIsLoading] = useState(true);
  const [userId, setUserId] = useState(0);
  const { token, idUser } = useSelector(authState);
  const [experience, setExperience] = useState([]);
  const [liked, setLiked] = useState(false);
  const [superLiked, setSuperLiked] = useState(false);
  const [interestId, setInterestId] = useState(0)
  const [modalVisible, setModalVisible] = useState(false);
  const [formOpen, setFormOpen] = useState(false);
  const [content, setContent] = useState("");
  
  const fetchUser = () => {
    genericFetchWithToken(`${API_URL}/users/${idUser}`, 'GET', token)
      .then(json => json.json())
      .then(data => setUserId(data))
      .catch(error => console.error(error))
      .finally(() => setIsLoading(false))
  }

  useEffect(() => {
    setIsLoading(true);
    fetchUser();
  }, [])




  useEffect(() => {
    setIsLoading(true)
    genericFetchWithToken(`${API_URL}/experiences/${route.params.id}`, 'GET', token)
   fetchUser()
  }, [token])


  useEffect(() => {
experience && experience?.interests &&    experience.interests.map(function (interest) { //set interest id and liked if it exists
      if (interest.user == `/api/users/${userId}`) {
        setLiked(true)
        setInterestId(interest.id)
      } else {console.log(interest.user, userId)}
    })
  }, [experience])

  const handleLike = (experience) => {
    if (liked === false) {
      if (experience.user.id != userId) { //if not your own experience
        const bodyInterest = JSON.stringify({
          "plan": false,
          "experience": `api/experiences/${experience.id}`
        })
        genericFetchWithTokenBody(`${API_URL}/interests`, 'POST', token, bodyInterest)
          .then(json => json.json())
          .then(data => { setInterestId(data.id), console.log(`liked ${experience.id} - interest ${data.id} created - by user ${userId}`) })
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

  const handleSuperLike = (experience) => {
    if (superLiked === false) {
      if (experience.user.id != userId) { //if not your own experience
        setFormOpen(true)
      } else {
        console.log('Cannot like your own experiences')
        setModalVisible(true)
        setTimeout(() => {
          setModalVisible(false)
        }, 4000)
      }
    } else {
      console.log(`To Do Now can't be deleted so easily`)
    }
  }


  const submitSuperLike = (message) => {
    if (superLiked === false) {
      if (experience.user.id != userId) { //if not your own experience
        const bodyInterest = JSON.stringify({
          "plan": true,
          "experience": `api/experiences/${experience.id}`,
          "message" : message
        })
        // genericFetchWithTokenBody(`${API_URL}/interests`, 'POST', token, bodyInterest)
        //   .then(json => json.json())
        //   .then(data => { setInterestId(data.id), console.log(`superliked ${experience.id} - interest ${data.id} created - by user ${userId}`) })
        //   .catch(error => console.error(error))

        setSuperLiked(true)
      } else {
        console.log('Cannot like your own experiences')
        setModalVisible(true)
        setTimeout(() => {
          setModalVisible(false)
        }, 4000)
      }
    } else {
      // genericFetchWithToken(`${API_URL}/interests/${interestId}`, 'DELETE', token)
      // console.log(`unliked ${experience.id} - interest ${interestId} deleted - by user ${userId}`)
      setSuperLiked(false)
    }
  }
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>

      {isLoading ? <Loading /> :
        (experience.user && (

          <ScrollView>
           {/* <UpdateEvent/> */}
            <View style={styles.views}>
              <Image style={styles.experiencePicture} source={require(`../../assets/${experience.image}`)} />
            </View>

            <View style={styles.views}>
              <View style={{flex: 0.25, alignItems: 'center', justifyContent: "space-between", flexDirection: 'row'}}>
                <Text style={styles.title}>{experience.title}</Text>
                <View style={styles.blocActions}>
                  <TouchableOpacity onPress={() => { handleLike(experience) }}>
                    <Bucket liked={liked} />
                  </TouchableOpacity>
                  <TouchableOpacity onPress={() => handleSuperLike(experience)} >
                    <Bucket liked={superLiked} />
                  </TouchableOpacity>
                </View>
              </View>
              <View>
              <Text>{experience.location}</Text>
              <Text>{experience.created_at}</Text>
              </View>
            </View>

            <Divider />
            <View style={styles.views}>
              <TouchableOpacity onPress={() => { navigation.navigate('User', { id: experience.user.id }) }}>
                <View  style={{flew: 1, flexDirection: 'row'}}>
                <Avatar.Image style={styles.avatar} size={24} color="white" source={require('../../assets/profil.png')} />
                <Text>{experience.user.login}</Text>
                </View>
              </TouchableOpacity>
              <Text>{experience.reviews.length} commentaires</Text>
              <Text>durée : {experience.duration} · {experience.spots} places</Text>
            </View>
            <Divider />
            <View style={styles.views}>
              <Text style={{ fontSize: 12, textAlign: 'justify', paddingBottom: 10 }}>{experience.content}</Text>
              <Divider />
            </View>

                <Modal visible={formOpen}>
                <View>
                  <TextInput 
                  value={content}
                  onChange={(content) => setContent(content)}
                  multiline editable />
                  <TouchableOpacity onPress={() => setFormOpen(false)} ><Text>Revenir</Text></TouchableOpacity>
                  <TouchableOpacity onPress={() => submitSuperLike(content)} ><Text>Envoyer</Text></TouchableOpacity>
                  </View>
                  </Modal>
            
              <ModalMessage modalVisible={modalVisible} message="Tu essayes d'ajouter une de tes propres expériences à ta bucket list :')" />
            
          </ScrollView>

        ))}


    </View>
  );
}



const styles = StyleSheet.create({
  experiencePicture: {
    flex: 1,
    height: 300,
    width: 300,
    resizeMode: "cover"
  },
  title: {
    flex: 1,
    flexWrap: "wrap",
    fontSize: 30,
    fontWeight: 'bold',
  },
  avatar: {
    backgroundColor: "white"
  },
  blocActions: {
    marginLeft: 10,
    paddingLeft: 10,
    borderLeftWidth: 3,
    borderLeftColor: "#f14d53",
    flexDirection: 'row',
    alignItems: "center"
  },
  views: {
    padding: 10,
    flex: 0.5,
    justifyContent: "space-around"
  },

});


export default Experience