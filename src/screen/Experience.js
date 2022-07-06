import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  ScrollView,
  Text,
  View,
  Modal,
  Image,
  TouchableOpacity,
  TextInput,
} from "react-native";
import { Divider, Avatar } from "react-native-paper";
import { genericFetchWithToken } from "../api/fetchApiWithToken";
import { genericFetchWithTokenBody } from "../api/fetchApiWithTokenBody";
import { PatchWithTokenBody } from "../api/fetchApiWithTokenBody";
import { API_URL } from "@env";
import { authState } from "../store/auth/selectors";
import { useSelector } from "react-redux";
import Loading from "../components/Loading";
import Bucket from "../components/Bucket";
import Now from "../components/Now";
import ModalMessage from "../components/ModalMessage";
import TitleModal from "../components/event/TitleModal";
import DureeModal from "../components/event/DureeModal";
import SpotsModal from "../components/event/SpotsModal";
import ContentModal from "../components/event/ContentModal";
import LieuModal from "../components/event/LieuModal";
import ImageModal from "../components/event/ImageModal";
import moment from "moment";

const Experience = ({ route, navigation }) => {
  const [isLoading, setIsLoading] = useState(true);
  const { token, idUser } = useSelector(authState);
  const [experience, setExperience] = useState([]);
  const [liked, setLiked] = useState(false);
  const [superLiked, setSuperLiked] = useState(false);
  const [interestId, setInterestId] = useState(0);
  const [modalVisible, setModalVisible] = useState(false);
  const [modalType, setModalType] = useState("");
  const [formOpen, setFormOpen] = useState(false);
  const [content, setContent] = useState("");
  const [editableModal, setEditableModal] = useState(false);
  const [title, setTitle] = useState("");
  const [location, setLocation] = useState("");
  const [openTitle, setOpenTitle] = useState(false);
  const [openContent, setOpenContent] = useState(false);
  const [openLieu, setOpenLieu] = useState(false);

  const fetchExperience = () => {
    genericFetchWithToken(
      `${API_URL}/experiences/${route.params.id}`,
      "GET",
      token
    )
      .then((json) => json.json())
      .then((data) => setExperience(data))
      .catch((error) => console.error(error))
      .finally(() => setIsLoading(false));
  };

  useEffect(() => {
    setIsLoading(true);
    fetchExperience();
  }, []);

  useEffect(() => {
    experience &&
      experience?.interests &&
      experience.interests.map(function (interest) {
        //set interest id and liked if it exists
        if (interest.user == `/api/users/${idUser}`) {
          if (interest.plan === false || interest.plan === 0) {
            setLiked(true);
          }
          if (interest.plan === true || interest.plan === 1) {
            setSuperLiked(true);
          }
          setInterestId(interest.id);
        } else {
          console.log(interest.user, idUser);
        }
      });
  }, [experience]);

  const handleLike = (experience) => {
    if (superLiked === true) {
      setModalVisible(true);
      setModalType("stop");
      setTimeout(() => {
        setModalVisible(false);
      }, 3000);
      return true;
    }

    if (superLiked === false) {
      if (experience.user.id != idUser) {
        //if not your own experience
        if (liked === false) {
          const bodyInterest = JSON.stringify({
            plan: false,
            experience: `api/experiences/${experience.id}`,
          });
          genericFetchWithTokenBody(
            `${API_URL}/interests`,
            "POST",
            token,
            bodyInterest
          )
            .then((json) => json.json())
            .then((data) => {
              setInterestId(data.id),
                console.log(
                  `liked ${experience.id} - interest ${data.id} created - by user ${idUser}`
                );
            })
            .catch((error) => console.error(error));
          setModalVisible(true);
          setModalType("liked");
          setTimeout(() => {
            setModalVisible(false);
          }, 2000);
          setLiked(true);
        }
        if (liked === true) {
          genericFetchWithToken(
            `${API_URL}/interests/${interestId}`,
            "DELETE",
            token
          ),
            console.log(
              `unliked ${experience.id} - interest ${interestId} deleted - by user ${idUser}`
            ),
            setLiked(false),
            setModalVisible(true),
            setModalType("unliked"),
            setTimeout(() => {
              setModalVisible(false);
            }, 1000);
        }
      } else {
        console.log("Cannot like your own experiences");
        setModalVisible(true);
        setModalType("error");
        setTimeout(() => {
          setModalVisible(false);
        }, 2000);
      }
    }
  };

  const handleSuperLike = (experience) => {
    if (superLiked === false) {
      if (experience.user.id != idUser) {
        //if not your own experience
        setFormOpen(true);
      } else {
        console.log("Cannot like your own experiences");
        setModalVisible(true);
        setTimeout(() => {
          setModalVisible(false);
        }, 4000);
      }
    } else {
      setModalVisible(true);
      setModalType("unsuperlike");
      setTimeout(() => {
        setModalVisible(false);
      }, 3000);
      console.log(`Experience Now can't be deleted so easily`);
    }
  };

  const submitSuperLike = () => {
    console.log(content);
    if (superLiked === false) {
      if (experience.user.id != idUser) {
        //if not your own experience

        if (content.length === 0) {
          setModalVisible(true);
          setModalType("missing");
          setTimeout(() => {
            setModalVisible(false);
          }, 2000);
        }

        if (content.length != 0) {
          const bodyInterest = JSON.stringify({
            plan: true,
            experience: `api/experiences/${experience.id}`,
            title: experience.title,
            message: content,
          });
          if (liked === false) {
            genericFetchWithTokenBody(
              `${API_URL}/interests`,
              "POST",
              token,
              bodyInterest
            )
              .then((json) => json.json())
              .then((data) => {
                setInterestId(data.id),
                  console.log(
                    `superliked ${experience.id} - interest ${data.id} created - by user ${idUser}`
                  );
              })
              .catch((error) => console.error(error));
          }
          if (liked === true) {
            PatchWithTokenBody(
              `${API_URL}/interests/${interestId}`,
              "PATCH",
              token,
              bodyInterest
            )
              .then((json) => json.json())
              .then((data) => {
                setInterestId(data.id),
                  console.log(
                    `superliked ${experience.id} - interest ${data.id} created - by user ${idUser}`
                  );
              })
              .catch((error) => console.error(error));
          }
          setModalVisible(true);
          setModalType("superliked");
          setTimeout(() => {
            setModalVisible(false);
          }, 2000);
          setSuperLiked(true);
          setFormOpen(false);
        }
      } else {
        console.log("Cannot like your own experiences");
        setModalVisible(true);
        setTimeout(() => {
          setModalVisible(false);
        }, 4000);
      }
    }
  };

  useEffect(() => {
    console.log(experience?.user?.id);

    experience &&
      experience?.user?.id === idUser &&
      setEditableModal(true) &&
      fetchExperience() &&
      console.log("hello");
  }, [experience]);

  const handleSubmitButtonTitle = () => {
    
    const body = JSON.stringify({
      "title": title
    })
    PatchWithTokenBody(`${API_URL}/experiences/${experience.id}`, 'PATCH', token, body) 
    .then(json => { console.log(json); } ) 
    .catch((error) => {console.error("error" , error)})
    fetchExperience();
    setOpenTitle(false)
};

const handleSubmitButtonContent = () => {
    
  const body = JSON.stringify({
    "content": content
  })
  PatchWithTokenBody(`${API_URL}/experiences/${experience.id}`, 'PATCH', token, body) 
  .then(json => { console.log(json); } ) 
  .catch((error) => {console.error("error" , error)})
  fetchExperience();
  setOpenContent(false)
};

const handleSubmitButtonLieu = () => {
    
  const body = JSON.stringify({
    "location": location
  })
  PatchWithTokenBody(`${API_URL}/experiences/${experience.id}`, 'PATCH', token, body) 
  .then(json => { console.log(json); } ) 
  .catch((error) => {console.error("error" , error)})
  fetchExperience();
  setOpenLieu(false)
};



  // console.log("image", experience.image);
  const encodedBase64 = experience?.image;
  const avatar = experience?.user?.avatar;

  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      {isLoading ? (
        <Loading />
      ) : (
        experience.user && (
          <ScrollView>
            <View style={styles.views}>
              <Image
                style={styles.experiencePicture}
                source={
                  { uri: encodedBase64 } ??
                  require(`../../assets/exemple_ville.jpeg`)
                }
              />
              {editableModal && <ImageModal experience={experience} />}
            </View>

            <View style={styles.views}>
              <View
                style={{
                  flex: 0.25,
                  alignItems: "center",
                  justifyContent: "space-between",
                  flexDirection: "row",
                }}
              >
              
                  <Text style={styles.title}>{experience.title}</Text>
                  {experience &&
                  experience?.user?.id === idUser &&
                  <View>
                  <TouchableOpacity onPress={ () => setOpenTitle(true)}>
                  <Image style={{ height: 10, width: 10 }}source={require("../../assets/edit.png")} /> 
                </TouchableOpacity> 
                      {openTitle && <TitleModal handleSubmitButtonTitle = {handleSubmitButtonTitle} openTitle= {openTitle} setOpenTitle= {setOpenTitle} title={title} setTitle={setTitle} experience={experience}/>}
                  </View>
                  }
               
            
          

                <View style={styles.blocActions}>
                  <TouchableOpacity
                    onPress={() => {
                      handleLike(experience);
                    }}
                  >
                    <Bucket liked={liked && !superLiked} />
                  </TouchableOpacity>
                  <TouchableOpacity onPress={() => handleSuperLike(experience)}>
                    <Now liked={superLiked} />
                  </TouchableOpacity>
                </View>
              </View>
              <View>

              <View style={{flexDirection:'row'}}>
                      <Text>{experience.location}</Text>
                      {experience &&
                      experience?.user?.id === idUser &&
                      <View>
                      <TouchableOpacity onPress={ () => setOpenLieu(true)}>
                          <Image style={{ height: 10, width: 10 }} source={require("../../assets/edit.png")} /> 
                      </TouchableOpacity> 

                    {openLieu && <LieuModal handleSubmitButtonLieu = {handleSubmitButtonLieu} openLieu= {openLieu} setOpenLieu= {setOpenLieu} location={location} setLocation={setLocation} experience={experience}/>}
            </View>
                      }
                </View>

                <Text>
                  {moment(new Date(experience.created_at)).format("D/MM/YYYY")}
                </Text>
              </View>
            </View>

            <Divider />
            <View style={styles.views}>
              <TouchableOpacity
                onPress={() => {
                  navigation.navigate("User", {
                    id: experience.user.id,
                    name: experience.user.login,
                  });
                }}
              >
                <View style={{ flew: 1, flexDirection: "row" }}>
                  <Avatar.Image
                    style={styles.avatar}
                    size={24}
                    color="white"
                    source={
                      { uri: avatar } ?? require("../../assets/profil.png")
                    }
                  />
                  <Text style={{ marginLeft: 3 }}>{experience.user.login}</Text>
                </View>
              </TouchableOpacity>
              <Text>{experience.reviews.length} commentaire.s</Text>

            <View style={{flexDirection:'row'}}>
              <Text>durée : {experience.duration} </Text>
              {editableModal && <DureeModal experience={experience} fetchExperience={fetchExperience}/>}
            </View>

            <View style={{flexDirection:'row'}}>
                <Text>{experience.spots} place(s)</Text>
                {editableModal && <SpotsModal experience={experience}  fetchExperience={fetchExperience}/>}
            </View>
             
            </View>
            <Divider />
            <View style={styles.views}>

              <View style={{flexDirection:'row'}}>
                  <Text
                    style={{
                      fontSize: 12,
                      textAlign: "justify",
                      paddingBottom: 10,
                    }}
                  >
                    {experience.content}
                  </Text>

                    {experience &&
                      experience?.user?.id === idUser &&
                  <View>
                    <TouchableOpacity onPress={ () => setOpenContent(true)}>
                        <Image style={{ height: 10, width: 10 }} source={require("../../assets/edit.png")} /> 
                    </TouchableOpacity> 

                    {openContent && <ContentModal handleSubmitButtonContent = {handleSubmitButtonContent} openContent= {openContent} setOpenContent= {setOpenContent} content={content} setContent={setContent} experience={experience}/>}
                  </View>
                      }
              </View>
              <Divider />
            </View>

            <Modal
              presentationStyle="overFullScreen"
              animationType="fade"
              transparent={true}
              visible={formOpen}
            >
              <View style={styles.container}>
                <View style={styles.modalView}>
                  <TouchableOpacity onPress={() => setFormOpen(false)}>
                    <Image
                      style={styles.close}
                      source={require(`../../assets/icons/close.png`)}
                    />
                  </TouchableOpacity>
                  <View style={styles.image}>
                    <Image
                      style={styles.icon}
                      source={require(`../../assets/icons/bird.gif`)}
                    />
                  </View>
                  <View style={styles.text}>
                    <Text style={{ fontWeight: "bold", paddingBottom: 5 }}>
                      Ecris au Local Buddy
                    </Text>
                    <TextInput
                      placeholder="Salut ! Je serai de passage dans ton coin du xx au xx, j'aimerais beaucoup participer à ton expérience..."
                      style={styles.input}
                      value={content}
                      onChangeText={(newText) => setContent(newText)}
                      numberOfLines={6}
                      multiline
                      editable
                    />
                    <TouchableOpacity
                      style={styles.buttonStyle}
                      onPress={() => submitSuperLike()}
                    >
                      <Text style={{ color: "#FFFFFF" }}>ENVOYER</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
            </Modal>

            {modalVisible && modalType && (
              <ModalMessage modalType={modalType} />
            )}
          </ScrollView>
        )
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  experiencePicture: {
    flex: 1,
    height: 300,
    width: 300,
    resizeMode: "cover",
  },
  title: {
    flex: 1,
    flexWrap: "wrap",
    fontSize: 30,
    fontWeight: "bold",
  },
  avatar: {
    backgroundColor: "white",
  },
  blocActions: {
    marginLeft: 10,
    paddingLeft: 10,
    borderLeftWidth: 3,
    borderLeftColor: "#f14d53",
    flexDirection: "row",
    alignItems: "center",
  },
  views: {
    padding: 10,
    flex: 0.5,
    justifyContent: "space-around",
  },
  container: {
    flex: 1,
    justifyContent: "center",
    alignContent: "center",
    backgroundColor: "rgba(0,0,0,0.7)",
  },
  modalView: {
    margin: 20,
    marginLeft: 10,
    marginRight: 10,
    borderRadius: 10,
    justifyContent: "center",
    alignContent: "center",
    elevation: 5,
    alignSelf: "center",
    textAlign: "center",
    backgroundColor: "white",
  },
  image: {
    padding: 20,
  },
  close: {
    alignSelf: "flex-end",
    height: 24,
    width: 24,
    margin: 5,
  },
  icon: {
    width: 72,
    height: 72,
    alignSelf: "center",
    marginBottom: 10,
  },
  text: {
    backgroundColor: "#f2f2f2",
    padding: 15,
    borderRadius: 10,
  },
  input: {
    padding: 10,
    marginTop: 10,
    marginBottom: 10,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: "rgba(0,0,0,0.3)",
  },
  buttonStyle: {
    backgroundColor: "#f14d53",
    height: 40,
    alignItems: "center",
    borderRadius: 30,
    justifyContent: "center",
  },
});

export default Experience;
