import React, {useContext, useState, useEffect} from 'react';
import {ActivityIndicator, StyleSheet, Text, View, Image, ScrollView, Button, TouchableOpacity } from 'react-native';
import { Title } from 'react-native-paper';
import { Tabs, TabScreen, useTabIndex, useTabNavigation} from 'react-native-paper-tabs';
import BlocExperience from '../../components/BlocExperience';
import BlocInterest from '../../components/BlocInterest';
import FormModal from '../../components/FormModal';
import {API_URL} from '@env';
import { genericFetchWithToken } from '../../api/fetchApiWithToken';
import {PatchWithTokenBody} from '../../api/fetchApiWithTokenBody'
import { authState } from "../../store/auth/selectors";
import { useDispatch, useSelector } from "react-redux";
import { logOut } from "../../store/auth/slice";
import EventForm from '../../components/EventForm';
import UpdateEvent from '../../components/UpdateEvent';

function Profile({ navigation, route }) {
  const [isLoading, setIsLoading] = useState(true);
  const [user, setUser] = useState(0);
  const { token, idUser } = useSelector(authState);


  //CONNEXION À L'UTILISATEUR PRÉCIS


  const fetchUser = () => {
    genericFetchWithToken(`${API_URL}/users/${idUser}`, 'GET', token)
      .then(json => json.json())
      .then(data => setUser(data))
      .catch(error => console.error(error))
      .finally(() => setIsLoading(false))
  }

  useEffect(() => {
    setIsLoading(true);
    fetchUser();
  }, [])





// SUPPRESSION EXPERIENCE
  const deleteId = (id, interestLength) => {
    if (interestLength != 0) {
      const bodyExperience = JSON.stringify({
        "visible": false,
        "archive": true
      })
      PatchWithTokenBody(`${API_URL}/experiences/${id}`, "PATCH", token, bodyExperience)
      .then(json => json.json())
      .catch(error => console.error(error)) 
      fetchUser();
      console.log("expérience archivée !");
    }

    if (interestLength == 0) {
      genericFetchWithToken(`${API_URL}/experiences/${id}`, "DELETE", token);
      fetchUser();
      console.log("expérience supprimée !");
    }
  };


  //POSSIBLITÉMODIFICATION VISIBILITÉ EXPÉRIENCE

  const handleVisible = (experience) => {

    if (experience.visible == 0) {
      const bodyExperience = JSON.stringify({
        "visible": true
      })

      PatchWithTokenBody(`${API_URL}/experiences/${experience.id}`, 'PATCH', token, bodyExperience)
      .then(json => json.json())
      .catch(error => console.error(error)) 
      fetchUser();
      console.log("expérience visible !");
    }

    if (experience.visible == 1) {
      const bodyExperience = JSON.stringify({
        "visible": false
      })

      PatchWithTokenBody(`${API_URL}/experiences/${experience.id}`, 'PATCH', token, bodyExperience)

      .then(json => json.json())
      .catch(error => console.error(error))
      fetchUser();
      console.log("expérience invisible !");

    }
  };


// ACCEPETER INVITATION

  const handleStateExperience = (interest) => {
   
    if (interest.accepted == 1 ) {
      const bodyInterest = JSON.stringify({
        "accepted": 1
    
      })
      PatchWithTokenBody(`${API_URL}/interests/${interest.id}`, 'PATCH', token, bodyInterest)
      .then(json => json.json())
      .catch(error => console.error(error)) 
      fetchUser();
      console.log("intérêt accepté !");
    }
  
    if (interest.accepted == 0) {
      const bodyInterest = JSON.stringify({
        "accepted": 0
      })
      PatchWithTokenBody(`${API_URL}/interests/${interest.id}`, 'PATCH', token, bodyInterest)
      .then(json => json.json())
      .catch(error => console.error(error))
      fetchUser();
      console.log("intérêt refusé !");
      // setVisible(false)
    }
  };


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
          handleVisible={(experience) => {
            handleVisible(experience);
            fetchUser();
          }}
          deleteId={(id, interestLength) => {
            deleteId(id, interestLength);
            fetchUser();

          }}
          handleStateExperience={(interest) => {
            handleStateExperience(interest);
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


//TOUTES LES EXPERIENCES
function AllExperiences({ navigation, user, deleteId, handleVisible }) {
  const goTo = useTabNavigation();
  const index = useTabIndex();

  return (
    
    <View style={styles.container}>
      {/* <Title style={{ textAlign: "center", paddingTop: 10 }}>
       TOUTES VOS EXPERIENCES
      </Title> */}
      <ScrollView>
        <View>
          {user.experiences &&
            user.experiences.map((experience) => (
              experience.archive == 0 &&
              <>

                <BlocExperience navigation={navigation} experience={experience} user={user} />
                <EventForm experience={experience}/>
                <View style={styles.blocActions}>
                     
                      {(
                  experience &&(
                    experience.visible == 1 &&
                    <TouchableOpacity onPress={() => handleVisible(experience)}>
                      <Image style={{ width: 25, height: 25 }} source={require('../../../assets/visible.png')}  />
                    </TouchableOpacity>
                    )
                )}
            

                {(
                  experience &&(
                    experience.visible == 0 && 
                    <TouchableOpacity onPress={() => handleVisible(experience)}  >
                     <Image style={{ width: 25, height: 25 }} source={require('../../../assets/invisible.png')}  />
                    </TouchableOpacity>
                  )
                )}

                <Text onClick={() => deleteId(experience.id, experience.interests.length)} key={experience.id} >
                  <Image style={{ width: 25, height: 25 }} source={require("../../../assets/trashcan.png")}/>
                </Text>
        </View>
              </>
            ))}
        </View>
      </ScrollView>
    </View>
  );
}




// TOUTES LES INTERACTIONS
function AllInteractions({ navigation, user, handleStateExperience }) {
  const goTo = useTabNavigation();
  const index = useTabIndex();

  return (
    <View style={styles.container}>
      {/* <Title style={{ textAlign: "center", paddingTop: 10 }}>
        TOUTES VOS INTERACTIONS
      </Title> */}

      <ScrollView>
        <View style={styles.box}>
          {user.experiences &&
            user.experiences.map((experience) =>
              experience.interests.map((interest) => (
                <View>
                  <BlocInterest navigation={navigation} key={interest.id} interest={interest} experience={experience} user={user}  />
               

                  {(
                    interest &&(
                      interest.plan == 1 &&
                      interest.accepted == null && 
                      <TouchableOpacity onPress={() => handleStateExperience(interest)}  >
                        <Image style={{ width: 25, height: 25 }} source={require('../../../assets/accepted.png')}  />
                      </TouchableOpacity>

                      )
                  )}
                    {(
                    interest &&(
                      interest.plan == 1 &&
                      interest.accepted == null && 
                      <TouchableOpacity onPress={() => handleStateExperience(interest)}  >
                        <Image style={{ width: 25, height: 25 }} source={require('../../../assets/refused.png')}  />
                      </TouchableOpacity>

                      )
                  )}

              

              
                  <View style={styles.blocText}>
                    <Text>{interest.message}</Text>
                    <Text>{interest.date}</Text>
                  </View>
                </View>
              ))
            )}
        </View>
      </ScrollView>
    </View>
  );
}





//LE PROFIL PRIVÉ DE L'UTILISATEUR
function UserProfileInfos({ navigation, user }) {
  const goTo = useTabNavigation();
  const index = useTabIndex();
  const dispatch = useDispatch();
  const onLogOut = () => {
    dispatch(logOut());
  };

  return (
    <View style={styles.container}>

        <View>
          <TouchableOpacity onPress={onLogOut}>  
              <Image style={{ width: 30, height: 30 }} source={require("../../../assets/logout.png")}/>
          </TouchableOpacity>

          <FormModal />
        <View>
            <Image style={{ width: 100 , height: 100 }} source={require("../../../assets/profil.png")}/>
        </View>

        <View>
          <Text>{user.login} </Text>
          <Text>Membre depuis le {user.created_at} </Text>
        </View>
       
{/* 
        <View>
          <Text>
            {" "}
            <Image source={require("../../../assets/ok.png")} /> Vérifications
            gmail, facebook, téléphone
          </Text>
        </View> */}

   
      </View>
    </View>
  );
}








//FRONT 
const styles = StyleSheet.create({
  experiencePicture: {
    width: 72,
    height: 72,
    borderRadius: 10,
  },

  avatar: {
    backgroundColor: "white"
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
    elevation: 5
  },

  blocText: {
    flex: 1,
    width: "100%",
    marginLeft: 10,
    marginRight: 10,
    flexDirection: 'column',
  },

  blocActions: {
    paddingLeft: 10,
    borderLeftWidth: 3,
    borderLeftColor: "#f14d53",
    justifyContent: "space-between"
  },

  modalView: {
    flex: 1,
    margin: 20,
    backgroundColor: "white",
    borderRadius: 10,
    padding: 10,
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#000",
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5
  },





container: {
  flex: 1,
  justifyContent: 'center',
  alignContent: "center",
  backgroundColor: "#f2f2f2",
},

});



export default Profile;
