import React, { useContext, useState, useEffect } from "react";
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
  Modal
} from "react-native";
import { Divider } from "react-native-paper";
import {
  Tabs,
  TabScreen,
  useTabIndex,
  useTabNavigation,
 
} from "react-native-paper-tabs";
import BlocInterest from "../../components/BlocInterest";
import LoginModal from "../../components/user/LoginModal";
import { API_URL } from "@env";
import { genericFetchWithToken } from "../../api/fetchApiWithToken";
import { PatchWithTokenBody } from "../../api/fetchApiWithTokenBody";
import { authState } from "../../store/auth/selectors";
import { useDispatch, useSelector } from "react-redux";
import { logOut } from "../../store/auth/slice";
import { Avatar } from "react-native-paper";
import BiographyModal from "../../components/user/BiographyModal";
import PhoneModal from "../../components/user/PhoneModal";
import PasswordModal from "../../components/user/PasswordModal";
import InteractionStatusModal from "../../components/user/InteractionStatusModal";
// import AvatarModal from "../../components/user/AvatarModal";
import Loading from "../../components/Loading";

function Profile({ navigation, route }) {
  const [isLoading, setIsLoading] = useState(true);
  const [user, setUser] = useState(0);
  const { token, idUser } = useSelector(authState);
 

  //CONNEXION À L'UTILISATEUR PRÉCIS

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

  // SUPPRESSION EXPERIENCE
  const deleteId = (id, interestLength) => {
    if (interestLength != 0) {
      const bodyExperience = JSON.stringify({
        visible: false,
        archive: true,
      });
      PatchWithTokenBody(
        `${API_URL}/experiences/${id}`,
        "PATCH",
        token,
        bodyExperience
      )
        .then((json) => json.json())
        .catch((error) => console.error(error));
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
        visible: true,
      });

      PatchWithTokenBody(
        `${API_URL}/experiences/${experience.id}`,
        "PATCH",
        token,
        bodyExperience
      )
        .then((json) => json.json())
        .catch((error) => console.error(error));
      fetchUser();
      console.log("expérience visible !");
    }

    if (experience.visible == 1) {
      const bodyExperience = JSON.stringify({
        visible: false,
      });

      PatchWithTokenBody(
        `${API_URL}/experiences/${experience.id}`,
        "PATCH",
        token,
        bodyExperience
      )
        .then((json) => json.json())
        .catch((error) => console.error(error));
      fetchUser();
      console.log("expérience invisible !");
    }
  };

  // ACCEPETER INVITATION

  const handleStateExperience = (interest) => {
    if (interest.accepted == 0) {
      const bodyInterest = JSON.stringify({
        accepted: 2,
      });
      PatchWithTokenBody(
        `${API_URL}/interests/${interest.id}`,
        "PATCH",
        token,
        bodyInterest
      )
        .then((json) => json.json())
        .catch((error) => console.error(error));
      fetchUser();
      console.log("intérêt accepté !");
    }

    if (interest.accepted == 0) {
      const bodyInterest = JSON.stringify({
        accepted: 1,
      });
      PatchWithTokenBody(
        `${API_URL}/interests/${interest.id}`,
        "PATCH",
        token,
        bodyInterest
      )
        .then((json) => json.json())
        .catch((error) => console.error(error));
      fetchUser();
      
      console.log("intérêt refusé !");
    }
  };




  return isLoading ? (
    <Loading />
  ) : (
    <Tabs style={{ backgroundColor: "white" }}>
      <TabScreen label="Experiences">
        <AllExperiences user={user} navigation={navigation}
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
        <UserProfileInfos
        user={user} 
        navigation={navigation} 
      
          />
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
            user.experiences.map(
              (experience) =>
                experience.archive == 0 && (
                  <View key={experience.id} style={styles.box}>
                    <TouchableOpacity
                      style={styles.blocExperience}
                      onPress={() => {
                        navigation.navigate("Experience", {
                          id: experience.id,
                        });
                      }}
                    >
                      <Image
                        style={styles.experiencePicture}
                        source={
                          { uri: experience.image } ??
                          require(`../../../assets/exemple_ville.jpeg`)
                        }
                      />
                      <View style={styles.blocText}>
                        <Text>
                          <Text style={{ fontWeight: "bold" }}>
                            {experience.title}
                          </Text>
                          <Text> | </Text>
                          <Text style={{ fontStyle: "italic" }}>
                            {experience.location}
                          </Text>
                        </Text>
                        <Text numberOfLines={3}>{experience.content}</Text>
                      </View>
                    </TouchableOpacity>
                    <View style={styles.blocActions}>
                      {experience && experience.visible == 1 && (
                        <TouchableOpacity
                          onPress={() => handleVisible(experience)}
                        >
                          <Image
                            style={{ width: 25, height: 25 }}
                            source={require("../../../assets/visible.png")}
                          />
                        </TouchableOpacity>
                      )}

                      {experience && experience.visible == 0 && (
                        <TouchableOpacity
                          onPress={() => handleVisible(experience)}
                        >
                          <Image
                            style={{ width: 25, height: 25 }}
                            source={require("../../../assets/invisible.png")}
                          />
                        </TouchableOpacity>
                      )}

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
                    </View>
                  </View>
                )
            )}
        </View>
      </ScrollView>
    </View>
  );
}

