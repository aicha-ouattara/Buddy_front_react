import React from "react";
import { Image, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
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

  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Home"
          component={HomeScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Register" component={RegisterScreen} />
        {isLoggedIn && (
          <>
            <Stack.Screen
              name="Protected"
              component={ProtectedScreen}
              options={{
                headerLeft: null,
                headerTitle: () => (
                  <View
                    style={{
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <Image
                      style={{
                        width: 40,
                        height: 40,
                      }}
                      source={require("../../assets/logo.png")}
                    />
                  </View>
                ),
              }}
            />
            <Stack.Screen
              name="Experience"
              component={Experience}
              options={({ route }) => ({
                title: route.params.name,
              })}
            />
            <Stack.Screen
              name="User"
              component={UserScreen}
              options={({ route }) => ({
                title: route.params.name,
              })}
            />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}
