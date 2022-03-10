import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, ScrollView } from 'react-native';
import ContainerFeedExperience from '../../components/ContainerFeedExperience';
// import { GlobalContext } from '../context/Provider';
import { genericFetch } from '../../api/fetchApi';
import { genericFetchWithToken } from '../../api/fetchApiWithToken';
import { API_URL } from '@env';
import { TextInput } from 'react-native-paper';
import Loading from '../../components/Loading';
import { useDebounce } from 'use-debounce/lib';
const entryPoint = new URL(`${API_URL}/experiences`)
const searchParams = new URLSearchParams(entryPoint.search)

function SearchScreen({ navigation, route }) {

  // const state = useContext(GlobalContext);


  const [token, setToken] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [title, setTitle] = useState('');
  const [debouncedTitle] = useDebounce(title, 1000);
  const [location, setLocation] = useState('');
  const [debouncedLocation] = useDebounce(location, 1000);
  const [searchParamsToString, setSearchParamsToString] = useState("")
  const [experiences, setExperiences] = useState([]);

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
    if (debouncedTitle.length > 0) {
      searchParams.set('title', debouncedTitle)
      setSearchParamsToString(searchParams.toString())
    } else {
      searchParams.delete('title')
      setSearchParamsToString(searchParams.toString())
    }
  }, [debouncedTitle])

  useEffect(() => {
    if (debouncedLocation.length > 0) {
      searchParams.set('location', debouncedLocation)
      setSearchParamsToString(searchParams.toString())
    } else {
      searchParams.delete('location')
      setSearchParamsToString(searchParams.toString())
    }
  }, [debouncedLocation])

  

  //requête de résultats
  useEffect(() => {
    setIsLoading(true)
    if (searchParamsToString.length > 0) {
      console.log("fetch results")
      genericFetchWithToken(`${entryPoint}?${searchParamsToString}`, 'GET', token)
        .then(json => json.json())
        .then(data => setExperiences(data))
        .catch(error => console.error(error))
        .finally(() => setIsLoading(false))
    } else {
      console.log("fetch results fail")
      setExperiences([])
      setIsLoading(false)
    }
  }, [searchParamsToString])


  return (
    <View style={{ flex: 1 }}>
      <View style={styles.container}>
      <View style={styles.SectionStyle}>
         <TextInput
          value={title}
          placeholder="Expérience"
          onChangeText={(title) => setTitle(title)}
          style={styles.input}
          underlineColorAndroid="#f000"
        />
        </View>

        <View style={styles.SectionStyle}>
        <TextInput
          value={location}
          placeholder="Ville"
          underlineColorAndroid="#f000"
          style={styles.input}
          onChangeText={(location) => setLocation(location)}
        /> 
        </View>
      <Text style={styles.title}>Résultat.s de recherche : {experiences.length}</Text>
      </View>
      {isLoading ? 
      <View style={styles.centered}>
        <Loading  />
      </View> :
      <ScrollView>
          <ContainerFeedExperience experiences={experiences} navigation={navigation} />
      </ScrollView>
    }
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
  input: {
    flex: 1,
  },
  SectionStyle: {
    margin: 10,
    flexDirection: "row",
  },
  centered: {
    flex: 1,
    justifyContent: "center",
    alignContent: "center"
  }
});



export default SearchScreen