// TOUTES LES INTERACTIONS
function AllInteractions({ navigation, user }) {
  const goTo = useTabNavigation();
  const index = useTabIndex();
  

  return (
    <View style={styles.container}>
      <ScrollView>
        <View>
          {user.experiences &&
            user.experiences.map((experience) =>
              experience.interests.map((interest) => (
                <View style={styles.box} key={interest.id} >
              

                  <View style={styles.blocText}>
                   <Text>  <Text style={{ fontWeight: "bold" }}>{interest.title}</Text> |  <Text>{new Date(interest.date).toLocaleDateString()}</Text> </Text>
                   <Text>{interest.message}</Text>
                   <Text>{interest.user.telephone}</Text>
                  </View>

                  <View style={styles.blocActions}>
                    <TouchableOpacity
                      onPress={() => {
                        navigation.navigate("User", { id: interest.user.id });
                      }}
                    >
                      <Text>{interest.user.id}</Text>
                      <Avatar.Image
                        style={styles.avatar}
                        size={24}
                        color="white"
                        source={require("../../../assets/profil.png")}
                      />
                    </TouchableOpacity>

                    <View>
                      {interest.accepted == 0 && (
                        <InteractionStatusModal
                          key={interest}
                          interest={interest}
                        />
                       
                      )} 


                      {interest.accepted == 1 && (
                        <Image
                          style={{ width: 25, height: 25 }}
                          source={require("../../../assets/refused.png")}
                        />
                      )}

                      {interest.accepted == 2 && (
                        <Image
                          style={{ width: 25, height: 25 }}
                          source={require("../../../assets/accepted.png")}
                        />
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
function UserProfileInfos({ navigation, route }) {
  const goTo = useTabNavigation();
  const index = useTabIndex();
  const dispatch = useDispatch();
  const encodedBase64 = user?.avatar;
  const onLogOut = () => {
    dispatch(logOut());
  };
  const [userBiography, setUserBiography] = useState('');
  const [userLogin, setUserLogin] = useState('');
  const [userPassword, setUserPassword] = useState('');
  const [userPhone, setUserPhone] = useState('');
  const { token, idUser } = useSelector(authState);
  const [isLoading, setIsLoading] = useState(true);
  const [user, setUser] = useState(0);
  const[open, setOpen] = useState(false)

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
 
  const handleSubmitButtonBiography = () => {
    const body = JSON.stringify({
      "biography": userBiography
  });

  PatchWithTokenBody(`${API_URL}/users/${idUser}`, 'PATCH', token, body) 
  .then(json => { console.log(json); } ) 
  .catch((error) => {console.error("error" , error)})
  fetchUser();
  setOpen(false)
};


const handleSubmitButtonLogin = () => {
  const body = JSON.stringify({
    "login": userLogin
});

PatchWithTokenBody(`${API_URL}/users/${idUser}`, 'PATCH', token, body) 
.then(json => { console.log(json); } ) 
.catch((error) => {console.error("error" , error)})
fetchUser();
setOpen(false)
};

const handleSubmitButtonPassword = () => {
  const body = JSON.stringify({
    "password": userPassword
});

PatchWithTokenBody(`${API_URL}/users/${idUser}`, 'PATCH', token, body) 
.then(json => { console.log(json); } ) 
.catch((error) => {console.error("error" , error)})
fetchUser();
setOpen(false)
};


const handleSubmitButtonPhone = () => {
  const body = JSON.stringify({
    "telephone": userPhone
});

PatchWithTokenBody(`${API_URL}/users/${idUser}`, 'PATCH', token, body) 
.then(json => { console.log(json); } ) 
.catch((error) => {console.error("error" , error)})
fetchUser();
setOpen(false)
};




  return  isLoading ? (
      <Loading />
    ) :(
    <View style={styles.containerProfil}>
      
      <View style={styles.image}>

        <View style={styles.avatarProfil}>
          {user?.avatar ?( <Image style={styles.experiencePicture} source={{ uri: encodedBase64 }} /> ): (
            <Image style={styles.experiencePicture}  source={require("../../../assets/monkey.png")} />
          )}
            {/* <AvatarModal /> */}
        </View>

        <View style= {styles.infosProfil}>
            <Text style={styles.title}>{user.login} </Text>
            <TouchableOpacity onPress={ () => setOpen(true)}>
             <Image style={{ height: 15, width: 15 }} source={require("../../../assets/edit.png")} /> 
          </TouchableOpacity> 

       {open && <LoginModal handleSubmitButtonLogin = {handleSubmitButtonLogin} open = {open} setOpen= {setOpen} userLogin={userLogin} setUserLogin={setUserLogin} user={user}/>}
        </View>
       
    </View>
   
    <View style={styles.profil}>
      <Text style={{ color: "grey" }}>
        Membre depuis {new Date( user.created_at).toLocaleDateString("fr-FR", { month: "long", year: "numeric",})}
      </Text>
    </View>

    <Divider />

      <View style = {styles.bioprincipale}>
          <Text style={{fontWeight: 'bold', fontSize: 20 }}>A propos</Text>
          <View style={styles.biographie}>
          {user?.biography ? (
            <Text>{user?.biography}</Text>
          ) : (
            <Text style={{ color: "grey" }}> Pas encore de biographie</Text>
          )}
           <TouchableOpacity onPress={ () => setOpen(true)}>
             <Image style={{ height: 15, width: 15 }} source={require("../../../assets/edit.png")} /> 
          </TouchableOpacity> 

       {open && <BiographyModal handleSubmitButtonBiography = {handleSubmitButtonBiography} open = {open} setOpen= {setOpen} userBiography={userBiography} setUserBiography={setUserBiography} user={user}/>}
          
        </View>
    </View>

<View style = {styles.phonemdp}>
    <View style={styles.phone}>
      <Text style = {{fontWeight: 'bold', fontSize: 20 }}>Téléphone</Text>
      <View style = {{flexDirection: 'row'}}>
        <Text style={{ fontSize: 15 }}>{user.telephone}</Text>
        <TouchableOpacity onPress={ () => setOpen(true)}>
             <Image style={{ height: 15, width: 15 }} source={require("../../../assets/edit.png")} /> 
          </TouchableOpacity> 

       {open && <PhoneModal handleSubmitButtonPhone = {handleSubmitButtonPhone} open = {open} setOpen= {setOpen} userPhone={userPhone} setUserPhone={setUserPhone} user={user}/>}
          
      </View>
    </View>

    <View style={styles.mdp}>
        <Text style = {{fontWeight: 'bold', fontSize: 20 }}>Mot de passe</Text>
         <View style = {{flexDirection: 'row'}}>
            <Text style = {{fontWeight: 'bold' }}>.............</Text>
            <TouchableOpacity onPress={ () => setOpen(true)}>
             <Image style={{ height: 15, width: 15 }} source={require("../../../assets/edit.png")} /> 
          </TouchableOpacity> 

       {open && <PasswordModal handleSubmitButtonPassword = {handleSubmitButtonPassword} open = {open} setOpen= {setOpen} userPassword={userPassword} setUserPassword={setUserPassword} user={user}/>}
          
          </View>
          </View>  
  </View>

    <View style={styles.button}>
        <TouchableOpacity onPress={onLogOut} style={styles.deconnexion}>
           <Text style={{ color: "white", fontSize: 15, fontWeight: 'bold' }}>DÉCONNEXION</Text>
         </TouchableOpacity>
       </View>
  </View>
  )
}

//FRONT
const styles = StyleSheet.create({
  experiencePicture: {
    width: 72,
    height: 72,
    borderRadius: 10,
  },
  avatar: {
    backgroundColor: "white",
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
  blocText: {
    flex: 1,
    width: "100%",
    marginLeft: 10,
    marginRight: 10,
    flexDirection: "column",
    justifyContent: "space-around",
  },
  blocActions: {
    paddingLeft: 10,
    borderLeftWidth: 3,
    borderLeftColor: "#f14d53",
    justifyContent: "space-around",
  },

  container: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "space-around",
    alignContent: "center",
    backgroundColor: "#f2f2f2",
  
  },

  containerProfil: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "space-around",
    alignContent: "center",
    backgroundColor: "#f2f2f2",

  },

  actionsProfil: {
    flex: 0.1,
    flexDirection: "row",
    justifyContent: "center",
    padding: 30,
  },

  avatarProfil: {
    justifyContent: "center",
    alignItems: "center",
    opacity: 1,
    flexDirection: 'row'
  },

  infosProfil: {
    flexDirection: "row",
    alignItems: "center",
  },

  deconnexion: {
    backgroundColor: "#F14D53",
    justifyContent: "center",
    alignItems: "center",
    padding: 5,
    fontSize: 15,
  },

  bioprincipale:{
    flexDirection: 'column',
    justifyContent: "center",
    alignItems: "center",
  },

  biographie: {
    flexDirection: "row",
    marginTop: 10,
  },

  login: {
    flexDirection: "row",
  },

  phone: {
    flexDirection: "column",
    paddingRight: 100,
    alignItems: "flex-start",
  },

  mdp: {
    flexDirection: "column",
    alignItems: "flex-end",
  },

  image: {
    flex: 0.3,
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    fontWeight: "bold",
    fontWeight: 'bold', 
    fontSize: 20,
  },
  profil: { 
    flexDirection: "column", 
  marginBottom: 5,
  alignItems: "center",
  justifyContent: "center",
 },

 phonemdp:{
  flexDirection: "row", 
  marginBottom: 5,
  alignItems: "center",
  justifyContent: "space-around",
 },


  button: {
    color: "#f14d53",
    padding: 10,
    marginTop: 10,
    marginBottom: 10,
    // borderWidth: 2,
    borderColor: "#f14d53",
    borderRadius: 40,
    // width: "fit-content",
  },

});

export default Profile;
