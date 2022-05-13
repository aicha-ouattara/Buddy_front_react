import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, ScrollView, TextInput } from 'react-native';
import ContainerFeedExperience from '../../components/ContainerFeedExperience';
// 
import { genericFetch } from '../../api/fetchApi';
import { genericFetchWithToken } from '../../api/fetchApiWithToken';
import { API_URL } from '@env';
import Loading from '../../components/Loading';
import { useDebounce } from 'use-debounce/lib';
import jwt_decode from "jwt-decode";


const entryPoint = new URL(`${API_URL}/experiences`)
const searchParams = new URLSearchParams(entryPoint.search)

function SearchScreen({ navigation, route }) {

  // 


  const [token, setToken] = useState("");
  const [userId, setUserId] = useState(0);
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

  },[])

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
    token.length > 0 && setUserId(jwt_decode(token).id); //get user Id from Token
    if (searchParamsToString.length > 0) {
      console.log("fetch results")
      genericFetchWithToken(`${entryPoint}?visible=true&${searchParamsToString}`, 'GET', token)
        .then(json => json.json())
        .then(data => setExperiences(data))
        .catch(error => console.error(error))
        .finally(() => setIsLoading(false))
    } else {
      console.log("fetch results fail")
      setExperiences([])
      setIsLoading(false)
    }
  }, [searchParamsToString, token])


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
          <ContainerFeedExperience experiences={experiences} navigation={navigation} userId={userId} />
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
    padding: 10,
    borderRadius: 10,
    backgroundColor: "white",
    color: "#f14d53",
    fontWeight: "bold"
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