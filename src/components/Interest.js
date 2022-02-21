import React, {useContext, useEffect, useState} from 'react';
import {ActivityIndicator, StyleSheet, Text, View, Button, Image, TouchableOpacity } from 'react-native';
// import { GlobalContext } from '../context/Provider';
import BucketForm from './BucketForm';
import {API_URL} from '@env';
import { genericFetch } from '../api/fetchApi';
import { genericFetchWithToken } from '../api/fetchApiWithToken';


const Interaction = () => {

    // const state = useContext(GlobalContext);

    const body = JSON.stringify({
      "login": "kevin",
      "password": "kevin"
  })
    const [isLoading, setIsLoading] = useState(true);
    const [interests, setInterest] = useState([]);

    const [token, setToken] = useState("");

    useEffect(() => {
      genericFetch(`${API_URL}/login`, 'POST', body) 
      .then(json => json.json())
      .then(data => setToken(data.token))
      .catch(error => console.error(error))
    }, [])
  

    useEffect(() => {
      setIsLoading(true)
      genericFetchWithToken(`${API_URL}/interests`, 'GET', token) 
      .then(json => json.json())
      .then(data => setInterest(data))
      .catch(error => console.error(error))
      .finally(() => setIsLoading(false))
    }, [token])
    console.log(interests)

    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        
        {isLoading ? <Text> Loading ... </Text> : 
            (interests.experience && interests.map ( interest => 
          <View key={interest.id}>
          <Text>{ interest.message}</Text>  
       </View>))}
  

    </View>
    );
  }




  

export default Interaction