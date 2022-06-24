import React, { useEffect } from "react";
import {
  ActivityIndicator,
  StyleSheet,
  Text,
  View,
  Button,
  TouchableOpacity,
  ImageBackground,
  TouchableHighlight,
} from "react-native";

import TestSlider from "../components/TestSlider";
// import AddScreen from "./Tab/AddScreen";

function HomeScreen({ navigation }) {
  return (
    <ImageBackground
      style={styles.imgBackground}
      resizeMode="cover"
      source={require("../../assets/home/iPhoneh.png")}
    >
      <TestSlider
        style={{ flex: 1, alignItems: "center", justifyContent: "center" }}
      />

      <View
        style={{
          alignItems: "center",
          justifyContent: "flex-end",
        }}
      >
        <Text
          style={{
            fontSize: 20,
            color: "white",
            marginTop: 30,
            marginBottom: 30,
          }}
        >
          Partage ton expérience !
        </Text>

        <TouchableHighlight
          onPress={() => {
            navigation.navigate("Login");
          }}
        >
          <Text style={styles.button}>Commencer</Text>
        </TouchableHighlight>
      </View>
    </ImageBackground>
  );
}

export default HomeScreen;

const styles = StyleSheet.create({
  sliderGeneral: {
    // marginTop: 300,
  },
  text: {
    color: "red",
  },
  imgBackground: {
    flex: 1,
    justifyContent: "center",
  },
  slider: {
    flex: 1,
    justifyContent: "center",
    alignContent: "center",
  },
  container: {
    flex: 1,
    justifyContent: "center",
    paddingHorizontal: 10,
  },
  button: {
    textAlign: "center",
    backgroundColor: "#F14D53",
    padding: 10,
    width: 150,
    color: "white",
    borderRadius: 10,
    fontSize: 20,
    color: "white",
  },
  countContainer: {
    alignItems: "center",
    padding: 10,
  },
  countText: {
    color: "#FF00FF",
  },
});
