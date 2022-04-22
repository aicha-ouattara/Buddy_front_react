import React, {useContext, useState, useEffect} from 'react';
import { View, Text, Image, ScrollView, TextInput, Title, StyleSheet, TouchableOpacity } from 'react-native';
import { API_URL } from '@env';
import { genericFetch } from '../api/fetchApi';
import { genericFetchWithToken } from '../api/fetchApiWithToken';
import { genericFetchWithTokenBody } from '../api/fetchApiWithTokenBody';


const BlocExperience = ({ interest, navigation, experience}) => {
  const [token, setToken] = useState("");
  const [user, setUser] = useState([]);

  const body = JSON.stringify({
    "login": "test",
    "password": "test"
  })


  useEffect(() => {
    genericFetch(`${API_URL}/login`, 'POST', body) 
    .then(json => json.json())
    .then(data => setToken(data.token))
    .catch(error => console.error(error))
  }, [])

  const fetchUser = () => {
    genericFetchWithToken(`${API_URL}/users/7`, 'GET', token) 
    .then(json => json.json())
    .then(data => setUser(data))
    .catch(error => console.error(error))
  
  }

  useEffect(() => {
    fetchUser();
  }, [token]);


  const handleStateExperience = (experience) => {
   
    if (experience.accepted == 0) {
      const bodyExperience = JSON.stringify({
        "accepted": true
    
      })
      genericFetchWithTokenBody(`${API_URL}/experiences/${id}`, 'PATCH', token, bodyExperience)
      .then(json => json.json())
      .catch(error => console.error(error)) 
      fetchUser();
      console.log("intérêt accepté !");
    }
  
    if (experience.accepted== 1) {
      const bodyExperience = JSON.stringify({
        "accepted": false
      })
      genericFetchWithTokenBody(`${API_URL}/experiences/${id}`, 'PATCH', token, bodyExperience)
      .then(json => json.json())
      .catch(error => console.error(error))
      fetchUser();
      console.log("intérêt refusé !");
      // setVisible(false)
    }
  };
    return (
      <View>
      
       {(
         interest &&(
           interest.plan == 1 &&
          interest.accepted == 0 && 
          <Image 
          style={{ width: 25, height: 25 }} source={require('../../assets/refused.png')}  />
           )

       )}

      {(
         interest &&(
          interest.plan == 1 &&
          interest.accepted == 1 && 
          <Image 
          style={{ width: 25, height: 25 }} source={require('../../assets/accepted.png')}  />
         )
       )}

       {(
        interest &&(
          interest.plan == 1 &&
          interest.accepted == null && 
          <>
            <Image style={{ width: 25, height: 25 }} source={require('../../assets/attente.png')}  />
            <TouchableOpacity onPress={() => handleStateExperience(experience.id)}  >
               <Image style={{ width: 25, height: 25 }} source={require('../../assets/accepted.png')}  />
            </TouchableOpacity>
            <Text>OR</Text>
            <TouchableOpacity onPress={() => handleStateExperience(experience.id)}  >
               <Image style={{ width: 25, height: 25 }} source={require('../../assets/refused.png')}  />
            </TouchableOpacity>
          </>
        
         )

      )}

     
         <Text onPress={() => {navigation.navigate('Experience', {id:experience.id})}}>{experience.title}</Text>
         <Text onPress={() => {navigation.navigate('User', {id : user.id})}} >{user.login}</Text>
         
       </View>
  );
}
  
    
export default BlocExperience;