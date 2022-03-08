import React, { useState, useEffect } from 'react';
import { View, ScrollView, StyleSheet } from 'react-native';
import { genericFetch } from '../../api/fetchApi';
import { genericFetchWithToken } from '../../api/fetchApiWithToken';
import ContainerCityCarrousel from '../../components/ContainerCityCarrousel';
import ContainerFeedExperience from '../../components/ContainerFeedExperience';
import Loading from '../../components/Loading';
import { API_URL } from '@env';

function FeedScreen({ navigation }) {

  /*récupère token automatiquement */
  const body = JSON.stringify({
    "login": "test",
    "password": "test"
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


  return (
    <View style={styles.mainBody}>
     
      {/* {console.log(experiences)} */}
      {isLoading ? <Loading/> : 

        experiences.length > 0 &&
           <ScrollView>
            <ContainerCityCarrousel experiences={experiences} navigation={navigation} />
            <ContainerFeedExperience experiences={experiences} navigation={navigation} />
            </ScrollView>
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
     
    </View>
  );
}

const styles = StyleSheet.create({
  mainBody: {
    flex: 1,
    padding: 10
  }
});


export default FeedScreen