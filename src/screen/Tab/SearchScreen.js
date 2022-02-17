import React, {useEffect, useState} from 'react';
import {StyleSheet, Text, View } from 'react-native';
import { Searchbar } from 'react-native-paper';
import ContainerFeedExperience from '../../components/ContainerFeedExperience';
// import { GlobalContext } from '../context/Provider';

import { genericFetch } from '../../api/fetchApi';
import { genericFetchWithToken } from '../../api/fetchApiWithToken';
import { API_URL } from '@env';

function SearchScreen({navigation, route}) 
{
    // const state = useContext(GlobalContext);
    // route?.params?.location && console.log(route.params.location)

  /*récupère token automatiquement */
  const body = JSON.stringify({
    "login": "test",
    "password": "test"
  })
  const [token, setToken] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [locationSearch, setLocationSearch] = useState("");
  const [titleSearch, setTitleSearch] = useState();
  const [experiences, setExperiences] = useState([]);
  const [searchParams, setSearchParams] = useState({})
  const [queryString, setQueryString] = useState('')

  useEffect(() => {
    genericFetch(`${API_URL}/login`, 'POST', body)
      .then(json => json.json())
      .then(data => setToken(data.token))
      .catch(error => console.error(error))
  }, [])

  useEffect(() => {
    setIsLoading(true)
    route?.params?.location && setLocationSearch(route?.params?.location)
    setIsLoading(false)
  }, [route])

  // useEffect(() => {
  //   setIsLoading(true)
  //   genericFetchWithToken(`${API_URL}/experiences`, 'GET', token)
  //     .then(json => json.json())
  //     .then(data => setExperiences(data))
  //     .catch(error => console.error(error))
  //     .finally(() => setIsLoading(false))
  // }, [searchParams])

// IL FAUT : récupérer le titre + la valeur des éléments à requeter dans un objet puis transformer cet objet en string de requete


  function objectToQueryString(obj) {
    var str = [];
    for (var p in obj)
      if (obj.hasOwnProperty(p)) {
        str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
      }
    return str.join("&");
  }

  var queryString=objectToQueryString(searchParams);
console.log(queryString)

//   useEffect(() => {
// if (titleSearch.length > 0 && locationSearch.length > 0) {
//     let url = new URL(`${API_URL}/experiences`)
//     const params = new URLSearchParams(url.search)
//     params.set('title', titleSearch)
//     params.set('location', locationSearch)
//   } 
// }, [titleSearch, locationSearch])

// useEffect(() => {
//   setIsLoading(true)
//   genericFetchWithToken(`${API_URL}/experiences`, 'GET', token)
//     .then(json => json.json())
//     .then(data => setExperiences(data))
//     .catch(error => console.error(error))
//     .finally(() => setIsLoading(false))
// }, [])
 

  const onChangeLocationSearch = query => setLocationSearch(query);
  const onChangeTitleSearch = query => setTitleSearch(query);
// console.log(experiences)
    return (
        <View style={{ flex: 1}}>
          <View style={styles.container}>
            <Searchbar
              placeholder="Expérience"
              onChangeText={onChangeTitleSearch}
              value={titleSearch}
              style={styles.searchBar}
            />

            <Searchbar
              placeholder="Ville"
              onChangeText={onChangeLocationSearch}
              value={locationSearch}
              style={styles.searchBar}
            />
            </View>
            <View style={styles.container}>
              <Text style={styles.title}>Résultat.s de recherche</Text>
              <ContainerFeedExperience experiences={experiences} navigation={navigation} />
            </View>
         </View>
    );
  }

  const styles = StyleSheet.create({
    searchBar: {
      marginBottom: 10
    },
    title: {
      fontSize: 20,
      marginLeft: 10
    },
    container: {
      margin: 10
    }
  });

export default SearchScreen