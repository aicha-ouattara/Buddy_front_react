import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import ContainerFeedExperience from '../../components/ContainerFeedExperience';
// import { GlobalContext } from '../context/Provider';
import { genericFetch } from '../../api/fetchApi';
import { genericFetchWithToken } from '../../api/fetchApiWithToken';
import { API_URL } from '@env';
import { TextInput } from 'react-native-paper';


const entryPoint = new URL(`${API_URL}/experiences`)
const searchParams = new URLSearchParams(entryPoint.search)

function SearchScreen({ navigation, route }) {

  // const state = useContext(GlobalContext);


  const [token, setToken] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [title, setTitle] = useState('');
  const [location, setLocation] = useState('');

  const [searchParamsToString, setSearchParamsToString] = useState("")
  const [experiences, setExperiences] = useState([]);

  //A FAIRE : debounce les inputs. changer la valeur de la ville.

  /*récupère token automatiquement */
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

  //récupère ville sélectionnée dans le feed
  useEffect(() => {
    route?.params?.location && setLocation(route.params.location)
    setTitle('')
  }, [route?.params?.location])

  //set les paramètres de query
  useEffect(() => {
    if (title.length > 0) {
      searchParams.set('title', title)
      setSearchParamsToString(searchParams.toString())
    } else {
      searchParams.delete('title')
      setSearchParamsToString(searchParams.toString())
    }
  }, [title])

  useEffect(() => {
    if (location.length > 0) {
      searchParams.set('location', location)
      setSearchParamsToString(searchParams.toString())
    } else {
      searchParams.delete('location')
      setSearchParamsToString(searchParams.toString())
    }
  }, [location])


  //requête de résultats
  useEffect(() => {
    setIsLoading(true)
    if (searchParamsToString.length > 0) {
      genericFetchWithToken(`${entryPoint}?${searchParamsToString}`, 'GET', token)
        .then(json => json.json())
        .then(data => setExperiences(data))
        .catch(error => console.error(error))
        .finally(() => setIsLoading(false))
    } else {
      setExperiences([])
    }
  }, [searchParamsToString, token])


  return (
    <View style={{ flex: 1 }}>
      <View style={styles.container}>
         <TextInput
          value={title}
          placeholder="Expérience"
          onChangeText={(title) => setTitle(title)}
          style={styles.input}
        />

        {/* <TextInput
          value={textLocation}
          placeholder="Ville"
          onChangeText={(location) => setTextLocation(location)}
        />  */}


      </View>
      <View style={styles.container}>
        <Text style={styles.title}>Résultat.s de recherche</Text>
        <ContainerFeedExperience experiences={experiences} navigation={navigation} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  title: {
    fontSize: 20,
    marginLeft: 10
  },
  container: {
    margin: 10
  },
  input : {
    borderRadius: 25,
  padding: 20,
  marginBottom: 10,
  }
});



export default SearchScreen