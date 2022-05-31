import React, {useContext, useState, useEffect} from 'react';
import {ActivityIndicator, StyleSheet, Text, View, Image, ScrollView, Button, TouchableOpacity } from 'react-native';
import { Tabs, TabScreen, useTabIndex, useTabNavigation} from 'react-native-paper-tabs';
import BlocInterest from '../../components/BlocInterest';
import LoginModal from '../../components/user/LoginModal';
import {API_URL} from '@env';
import { genericFetchWithToken } from '../../api/fetchApiWithToken';
import {PatchWithTokenBody} from '../../api/fetchApiWithTokenBody';
import { authState } from "../../store/auth/selectors";
import { useDispatch, useSelector } from "react-redux";
import { logOut } from "../../store/auth/slice";
import { Avatar } from 'react-native-paper';
import BiographyModal from '../../components/user/BiographyModal';
import PhoneModal from '../../components/user/PhoneModal';
import PasswordModal from '../../components/user/PasswordModal';


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
   
    if (interest.accepted == 0 ) {
      const bodyInterest = JSON.stringify({
        "accepted": 2
    
      })
      PatchWithTokenBody(`${API_URL}/interests/${interest.id}`, 'PATCH', token, bodyInterest)
      .then(json => json.json())
      .catch(error => console.error(error)) 
      fetchUser();
      console.log("intérêt accepté !");
    }
  
    if (interest.accepted == 0) {
      const bodyInterest = JSON.stringify({
      "accepted": 1
      })
      PatchWithTokenBody(`${API_URL}/interests/${interest.id}`, 'PATCH', token, bodyInterest)
      .then(json => json.json())
      .catch(error => console.error(error))
      fetchUser();
      console.log("intérêt refusé !");
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
 
      <ScrollView>
        <View>
          {user.experiences &&
            user.experiences.map((experience) => (
              experience.archive == 0 &&
              <>
           <View style={styles.box}>

              <TouchableOpacity style={styles.blocExperience} onPress={() => { navigation.navigate('Experience', { id: experience.id }) }}>
                <Image style={styles.experiencePicture} source={require(`../../../assets/${experience.image}`)} />
                <View style={styles.blocText}>
                  <Text><Text style={{fontWeight: "bold"}}>{experience.title}</Text><Text> | </Text><Text style={{fontStyle: "italic"}}>{experience.location}</Text></Text>
                  <Text numberOfLines={3} >{experience.content}</Text>
                </View>
              </TouchableOpacity>
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
                <EventForm experience={experience}/>
          </View>
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

      <ScrollView>
        <View>
          {user.experiences &&
            user.experiences.map((experience) =>
              experience.interests.map((interest) => (
                <View style={styles.box}>
                  <BlocInterest navigation={navigation} key={interest.id} interest={interest} experience={experience} user={user}  />
               
                  <View style={styles.blocText}>
                    
                    <Text>{interest.message}</Text>
                    <Text>{interest.date}</Text>
                  </View>

                  <View style={styles.blocActions}>
                    <TouchableOpacity onPress={() => { navigation.navigate('User', { id: user.id }) }}>
                      <Avatar.Image style={styles.avatar} size={24} color="white" source={require('../../../assets/profil.png')} />
                    </TouchableOpacity>
                

                <View>
                   
                   {(
                     interest &&(
                       interest.accepted == 1 && 
                       <Image style={{ width: 25, height: 25 }} source={require('../../../assets/refused.png')}  />
                       )
                   )}
             
                   {(
                     interest &&(
                       interest.accepted == 2 && 
                       <Image style={{ width: 25, height: 25 }} source={require('../../../assets/accepted.png')}  />
                     )
                   )}

                {(
                     interest &&(
                       interest.accepted == 0 && 
                       <Image style={{ width: 25, height: 25 }} source={require('../../../assets/attente.png')}  />
                     )
                   )}
             </View>


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

        <View style={styles.avatarProfil}>
         <Image style={styles.experiencePicture} source={require(`../../../assets/${user.avatar}`)} />

        </View>

        <View style={styles.infosProfil}>
          
          <View style = {styles.login}>
             <Text style={{padding: 20, fontWeight: "bold", fontSize: 25 }}>{user.login} </Text> 
            <LoginModal/>
          </View>

          <View style = {styles.biographie}>
          <Text style={{fontSize: 20}}>{user.biography}</Text>
          <BiographyModal/>
          </View>
         
          <View style = {styles.phone}>
            <Text style={{fontSize: 15}}>{user.telephone}</Text>
            <PhoneModal/>
          </View>

          <View>
            <Text style={{fontSize: 20}}>Mot de passe caché{user.password}</Text>
            <PasswordModal/>
          </View>
         

          <View>
            <Text style={{fontWeight: "bold", fontSize: 12}}>Membre depuis le {new Date(user.created_at).toLocaleDateString()} </Text> 
          </View>
        
      

        </View>

        <View style={styles.actionsProfil}>
          <TouchableOpacity onPress={onLogOut} style={styles.deconnexion}>  
              <Text style={{ color: 'white', fontSize: 10}}>DÉCONNEXION</Text>
          </TouchableOpacity>
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






container: {
  flex: 1,
  flexDirection: 'column',
  justifyContent: 'space-around',
  alignContent: "center",
  backgroundColor: "#f2f2f2",
},

actionsProfil: {
    flex: 0.1,
    flexDirection: 'row',
    justifyContent: 'center',
    padding: 30,
},

avatarProfil: {
  flex: 0.2,
  justifyContent: "center",
  alignItems: "center",
  
},

infosProfil:{
  flex: 0.7,
  flexDirection: 'column',
  justifyContent: "space-between",
  alignItems: "center",
},

deconnexion:{
  backgroundColor: '#F14D53',
  justifyContent: "center",
  alignItems: "center",

},

biographie:{
  padding: 40,
  backgroundColor: '#FFFACD',
  borderRadius: 20,
  flexDirection: 'row',
},

login:{
  flexDirection: 'row',
},

phone:{
  flexDirection: 'row',
}

});



export default Profile;
