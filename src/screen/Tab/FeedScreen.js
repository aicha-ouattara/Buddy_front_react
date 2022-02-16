import React, {useContext, useState, useEffect} from 'react';
import {ScrollView, StyleSheet, FlatList, StatusBar, Text, Button, TextInput } from 'react-native';
// import { GlobalContext } from '../context/Provider';
import { API_URL } from "@env" ;
import { genericFetch } from '../../api/fetchApi';
import { genericFetchWithToken } from '../../api/fetchApiWithToken';
import BlocExperience from '../../components/BlocExperience';
import { NavigationRouteContext } from '@react-navigation/native';
import ContainerCityCarrousel from '../../components/ContainerCityCarrousel';
import ContainerFeedExperience  from '../../components/ContainerFeedExperience';


function FeedScreen({navigation}) 
{
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
 
    // const state = useContext(GlobalContext);
  
    return (
        <ScrollView contentContainerStyle={{
          flex: 1,
          justifyContent: 'center',
          alignContent: 'center',
        }}>
            {/* {console.log(experiences)} */}
            {isLoading ? <Text> Loading ... </Text> : 
            experiences &&   (
             <>
            <ContainerCityCarrousel/>
            <ContainerFeedExperience experiences={experiences} navigation={navigation}/>
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
       )}
           
         </ScrollView>
    );
  }


  const styles = StyleSheet.create({
    container: {
      flex: 1,
      marginTop: StatusBar.currentHeight || 0,
    },
    item: {
      backgroundColor: '#f9c2ff',
      padding: 20,
      marginVertical: 8,
      marginHorizontal: 16,
    },
    title: {
      fontSize: 32,
    },
  });

export default FeedScreen