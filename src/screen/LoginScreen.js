import React, { useContext, useState, createRef, useEffect } from "react";
import { GlobalContext } from "../context/Provider";
import { genericFetch } from "../api/fetchApi";
// import { API_URL } from "@env";
import {API_URL} from "@env";

import {
  StyleSheet,
  TextInput,
  Button,
  View,
  Text,
  ScrollView,
  Image,
  Keyboard,
  TouchableOpacity,
  KeyboardAvoidingView,
} from "react-native";

import AsyncStorage from "@react-native-async-storage/async-storage";

//import Loader from './Components/Loader';

function LoginScreen({ navigation }) {
  const state = useContext(GlobalContext);

  const [userLogin, setUserLogin] = useState("");
  const [userPassword, setUserPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [errortext, setErrortext] = useState("");
  const [token, setToken] = useState("");

  const handleSubmitPress = () => {
    setErrortext("");
    if (!userLogin) {
      setErrortext("Please fill login");
      return;
    }
    if (!userPassword) {
      setErrortext("Please fill password");
      return;
    }
    const body = JSON.stringify({
      login: userLogin,
      password: userPassword,
    });

    genericFetch(`${API_URL}/login`, "POST", body)
      .then((json) => json.json())
      .then((data) => setData(data.token));


  };



  const setData = async (token) => {
    try {
      await AsyncStorage.setItem("token", JSON.stringify(token));
      console.log("storage set data :", token);
      navigation.navigate("Protected");
    } catch (error) {
      console.log(error);
    }
  };



  return (
    <View style={styles.mainBody}>
      <ScrollView
        keyboardShouldPersistTaps="handled"
        contentContainerStyle={{
          flex: 1,
          justifyContent: "center",
          alignContent: "center",
        }}
      >
        <View>
          <Text>{token}</Text>
          <KeyboardAvoidingView enabled>
            <View style={{ alignItems: "center" }}></View>
            <View style={styles.SectionStyle}>
              <TextInput
                style={styles.inputStyle}
                onChangeText={(UserLogin) => setUserLogin(UserLogin)}
                placeholder="Enter login"
                placeholderTextColor="#8b9cb5"
                autoCapitalize="none"
                keyboardType="default"
                returnKeyType="next"
                underlineColorAndroid="#f000"
                blurOnSubmit={false}
              />
            </View>
            <View style={styles.SectionStyle}>
              <TextInput
                style={styles.inputStyle}
                onChangeText={(UserPassword) => setUserPassword(UserPassword)}
                placeholder="Enter Password"
                placeholderTextColor="#8b9cb5"
                keyboardType="default"
                blurOnSubmit={false}
                secureTextEntry={true}
                underlineColorAndroid="#f000"
                returnKeyType="next"
              />
            </View>
            {errortext != "" && (
              <Text style={styles.errorTextStyle}>{errortext}</Text>
            )}
            <TouchableOpacity
              style={styles.buttonStyle}
              activeOpacity={0.5}
              onPress={
                handleSubmitPress
              }
            >
              <Text style={styles.buttonTextStyle}>LOGIN</Text>
            </TouchableOpacity>
            <Text
              style={styles.registerTextStyle}
              onPress={() => navigation.navigate("Register")}
            >
              New Here ? Register
            </Text>

     
          </KeyboardAvoidingView>
        </View>
      </ScrollView>
    </View>
  );
}
export default LoginScreen;

const styles = StyleSheet.create({
  mainBody: {
    flex: 1,
    justifyContent: "center",
    backgroundColor: "#307ecc",
    alignContent: "center",
  },
  SectionStyle: {
    flexDirection: "row",
    height: 40,
    marginTop: 20,
    marginLeft: 35,
    marginRight: 35,
    margin: 10,
  },
  buttonStyle: {
    backgroundColor: "black",
    borderWidth: 0,
    color: "#FFFFFF",
    borderColor: "black",
    height: 40,
    alignItems: "center",
    borderRadius: 30,
    marginLeft: 35,
    marginRight: 35,
    marginTop: 20,
    marginBottom: 25,
  },
  buttonTextStyle: {
    color: "#FFFFFF",
    paddingVertical: 10,
    fontSize: 16,
  },
  inputStyle: {
    flex: 1,
    color: "white",
    paddingLeft: 15,
    paddingRight: 15,
    borderWidth: 1,
    borderRadius: 30,
    borderColor: "#dadae8",
  },
  registerTextStyle: {
    color: "#FFFFFF",
    textAlign: "center",
    fontWeight: "bold",
    fontSize: 14,
    alignSelf: "center",
    padding: 10,
  },
  errorTextStyle: {
    color: "red",
    textAlign: "center",
    fontSize: 14,
  },
});