import React, { useEffect, useState, createRef} from 'react';
import { StyleSheet, TextInput, View, Text, ScrollView, Image, Keyboard, TouchableOpacity, KeyboardAvoidingView, Pressable, Modal, Alert} from 'react-native';
import SelectDropdown from "react-native-select-dropdown";
import * as ImagePicker from "expo-image-picker";
import { API_URL } from "@env" ;
import { authState } from "../../store/auth/selectors";
import { useDispatch, useSelector } from "react-redux";
import { genericFetchWithToken } from '../../api/fetchApiWithToken';
import {PatchWithTokenBody} from '../../api/fetchApiWithTokenBody';
// import { Avatar } from "react-native-paper";



function AvatarChoice ({navigation}) {
    const [modalVisible, setModalVisible] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const [user, setUser] = useState(0);
    const [avatars, setAvatars] = useState(null);
    const { token, idUser } = useSelector(authState);

    const fetchAvatars = () => {
        genericFetchWithToken(`${API_URL}/avatars`, 'GET', token)
        .then(json => json.json())
        .then(data => setAvatars(data))
        .catch(error => console.error(error))
        .finally(() => setIsLoading(false));
        console.log('hhhhhhhhhhh')
       
      }
    
    useEffect(() => {
        setIsLoading(true);
        fetchAvatars()
    }, [token])

  
  
    return isLoading ? (
        <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
          <Text> Loading ... </Text>{" "}
        </View>
      ) : (
      <View>
  
  
  {avatars &&
            avatars?.map((avatar) => {
                const encodedBase64 = avatar.image
                return (
              
                 
                 
           <View style={styles.avatarProfil} key={avatar.id}>
                <Image style={{   width: 72, height: 72, borderRadius: 10, opacity: 1,}} source={{ uri: encodedBase64 } || require('../../../assets/visible.png')}  />
                <Text>{avatar.id}</Text>
        </View>
              
   ) })}
    
      </View>
    );
  };
  
  const styles = StyleSheet.create({
    experiencePicture: {
      width: 72,
      height: 72,
      borderRadius: 10,
        opacity: 1,
    },

    avatarProfil: {
        flex: 0.2,
        justifyContent: "center",
        alignItems: "center",
        opacity: 1,
      },
    

 
  });
  
  export default AvatarChoice;
  