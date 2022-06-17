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
          }}
        >
          Partagez votre expérience
        </Text>

        <TouchableHighlight
          onPress={() => {
            navigation.navigate("Login");
          }}
        >
          <View style={styles.button}>
            <Text
              style={{
                fontSize: 20,
                color: "white",
              }}
            >
              Commencer
            </Text>
          </View>
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
    alignItems: "center",
    backgroundColor: "#F14D53",
    padding: 10,
    width: 150,
    color: "white",
    marginTop: 30,
    borderRadius: 10,
  },
  countContainer: {
    alignItems: "center",
    padding: 10,
  },
  countText: {
    color: "#FF00FF",
  },
});
