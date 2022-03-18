import React, {useContext, useState, useEffect} from 'react';
import {ActivityIndicator, StyleSheet, Text, View, Image, ScrollView, Button, TouchableOpacity } from 'react-native';
import { Title } from 'react-native-paper';
import { Tabs, TabScreen, useTabIndex, useTabNavigation} from 'react-native-paper-tabs';
import BlocExperience from '../../components/BlocExperience';
import BlocInterest from '../../components/BlocInterest';
import FormModal from '../../components/FormModal';
import {API_URL} from '@env';
// import AsyncStorage from "@react-native-async-storage/async-storage";
// import UpdateEvent from '../../components/UpdateEvent';
import Experience from '../Experience';
import { genericFetch } from '../../api/fetchApi';
import { genericFetchWithToken } from '../../api/fetchApiWithToken';
import Visible from '../../components/Visible';



function Profile({ navigation, route }) {
  const [isLoading, setIsLoading] = useState(true);
  const [user, setUser] = useState([]);
  const [token, setToken] = useState("");
  const [visible, setVisible] = useState(false);
  const body = JSON.stringify({
    "login": "mioumiou",
    "password": "mioumiou"
})


  useEffect(() => {
    genericFetch(`${API_URL}/login`, 'POST', body) 
    .then(json => json.json())
    .then(data => setToken(data.token))
    .catch(error => console.error(error))
  }, [])


  const fetchUser = () => {
    genericFetchWithToken(`${API_URL}/users/7`, 'GET', token) 
    .then(json => json.json())
    .then(data => setUser(data))
    .catch(error => console.error(error))
    .finally(() => setIsLoading(false))
  }

  useEffect(() => {
    setIsLoading(true);
    fetchUser();
  }, [token]);

  const deleteId = (id, interestLength) => {
    if (interestLength != 0) {
      genericFetchWithToken(`${API_URL}/experiences/${id}`, "PUT", token);
      fetchUser();
      console.log("expérience archivée !");
    }

    if (interestLength == 0) {
      genericFetchWithToken(`${API_URL}/experiences/${id}`, "DELETE", token);
      fetchUser();
      console.log("expérience supprimée !");
    }
  };

  console.log(user);





  const handleVisible = (experience) => {
    if (visible === false) {
        const bodyExperience = JSON.stringify({
          "visible": false,
          "experience": `api/experiences/${experience.id}`
        })
        genericFetchWithTokenBody(`${API_URL}/experiences`, 'POST', token, bodyExperience)
          .then(json => json.json())
          .then(data => setUser(data))
          .catch(error => console.error(error))
          console.log("expérience visible !");
        setVisible(true)
     

    } if (visible === true)  {
      const bodyExperience = JSON.stringify({
        "visible": true,
        "experience": `api/experiences/${experience.id}`
      })
      genericFetchWithTokenBody(`${API_URL}/experiences`, 'POST', token, bodyExperience)
        .then(json => json.json())
        .then(data => setUser(data))
        .catch(error => console.error(error))
        console.log("expérience invisible !");
      setVisible(true)
   
    }
  }
  return isLoading ? (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <Text> Loading ... </Text>{" "}
    </View>
  ) : (
    <Tabs style={{ backgroundColor: "white" }}>
      <TabScreen label="Experiences">
        <AllExperiences
          user={user}
          navigation={navigation}
          handleVisible={(experience)}
          deleteId={(id, interestLength) => {
            deleteId(id, interestLength);
            fetchUser();

          }}
        />
      </TabScreen>

      <TabScreen label="Interactions">
        <AllInteractions user={user} navigation={navigation} />
      </TabScreen>

      <TabScreen label="Profil">
        <UserProfileInfos user={user} navigation={navigation} />
      </TabScreen>
    </Tabs>
  );
}

function AllExperiences({ navigation, user, deleteId, handleVisible }) {
  const goTo = useTabNavigation();
  const index = useTabIndex();

  return (
    <View style={{ flex: 1, backgroundColor: "white" }}>
      <Title style={{ textAlign: "center", paddingTop: 10 }}>
        ALL EXPERIENCES
      </Title>

      <ScrollView>
        <View>
          {user.experiences &&
            user.experiences.map((experience) => (
              <>
                <BlocExperience
                  navigation={navigation}
                  experience={experience}
                  user={user}
                />
                {/* <UpdateEvent/> */}
                <Text
                  onClick={() =>
                    deleteId(experience.id, experience.interests.length)
                  }
                  key={experience.id}
                >
                  <Image
                    style={{ width: 25, height: 25 }}
                    source={require("../../../assets/trashcan.png")}
                  />
                </Text>
                <TouchableOpacity onPress={() => { handleVisible(experience.id) }} >
            <Visible visible={visible} />
          </TouchableOpacity>
              </>
            ))}
        </View>
      </ScrollView>
    </View>
  );
}

function AllInteractions({ navigation, user }) {
  const goTo = useTabNavigation();
  const index = useTabIndex();

  return (
    <View style={{ flex: 1, backgroundColor: "white" }}>
      <Title style={{ textAlign: "center", paddingTop: 10 }}>
        ALL INTERACTIONS
      </Title>

      <ScrollView>
        <View>
          {user.experiences &&
            user.experiences.map((experience) =>
              experience.interests.map((interest) => (
                <>
                  <BlocInterest
                    navigation={navigation}
                    key={interest.id}
                    interest={interest}
                    experience={experience}
                    user={user}
                  />
                  <Text>id = {interest.id}</Text>
                  <Text>message = {interest.message}</Text>
                  <Text>date = {interest.date}</Text>
                </>
              ))
            )}
        </View>
      </ScrollView>
    </View>
  );
}

function UserProfileInfos({ navigation, user }) {
  const goTo = useTabNavigation();
  const index = useTabIndex();

  return (
    <View style={{ flex: 1, backgroundColor: "white" }}>
      <Title style={{ textAlign: "center", paddingTop: 10 }}>
        PROFILE INFOS
      </Title>

      <View>
        <View>
          <Image
            style={{ width: 50, height: 50 }}
            source={require("../../../assets/profil.png")}
          />

          <View>
            <Text>id {user.id} </Text>
            <Text>Login {user.login} </Text>
            <Text>Date d'inscription {user.created_at} </Text>
          </View>
        </View>

        <View>
          <Text>
            {" "}
            <Image source={require("../../../assets/ok.png")} /> Vérifications
            gmail, facebook, téléphone
          </Text>
        </View>

        <View>
          <FormModal />
        </View>
      </View>
    </View>
  );
}

export default Profile;
