import React, {
  useState,
  useEffect
} from 'react';
import {
  View,
  ScrollView,
  StyleSheet
} from 'react-native';
import {
  genericFetch
} from '../../api/fetchApi';
import {
  genericFetchWithToken
} from '../../api/fetchApiWithToken';
import ContainerCityCarrousel from '../../components/ContainerCityCarrousel';
import ContainerFeedExperience from '../../components/ContainerFeedExperience';
import Loading from '../../components/Loading';
import {
  API_URL
} from '@env';
import jwt_decode from "jwt-decode";

function FeedScreen({
  navigation
}) {

  const [userId, setUserId] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [experiences, setExperiences] = useState([]);
  const [token, setToken] = useState("");


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

  useEffect(() => {
    setIsLoading(true)
    genericFetchWithToken(`${API_URL}/experiences?visible=true`, 'GET', token)
      .then(json => json.json())
      .then(data => setExperiences(data))
      .catch(error => console.error(error))
      .finally(() => setIsLoading(false))

    token.length > 0 && setUserId(jwt_decode(token).id); //get user Id from Token
  }, [token])

  return ( <
    View style = {
      styles.mainBody
    } >

    {
      isLoading ? < Loading / > :

        experiences.length > 0 &&
        <
        ScrollView >
        <
        ContainerCityCarrousel experiences = {
          experiences
        }
      navigation = {
        navigation
      }
      /> <
      ContainerFeedExperience experiences = {
        experiences
      }
      userId = {
        userId
      }
      navigation = {
        navigation
      }
      /> <
      /ScrollView>
    }

    <
    /View>
  );
}

const styles = StyleSheet.create({
  mainBody: {
    flex: 1,
    padding: 10
  }
});


export default FeedScreen;