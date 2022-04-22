import React, { useContext } from "react";

import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { GlobalContext } from "../context/Provider";

import HomeScreen from "../screen/HomeScreen";
import ProtectedScreen from "../screen/ProtectedScreen";
import LoginScreen from "../screen/LoginScreen";
import RegisterScreen from "../screen/RegisterScreen";
import Experience from "../screen/Experience";
import UserScreen from "../screen/UserScreen";
import { useSelector } from "react-redux";
import { authState } from "../store/auth/selectors";

export default function Nav() {
  //Permet de créer un groupe de screens
  const Stack = createNativeStackNavigator();

  //Permet de récupérer les données des states
  const { token, isLoggedIn } = useSelector(authState);
  //   const {isLoggedIn} = useLogin();

  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Register" component={RegisterScreen} />
        {isLoggedIn && (
          <>
            <Stack.Screen
              name="Protected"
              component={ProtectedScreen}
              options={{ headerLeft: null }}
            />
            <Stack.Screen name="Experience" component={Experience} />
            <Stack.Screen name="User" component={UserScreen} />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}
