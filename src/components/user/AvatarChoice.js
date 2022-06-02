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
    const [avatar, setAvatar] = useState('');
    const { token, idUser } = useSelector(authState);

    const fetchAvatars = () => {
        genericFetchWithToken(`${API_URL}/avatars`, 'GET', token)
        .then(json => json.json())
        .then(data => setAvatars(data))
        .catch(error => console.error(error))
        .finally(() => setIsLoading(false));
       
      }
    
    useEffect(() => {
        setIsLoading(true);
        fetchAvatars()
    }, [token])


    const fetchUser = () => {
      genericFetchWithToken(`${API_URL}/users/${idUser}`, 'GET', token)
        .then(json => json.json())
        .then(data => setUser(data))
        .catch(error => console.error(error))
  
    }
  
    useEffect(() => {
  
      fetchUser();
    }, [])

    const handleSubmitButton = () => {
    
      const body = JSON.stringify({
        "avatar": avatar
      })
      
      PatchWithTokenBody(`${API_URL}/users/${idUser}`, 'PATCH', token, body) 
      .then(json => { console.log(json); } ) 
      .catch((error) => {console.error("error" , error)})
      fetchUser();
      console.log('ok')
  
  console.log('hh')
      
  
  };
  
  
  
    return isLoading ? (
        <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
          <Text> Loading ... </Text>{" "}
        </View>
      ) : (
      <View style = {{flex: 1}} >
  
  
  {avatars &&
            avatars.map((avatar) => {
                const encodedBase64 = avatar.image
                return (
              
                 
    <View style={styles.container} key={avatar.id}>  
        <View style={styles.avatarProfil} >
          <TouchableOpacity onPress={() => setAvatar(avatar.image)}>
             <Image style={styles.experiencePicture} source={{ uri: encodedBase64 }}  />
            
            
          </TouchableOpacity>
           
        
        </View>
    </View>      
   ) })}
      <TouchableOpacity
            style={styles.buttonStyle}
            activeOpacity={0.5}
            onPress={handleSubmitButton}>
            <Text style={styles.buttonTextStyle}>MODIFIER</Text>
        </TouchableOpacity>
      </View>
    );
  };
  
  const styles = StyleSheet.create({
    experiencePicture: {
      
        height: 64,
        width: 64,
        resizeMode: "cover",
        opacity: 1,
    },

    avatarProfil: {
       
        justifyContent: "center",
        alignItems: "center",
         opacity: 'none',
      },

 
  });
  
  export default AvatarChoice;
  