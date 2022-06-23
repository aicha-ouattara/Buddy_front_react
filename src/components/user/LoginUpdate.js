import React, { useEffect, useState, createRef} from 'react';
import { StyleSheet, TextInput, View, Text, ScrollView, Image, Keyboard, TouchableOpacity, KeyboardAvoidingView} from 'react-native';
import { API_URL } from "@env" ;
import { authState } from "../../store/auth/selectors";
import { useDispatch, useSelector } from "react-redux";
import { genericFetchWithToken } from '../../api/fetchApiWithToken';
import Loading from "../../components/Loading";
import {PatchWithTokenBody} from '../../api/fetchApiWithTokenBody';

function UpdateLogin({navigation}) {
    const [isLoading, setIsLoading] = useState(false);
    const [user, setUser] = useState(0);
    const { token, idUser } = useSelector(authState);
    const [userLogin, setUserLogin] = useState("");
    const [errortext, setErrortext] = useState("");
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
    
    const handleSubmitButton = () => {
            
            const body = JSON.stringify({
                "login": userLogin
            })
     
            PatchWithTokenBody(`${API_URL}/users/${idUser}`, 'PATCH', token, body)
            .then(json => { console.log(json); } ) 
            .catch((error) => {console.error("error" , error)})
            fetchUser();
            console.log('ok')
      

        console.log('hh')
    
    }
    
return (
    <View style={styles.container}>
   
   return isLoading ? (
    <View style={{ padding: 10 }}>
      <Loading />
    </View>
  ) : (
      <View>
        
        user && ( 
            <Text key={user.id}>

        <ScrollView
            keyboardShouldPersistTaps="handled"
            contentContainerStyle={{
            justifyContent: 'center',
            alignContent: 'center',
            }}>
    <KeyboardAvoidingView enabled>

    <View style={styles.SectionStyle}>
         
        <TextInput
            style={styles.inputStyle}
            onChangeText={(UserLogin) => setUserLogin(UserLogin)}
            underlineColorAndroid="#f000"
            placeholder={user.login}
            placeholderTextColor="black"
            autoCapitalize="sentences"
            returnKeyType="next"
            onSubmitEditing={Keyboard.dismiss}
            blurOnSubmit={false}
        />
    </View>
  
        <TouchableOpacity
            style={styles.buttonStyle}
            activeOpacity={0.5}
            onPress={handleSubmitButton}>
            <Text style={styles.buttonTextStyle}>MODIFIER</Text>
        </TouchableOpacity>
    </KeyboardAvoidingView>
    </ScrollView>
     </Text> )
    
     </View>
      )
</View>
);
};
export default UpdateLogin

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
        flex: 0.7,
        justifyContent: "center",
        alignContent: "space-around",
        backgroundColor: "rgba(0,0,0,0.3)",
        paddingTop: 20,
        paddingLeft: 5,
    
      },
    
      modalView: {
        margin: 20,
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
        borderColor: "rgba(0,0,0,0.1)",
      },
    
      buttonStyle: {
        backgroundColor: "#f14d53",
        height: 40,
        alignItems: "center",
       padding: 10,
        justifyContent: "center",
        marginTop: 70,
      },
    
});
