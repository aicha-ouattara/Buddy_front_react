import React, { useState, useEffect } from "react";
import { StyleSheet, View, Text, Modal, Image, TouchableOpacity, TextInput } from "react-native";

const AvatarModal = ({ handleSubmitButtonAvatar, openAvatar, setOpenAvatar, avatar, setAvatar, user, avatars, setAvatars }) => {



  return (
    <Modal
    presentationStyle="overFullScreen"
    animationType="fade"
    transparent={true}
    visible={openAvatar}
  >
    <View style={styles.container}>
      <View >
      <TouchableOpacity onPress={() => setOpenAvatar(false)}>
                  <Image
                    style={styles.close}
                    source={require(`../../../assets/icons/close.png`)}
                  />
                </TouchableOpacity>
              
                <View style={styles.text}>
                  <Text style={{ fontWeight: "bold", paddingBottom: 5 }}>
                    Change ton avatar !
                  </Text>
                      <View style={{ flexDirection: 'row', alignItems: "center", justifyContent: "space-around"  }}>
                          {avatars &&
                            avatars.map((avatar) => {
                         
                              
                              return (
                                <View style={styles.container} key={avatar.id}>
                                  <View style={styles.modalView}>
                                    <TouchableOpacity onPress={() => setAvatar(avatar.image)}>
                                      <Image
                                        style={{ width: 72, height: 72,}}
                                        source={{ uri: avatar.image }}
                                      />
                                    </TouchableOpacity>
                                  </View>
                                </View>
                              );
                            })}
                      </View>
                  <TouchableOpacity
                    style={styles.buttonStyle}
                    onPress={() => handleSubmitButtonAvatar()}
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

  buttonStyle: {
    backgroundColor: "#f14d53",
    height: 40,
    alignItems: "center",
    borderRadius: 30,
    justifyContent: "center",
  },

 avatarProfil: {
    width: 72,
    height: 72,
    borderRadius: 10,
    marginRight: 500,
  },
});
