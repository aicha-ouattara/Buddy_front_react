import React , { useState, useEffect } from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity} from 'react-native';
import { Avatar } from 'react-native-paper';
import jwt_decode from "jwt-decode";
import { genericFetch } from '../api/fetchApi';
import { genericFetchWithToken } from '../api/fetchApiWithToken';
import { genericFetchWithTokenBody } from '../api/fetchApiWithTokenBody';
import { API_URL } from '@env';
import Loading from './Loading';
import Heart from './Heart';
const BlocExperience = ({experience, user, navigation, hasActions=false}) => {
  // experience&&console.log(experience);



  /*récupère token automatiquement */
  const body = JSON.stringify({
    "login": "test",
    "password": "test"
  })
  const [isLoading, setIsLoading] = useState(true);

  const [token, setToken] = useState("");
  const [userUri, setUserUri] = useState('')

  useEffect(() => {
    token.length > 0 && setUserUri(jwt_decode(token).userUri);

  }, [token])

  useEffect(() => {
    genericFetch(`${API_URL}/login`, 'POST', body)
      .then(json => json.json())
      .then(data => setToken(data.token))
      .catch(error => console.error(error))
      .finally(() => setIsLoading(false))
  }, [])
  
  const handleLike = (experienceId) => {
    const bodyInterest = JSON.stringify({
      "message" : "",
      "plan": false,
      "experience": `api/experiences/${experienceId}`
  })

  genericFetchWithTokenBody(`${API_URL}/interests`, 'POST', token, bodyInterest)
      .then(json => json.json())
      .then(data => console.log(`liked ${data.experience} by ${data.user}`)
      .catch(error => console.error(error))
      )
  }

  const handleUnlike = (interestId, userId) => {
    genericFetchWithToken(`${API_URL}/interests/${interestId}`, 'DELETE', token)
    console.log(`unliked ${interestId} by ${userId}`)
  }


    return (
 
      <View  style={styles.box}>
        <TouchableOpacity style={styles.blocExperience} onPress={() => {navigation.navigate('Experience', {id : experience.id})}}>
          <Image style={styles.experiencePicture} source={require('../../assets/exemple_ville.jpeg')}/>
        <View style={styles.blocText}>
          <Text>{experience.title} | {experience.location}</Text>
          <Text numberOfLines={3} >{experience.content}</Text>
         </View>
         </TouchableOpacity>
         {/* Actions line display */}
         {hasActions &&
          <View style={styles.blocActions}>
            <TouchableOpacity onPress={() => {navigation.navigate('User', {id : user.id})}}>
              <Avatar.Image style={styles.avatar} size={24} color="white" source={require('../../assets/profil.png')} />
            </TouchableOpacity>
          
                 {(experience.interests.length == 0 && (
                  <TouchableOpacity onPress={() => {handleUnlike(interest)}} >
                  <Image style={styles.heartLogo} source={require('../../assets/heart.png')} />
                </TouchableOpacity>
                   ) )} 

    

               {(  experience?.interests && experience.interests.map(function(interest) {
                   if(interest.user == userUri ) {
                     return  <>
                     <TouchableOpacity onPress={() => {handleUnlike(interest)}} >
                       <Image style={styles.noheartLogo} source={require('../../assets/heart.png')} />
                     </TouchableOpacity>
                       </>
                   }  else {
                    return  <>
                    <TouchableOpacity onPress={() => {handleUnlike(interest)}} >
                      <Image style={styles.heartLogo} source={require('../../assets/heart.png')} />
                    </TouchableOpacity>
                      </>
                   }        })
                   
                   )}            
               


                
           
            
            
            {/* <TouchableOpacity onPress={() => {handleUnlike(interest)}} >
                <Image style={styles.noheartLogo} source={require('../../assets/heart.png')} />
               </TouchableOpacity> */}

            
              {/* {isLoading ? <Text> Loading ... </Text> : 
            (
            
                experience.interests && experience.interests.map(interest => {

                    interest.user == userUri && <Heart handleUnlike={handleUnlike} handleLike={handleLike}/>
                 
              // experience.interests && experience.interests.map(interest => {

              //   interest.user == userUri && <Heart handleUnlike={handleUnlike} handleLike={handleLike}/>
            )})} */}
           
   
       
         </View>
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
  heartLogo: {
    width: 24,
    height: 24,
    borderRadius: 10000,
  },
  noheartLogo: {
    width: 24,
    height: 24,
    borderRadius: 10000,
    backgroundColor: "red"
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
    marginTop: 20,
    borderRadius: 10,
    backgroundColor: "white",
    padding: 10
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
  }


});
    
export default BlocExperience;