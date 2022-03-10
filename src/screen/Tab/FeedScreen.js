import React, { useContext, useState, useEffect } from 'react';
import { ScrollView, StyleSheet, FlatList, StatusBar, Text, Button, TextInput } from 'react-native';
// import { GlobalContext } from '../context/Provider';
import { genericFetch } from '../../api/fetchApi';
import { genericFetchWithToken } from '../../api/fetchApiWithToken';
import ContainerCityCarrousel from '../../components/ContainerCityCarrousel';
import ContainerFeedExperience from '../../components/ContainerFeedExperience';
import AsyncStorage from "@react-native-async-storage/async-storage";

import { API_URL } from '@env';

function FeedScreen({ navigation }) {

  const [isLoading, setIsLoading] = useState(true);
  const [experiences, setExperiences] = useState([]);

  const [token, setToken] = useState("");

  useEffect(() => {
    getData();
    // removeData();
  }, []);

  const getData = () => {
    try {
      AsyncStorage.getItem("token").then((value) => {
        if (value != null) {
          setToken(value);
          console.log("valeur feed screen:", value);
          // navigation.navigate("Protected");
        }
      });
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    setIsLoading(true)
    genericFetchWithToken(`${API_URL}/experiences`, 'GET', token)
      .then(json => json.json())
      .then(data => setExperiences(data))
      .catch(error => console.error(error))
      .finally(() => setIsLoading(false))
  }, [token])

  return (
    <ScrollView contentContainerStyle={{
      flex: 1,
      justifyContent: 'center',
      alignContent: 'center',
      margin: 10,
    }}>
      {/* {console.log(experiences)} */}
      {isLoading ? <Text style={{textAlign: "center"}}> Loading ... </Text> :
        experiences.length > 0 &&
          <>
            <ContainerCityCarrousel experiences={experiences} navigation={navigation} />
            <ContainerFeedExperience experiences={experiences} navigation={navigation} />
          </>
      
        }

    </ScrollView>
  );
}


export default FeedScreen