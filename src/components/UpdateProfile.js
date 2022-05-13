import React, { useEffect, useState, createRef} from 'react';
import { StyleSheet, TextInput, View, Text, ScrollView, Image, Keyboard, TouchableOpacity, KeyboardAvoidingView} from 'react-native';
import { API_URL } from "@env" ;
import { authState } from "../store/auth/selectors";
import { useDispatch, useSelector } from "react-redux";
import { genericFetchWithToken } from '../api/fetchApiWithToken';
import {genericFetchWithTokenBody} from '../api/fetchApiWithTokenBody'

function UpdateProfile({navigation}) {
    const [isLoading, setIsLoading] = useState(true);
    const [user, setUser] = useState(0);
    const { token, idUser } = useSelector(authState);

    const [userFirstName, setUserFirstName] = useState('');
    const [userLastName, setUserLastName] = useState('');
    const [userEmail, setUserEmail] = useState('');
    const [userPhone, setUserPhone] = useState(0);
    const [userLogin, setUserLogin] = useState('');
    const [userPassword, setUserPassword] = useState('');
    const [errortext, setErrortext] = useState('');
    const [message, setMessage] = useState("");

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
    
    

    const [isUpdateSuccess, setIsUpdateSuccess] = useState(false);

    const handleSubmitButton = () => {
        //console.log(typeof userPhone);
        setErrortext('');
       
        // don't remember from where i copied this code, but this works.
    let re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    
     if ( re.test(userEmail) ) {
        const body = JSON.stringify({
        "login": userLogin,
        "password": userPassword,
        "firstname": userFirstName,
        "lastname": userLastName,
        "email": userEmail,
        "telephone": parseInt(userPhone),
     })    
 
    
        genericFetchWithTokenBody(`${API_URL}/users/${idUser}`, 'PATCH', token, body) 
        .then(json => {
        console.log(json);
        fetchUser();
        }, [])
        
    
        .catch((error) => {
        console.error("error" , error);
      
        });
        console.log('ok')
         }

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
            onChangeText={(UserLogin) => setUserLogin(UserLogin)}
            keepDefaultValues={user.login}
            underlineColorAndroid="#f000"
            placeholder={user.login}
            placeholderTextColor="#8b9cb5"
            autoCapitalize="sentences"
            returnKeyType="next"
            onSubmitEditing={Keyboard.dismiss}
            blurOnSubmit={false}
        />
    </View>

    <View style={styles.SectionStyle}>
        <TextInput
            style={styles.inputStyle}
            onChangeText={(UserFirstName) => setUserFirstName(UserFirstName)}
            keepDefaultValues={user.firstname}
            underlineColorAndroid="#f000"
            placeholder={user.firstname}
            placeholderTextColor="#8b9cb5"
            autoCapitalize="sentences"
            returnKeyType="next"
            blurOnSubmit={false}
        />
    </View>

        <View style={styles.SectionStyle}>
            <TextInput
                style={styles.inputStyle}
                onChangeText={(UserLastName) => setUserLastName(UserLastName)}
                keepDefaultValues={user.lastname}
                underlineColorAndroid="#f000"
                placeholder={user.lastname}
                placeholderTextColor="#8b9cb5"
                autoCapitalize="sentences"
                returnKeyType="next"
                blurOnSubmit={false}
            />
        </View>

        <View style={styles.SectionStyle}>
            <TextInput

                style={styles.inputStyle}
                onChangeText={(UserEmail) => setUserEmail(UserEmail)}
                underlineColorAndroid="#f000"
                keepDefaultValues={user.email}
                placeholder={user.email}
                placeholderTextColor="#8b9cb5"
                keyboardType="email-address"
                returnKeyType="next"
                blurOnSubmit={false}
            />
        </View>

        <View style={styles.SectionStyle}>
            <TextInput
                style={styles.inputStyle}
                onChangeText={(UserPassword) =>
                setUserPassword(UserPassword)
                }
                underlineColorAndroid="#f000"
                defaultValue={user.password}
                placeholder="Enter Password"
                placeholderTextColor="#8b9cb5"
                returnKeyType="next"
                secureTextEntry={true}
                blurOnSubmit={false}
            />
        </View>

        <View style={styles.SectionStyle}>
            <TextInput
                style={styles.inputStyle}
                onChangeText={(UserPhone) => setUserPhone(UserPhone)}
                underlineColorAndroid="#f000"
                keepDefaultValues={user.telephone}
                placeholder={user.telephone}
                placeholderTextColor="#8b9cb5"
                keyboardType="numeric"
                returnKeyType="next"
                blurOnSubmit={false}
            />
        </View>

        {errortext != '' ? (
            <Text style={styles.errorTextStyle}>
            {errortext}
            </Text>
        ) : null}

        <TouchableOpacity
            style={styles.buttonStyle}
            activeOpacity={0.5}
            onPress={handleSubmitButton}>
            <Text style={styles.buttonTextStyle}>UPDATE</Text>
        </TouchableOpacity>
    </KeyboardAvoidingView>
    </ScrollView>
     </Text> )
    
    
      )}
</View>
);
};
export default UpdateProfile

const styles = StyleSheet.create({
mainBody: {
flex: 1,
justifyContent: 'center',
backgroundColor: '#307ecc',
alignContent: 'center',
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
borderColor: 'black',
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
color: 'white',
paddingLeft: 15,
paddingRight: 15,
borderWidth: 1,
borderRadius: 30,
borderColor: '#dadae8',
},
errorTextStyle: {
color: 'red',
textAlign: 'center',
fontSize: 14,
},
successTextStyle: {
color: 'white',
textAlign: 'center',
fontSize: 18,
padding: 30,
},
});
