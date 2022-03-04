import React, { useContext, useState, useEffect } from 'react';
import { ScrollView, StyleSheet, FlatList, StatusBar, Text, Button, TextInput } from 'react-native';
// import { GlobalContext } from '../context/Provider';
import { genericFetch } from '../../api/fetchApi';
import { genericFetchWithToken } from '../../api/fetchApiWithToken';
import ContainerCityCarrousel from '../../components/ContainerCityCarrousel';
import ContainerFeedExperience from '../../components/ContainerFeedExperience';
import { API_URL } from '@env';

function FeedScreen({ navigation }) {

  /*récupère token automatiquement */
  const body = JSON.stringify({
    "login": "kevin",
    "password": "kevin"
  })
  const [isLoading, setIsLoading] = useState(true);
  const [experiences, setExperiences] = useState([]);

  const [token, setToken] = useState("");

  useEffect(() => {
    genericFetch(`${API_URL}/login`, 'POST', body)
      .then(json => json.json())
      .then(data => setToken(data.token))
      .catch(error => console.error(error))
  }, [])


  useEffect(() => {
    setIsLoading(true)
    genericFetchWithToken(`${API_URL}/experiences`, 'GET', token)
      .then(json => json.json())
      .then(data => setExperiences(data))
      .catch(error => console.error(error))
      .finally(() => setIsLoading(false))
  }, [token])



  const deleteId = (id) => {
    genericFetchWithToken(`${API_URL}/experiences/${id}`, 'DELETE', token)
    console.log('expérience supprimée !')
  }

  // const state = useContext(GlobalContext);

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
          /*<><Text onClick={() => deleteId(experience.id)} key={experience.id}>
            Title : { experience.title}</Text>
            Input new Title : 
            <TextInput
            style={styles.input}
            onChangeText={onChangeNumber}
            value={experience.title}
            placeholder="useless placeholder"
            keyboardType="numeric"
          /> </> */
        }

    </ScrollView>
  );
}


export default FeedScreen