<<<<<<< Updated upstream
import React, { useContext, useState, useEffect } from 'react';
import { ScrollView, StyleSheet, FlatList, StatusBar, Text, Button, TextInput } from 'react-native';
// import { GlobalContext } from '../context/Provider';
import { genericFetch } from '../../api/fetchApi';
import { genericFetchWithToken } from '../../api/fetchApiWithToken';
import ContainerCityCarrousel from '../../components/ContainerCityCarrousel';
import ContainerFeedExperience from '../../components/ContainerFeedExperience';
import AsyncStorage from "@react-native-async-storage/async-storage";

import { API_URL } from '@env';
=======
import React, { useState, useEffect } from 'react';
import { View, ScrollView, StyleSheet, Text } from 'react-native';
import { genericFetchWithToken } from '../../api/fetchApiWithToken';
import ContainerCityCarrousel from '../../components/ContainerCityCarrousel';
import ContainerFeedExperience from '../../components/ContainerFeedExperience';
import Loading from '../../components/Loading';
import { API_URL } from '@env';
import { authState } from "../../store/auth/selectors";
import { useSelector } from "react-redux";
>>>>>>> Stashed changes

function FeedScreen({ navigation }) {

  const [isLoading, setIsLoading] = useState(true);
  const [experiences, setExperiences] = useState([]);

<<<<<<< Updated upstream
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
=======
  const fetchExperiences = () => {
    genericFetchWithToken(`${API_URL}/experiences?visible=true`, 'GET', token)
    .then(json => json.json())
    .then(data => setExperiences(data))
    .catch(error => console.error(error))
    .finally(() => setIsLoading(false))
  }

useEffect(() => {
  setIsLoading(true)
  fetchExperiences()
}, [])

useEffect(() => {
  setIsLoading(true)
  fetchExperiences()
}, [token])

  return (
    <View style={styles.mainBody}>

      {isLoading ? <Loading /> :

        experiences.length > 0 ?
        <ScrollView>
          <ContainerCityCarrousel experiences={experiences} navigation={navigation} />
          <ContainerFeedExperience experiences={experiences} navigation={navigation} />
        </ScrollView> :
        <View style={styles.noExp}>
          <Text>Aucune expérience...</Text>
        </View>
      }

    </View>
  );
}

const styles = StyleSheet.create({
  mainBody: {
    flex: 1,
    padding: 10
  },
  noExp : {
    flex: 1,
    textAlign: "center",
    justifyContent: "center",
  }
});

export default FeedScreen;
>>>>>>> Stashed changes
