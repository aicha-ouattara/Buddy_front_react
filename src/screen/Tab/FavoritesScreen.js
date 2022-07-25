import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  StyleSheet,
  Text,
  View,
  Image,
  ScrollView,
  Button,
  TouchableOpacity,
  TextInput,
} from "react-native";
import {
  Tabs,
  TabScreen,
  useTabIndex,
  useTabNavigation,
} from "react-native-paper-tabs";
import BlocInterest from "../../components/BlocInterest";
import { Avatar } from "react-native-paper";
import { API_URL } from "@env";
import { genericFetchWithToken } from "../../api/fetchApiWithToken";
import { authState } from "../../store/auth/selectors";
import { useDispatch, useSelector } from "react-redux";
import Loading from "../../components/Loading";


function FavoritesScreen({ navigation }) {

  const [isLoading, setIsLoading] = useState(true);
  const [user, setUser] = useState(0);
  const { token, idUser } = useSelector(authState);

  return (
  
 
    <Tabs style={{ backgroundColor: "white" }}>
      <TabScreen label="BucketList">
        <BucketList
          navigation={navigation}
        />
      </TabScreen>

      <TabScreen label="ToDoNow">
        <ToDoNow
          user={user}
          navigation={navigation}
        />
      </TabScreen>
    </Tabs>
  );
}

function BucketList({ navigation, route }) {
  const goTo = useTabNavigation();
  const index = useTabIndex();
  const [experiences, setExperiences] = useState([]);
  const { token, idUser } = useSelector(authState);
  const [isLoading, setIsLoading] = useState(true);
  const [user, setUser] = useState(0);

  const fetchExperiences = () => {
    genericFetchWithToken(`${API_URL}/experiences?visible=true`, "GET", token)
      .then((json) => json.json())
      .then((data) => setExperiences(data))
      .catch((error) => console.error(error))
      .finally(() => setIsLoading(false));
  };

  useEffect(() => {
    setIsLoading(true);
    fetchExperiences();
  }, []);

  const fetchUser = () => {
    genericFetchWithToken(`${API_URL}/users/${idUser}`, "GET", token)
      .then((json) => json.json())
      .then((data) => setUser(data))
      .catch((error) => console.error(error))
      .finally(() => setIsLoading(false));
  };

  useEffect(() => {
    setIsLoading(true);
    fetchUser();
  }, [route]);

  const deleteId = (interest) => {
   
    genericFetchWithToken(
      `${API_URL}/interests/${interest.id}`,
      "DELETE",
      token
    ),
      fetchUser();
      console.log('suppression')
     
  };


  return isLoading ? (
    <Loading />
  ) : (
    <View  style={styles.container}>
      <ScrollView>
        <View>
          {experiences &&
          experiences.map((experience) =>
            experience.interests.map(
                (interest) =>
                interest.user === `/api/users/${idUser}` &&
                  interest.plan == 0 && (
                    <>
                  <View style={styles.box} key={interest.id}>
      <TouchableOpacity
        style={styles.blocExperience}
        onPress={() => {
          navigation.navigate("Experience", {
            id: experience.id,
            name: experience.title,
          });
        }}
      >
        <Image
          style={styles.experiencePicture}
          source={
            { uri: experience.image } ?? require(`../../../assets/exemple_ville.jpeg`)
          }
        />
        <View style={styles.blocText}>
          <Text>
            <Text style={{ fontWeight: "bold" }}>{experience.title}</Text>
            <Text> | </Text>
            <Text style={{ fontStyle: "italic" }}>{experience.location}</Text>
          </Text>
          <Text numberOfLines={3}>{experience.content}</Text>
        </View>
      </TouchableOpacity>

    
        <View
          style={[
            styles.blocActions,
            { justifyContent: "space-between" },
          ]}
        >
     
            <TouchableOpacity
              onPress={() => {
                navigation.navigate("User", { id: experience.user.id, name: experience.user.login });
              }}
            >
              <Avatar.Image
                style={styles.avatar}
                size={24}
                color="white"
                source={{ uri: experience.user.avatar } ?? require("../../../assets/profil.png")}
              />
            </TouchableOpacity>
          
       
                    <TouchableOpacity
                        onClick={() =>
                          deleteId(interest)
                        }
                        key={interest.id}
                      >
              <Image style={{ width: 25, height: 25, marginTop: 10 }} source={require("../../../assets/icons/bucket-red.png")}
                              />
               </TouchableOpacity> 
     
        </View>
   

    </View>
                    </>
                  )
              ))
          }
        </View>
      </ScrollView>
    </View>
  );
}

