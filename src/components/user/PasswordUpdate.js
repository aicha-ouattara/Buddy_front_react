import React, { useEffect, useState, createRef} from 'react';
import { StyleSheet, TextInput, View, Text, ScrollView, Image, Keyboard, TouchableOpacity, KeyboardAvoidingView} from 'react-native';
import { API_URL } from "@env" ;
import { authState } from "../../store/auth/selectors";
import { useDispatch, useSelector } from "react-redux";
import { genericFetchWithToken } from '../../api/fetchApiWithToken';

import {PatchWithTokenBody} from '../../api/fetchApiWithTokenBody';

function PasswordUpdate({navigation}) {
    const [isLoading, setIsLoading] = useState(false);
    const [user, setUser] = useState(0);
    const { token, idUser } = useSelector(authState);
    const [userPassword, setUserPassword] = useState("");
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
                "password": userPassword
            })
     
            PatchWithTokenBody(`${API_URL}/users/${idUser}`, 'PATCH', token, body)
            .then(json => { console.log(json); } ) 
            .catch((error) => {console.error("error" , error)})
            fetchUser();
            console.log('ok')
      

        console.log('hh')
    
    }
    
return (
    <View style={styles.mainBody}>
   
    {isLoading ? <Text> Loading ... </Text> : 
        (
        
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
              onChangeText={(UserPassword) => setUserPassword(UserPassword)}
              underlineColorAndroid="#f000"
              placeholder={user.password}
              placeholderTextColor="white"
              returnKeyType="next"
              secureTextEntry={true}
              blurOnSubmit={false}
            />
    </View>
    {errortext != "" && (
              <Text style={styles.errorTextStyle}>{errortext}</Text>
            )}
        <TouchableOpacity
            style={styles.buttonStyle}
            activeOpacity={0.5}
            onPress={handleSubmitButton}>
            <Text style={styles.buttonTextStyle}>MODIFIER</Text>
        </TouchableOpacity>
    </KeyboardAvoidingView>
    </ScrollView>
     </Text> )
    
    
      )}
</View>
);
};
export default PasswordUpdate

const styles = StyleSheet.create({

    mainBody: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: "#A3DEF8",
    alignContent: 'center',
    borderBottomEndRadius: 20,
    borderBottomStartRadius: 20,
},

SectionStyle: {
    flexDirection: 'row',
    height: 40,
    marginTop: 20,
    marginLeft: 35,
    marginRight: 35,
    margin: 10,
},

buttonStyle: {
    backgroundColor: 'black',
    borderWidth: 0,
    color: '#FFFFFF',
    borderColor: 'white',
    height: 40,
    alignItems: 'center',
    borderRadius: 30,
    marginLeft: 35,
    marginRight: 35,
    marginTop: 20,
    marginBottom: 20,
},

buttonTextStyle: {
    color: '#FFFFFF',
    paddingVertical: 10,
    fontSize: 16,
},

inputStyle: {
    flex: 1,
    color: 'black',
    paddingLeft: 15,
    paddingRight: 15,
    borderWidth: 1,
    borderRadius: 30,
    borderColor: 'black',
},


successTextStyle: {
    color: 'white',
    textAlign: 'center',
    fontSize: 18,
    padding: 30,
},
});
