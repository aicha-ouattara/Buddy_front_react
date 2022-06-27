import React, { useState, useEffect } from "react";
import { StyleSheet, View, Text, Modal, Image, TouchableOpacity, TextInput } from "react-native";

const AvatarModal = ({ handleSubmitButtonLogin, open, setOpen, userLogin, setUserLogin, user }) => {
  const [avatars, setAvatars] = useState(null);
  const fetchAvatars = () => {
    genericFetchWithToken(`${API_URL}/avatars`, "GET", token)
      .then((json) => json.json())
      .then((data) => setAvatars(data))
      .catch((error) => console.error(error))
      .finally(() => setIsLoading(false));
  };
  useEffect(() => {
    setIsLoading(true);
    fetchAvatars();
  }, [token]);

  return (
    <Modal
    presentationStyle="overFullScreen"
    animationType="fade"
    transparent={true}
    visible={open}
  >
    <View style={styles.container}>
      <View style={styles.modalView}>
      <TouchableOpacity onPress={() => setOpen(false)}>
                  <Image
                    style={styles.close}
                    source={require(`../../../assets/icons/close.png`)}
                  />
                </TouchableOpacity>
              
                <View style={styles.text}>
                  <Text style={{ fontWeight: "bold", paddingBottom: 5 }}>
                    Ecris au Local Buddy
                  </Text>
                      <View style={{ flexDirection: 'row', alignItems: "center", justifyContent: "space-around"  }}>
                          {avatars &&
                            avatars.map((avatar) => {
                              const encodedBase64 = avatar.image;
                              return (
                                <View style={styles.container} key={avatar.id}>
                                  <View style={styles.avatarProfil}>
                                    <TouchableOpacity onPress={() => setAvatar(avatar.image)}>
                                      <Image
                                        style={styles.experiencePicture}
                                        source={{ uri: encodedBase64 }}
                                      />
                                    </TouchableOpacity>
                                  </View>
                                </View>
                              );
                            })}
                      </View>
                  <TouchableOpacity
                    style={styles.buttonStyle}
                    onPress={() => handleSubmitButtonLogin()}
                  >
                    <Text style={{ color: "#FFFFFF" }}>ENVOYER</Text>
                  </TouchableOpacity>
                </View>
       
      </View>
    </View>
  </Modal>
  );
};

export default AvatarModal;

const styles = StyleSheet.create({
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
});