function ToDoNow({ navigation, route}) {
  const goTo = useTabNavigation();
  const index = useTabIndex();
  const [experiences, setExperiences] = useState([]);
  const { token, idUser } = useSelector(authState);
  const [isLoading, setIsLoading] = useState(true);
  const [user, setUser] = useState(0);

  const fetchExperiences = () => {
    genericFetchWithToken(`${API_URL}/experiences?visible=true`, "GET", token)
      .then((json) => json.json())
      .then((data) => setExperiences(data))
      .catch((error) => console.error(error))
      .finally(() => setIsLoading(false));
  };

  useEffect(() => {
    setIsLoading(true);
    fetchExperiences();
  }, []);

  const fetchUser = () => {
    genericFetchWithToken(`${API_URL}/users/${idUser}`, "GET", token)
      .then((json) => json.json())
      .then((data) => setUser(data))
      .catch((error) => console.error(error))
      .finally(() => setIsLoading(false));
  };

  useEffect(() => {
    setIsLoading(true);
    fetchUser();
  }, [route]);




  return (
    <View style={styles.container}>
      <ScrollView>
      <View>
          {experiences &&
          experiences.map((experience) =>
            experience.interests.map(
                (interest) =>
                interest.user === `/api/users/${idUser}` &&
                  interest.plan == 1 && (
                    <>
                  <View style={styles.box} key={interest.id}>
      <TouchableOpacity
        style={styles.blocExperience}
        onPress={() => {
          navigation.navigate("Experience", {
            id: experience.id,
            name: experience.title,
          });
        }}
      >
        <Image
          style={styles.experiencePicture}
          source={
            { uri: experience.image } ?? require(`../../../assets/exemple_ville.jpeg`)
          }
        />
        <View style={styles.blocText}>
          <Text>
            <Text style={{ fontWeight: "bold" }}>{experience.title}</Text>
            <Text> | </Text>
            <Text style={{ fontStyle: "italic" }}>{experience.location}</Text>
          </Text>
          <Text numberOfLines={3}>{experience.content}</Text>
        </View>
      </TouchableOpacity>

    
        <View
          style={[
            styles.blocActions,
            { justifyContent: "space-between" },
          ]}
        >
     
            <TouchableOpacity
              onPress={() => {
                navigation.navigate("User", { id: experience.user.id, name: experience.user.login });
              }}
            >
              <Avatar.Image
                style={styles.avatar}
                size={24}
                color="white"
                source={{ uri: experience.user.avatar } ?? require("../../../assets/profil.png")}
              />
            </TouchableOpacity>
          
            <TouchableOpacity  key={interest.id}>
                            {interest.accepted == 0 ? (
                              <Image
                              style={{ width: 25, height: 25, marginTop: 10 }} 
                                source={require("../../../assets/attente.png")}
                              />
                            ) : null}

                            {interest.accepted == 1 ? (
                              <Image
                              style={{ width: 25, height: 25, marginTop: 10 }} 
                                source={require("../../../assets/refused.png")}
                              />
                            ) : null}

                            {interest.accepted == 2 ? (
                              <Image
                              style={{ width: 25, height: 25, marginTop: 10 }} 
                                source={require("../../../assets/accepted.png")}
                              />
                            ) : null}
                          </TouchableOpacity>
     
        </View>
   

    </View>
                    </>
                  )
              ))
          }
        </View>
                          
            
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 10,
    marginBottom: 10,
  },

  blocExperience: {
    flex: 1,
    flexDirection: "row",
  },

 box: {
    flexDirection: "row",
    borderRadius: 10,
    backgroundColor: "white",
    padding: 10,
    margin: 10,
    shadowColor: "grey",
    shadowOpacity: 0.25,
    shadowRadius: 6,
    elevation: 5,
  },

  blocActions: {
    paddingLeft: 10,
    borderLeftWidth: 3,
    borderLeftColor: "#f14d53",
    justifyContent: "space-around",
  },

  blocText: {
    flex: 1,
    width: "100%",
    marginLeft: 10,
    marginRight: 10,
    flexDirection: "column",
    justifyContent: "space-around",
  },

  experiencePicture: {
    height: 32,
    width: 32,
  },

  views: {
    padding: 10,
    flex: 0.5,
    justifyContent: "space-around",
  },
});

export default FavoritesScreen;