import * as React from "react";
import { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  ScrollView,
  StatusBar,
  Dimensions,
  Image,
} from "react-native";

const images = [
  "https://images.pexels.com/photos/708440/pexels-photo-708440.jpeg?cs=srgb&dl=pexels-helena-lopes-708440.jpg&fm=jpg",
  "https://images.pexels.com/photos/1510150/pexels-photo-1510150.jpeg?cs=srgb&dl=pexels-d%C6%B0%C6%A1ng-nh%C3%A2n-1510150.jpg&fm=jpg",
  "https://images.pexels.com/photos/39369/baby-teddy-bear-cute-39369.jpeg?cs=srgb&dl=pexels-pixabay-39369.jpg&fm=jpg",
];

const WIDHT = Dimensions.get("window").width;
const HEIGHT = Dimensions.get("window").height;

const SliderHome = () => {
  const [imgActive, setImgActive] = useState(0);

  onchange = (nativeEvent) => {
    if (nativeEvent) {
      const slide = Math.ceil(
        nativeEvent.contentOffset.x / nativeEvent.layoutMeasurement.width
      );
      if (slide != imgActive) {
        setImgActive(slide);
      }
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.wrap}>
        <ScrollView
          // onScroll={({ nativeEvent }) => onChange(nativeEvent)}
          showsHorizontalScrollIndicator={false}
          pagingEnabled
          horizontal
          style={styles.wrap}
        >
          {images.map((e, index) => (
            <Image
              key={e}
              resizeMode="stretch"
              style={styles.wrap}
              source={{ uri: e }}
            />
          ))}
        </ScrollView>
        <View style={styles.wrapDot}>
          {images.map((e, index) => (
            <Text
              key={e}
              style
              style={imgActive == index ? styles.dotActive : styles.dot}
            >
              ●
            </Text>
          ))}
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  wrap: {
    width: WIDHT,
    height: HEIGHT * 0.25,
  },
  wrapDot: {
    position: "absolute",
    bottom: 0,
    flexDirection: "row",
    alignSelf: "center",
  },
  dotActive: {
    margin: 3,
    color: "black",
  },
  dot: {
    margin: 3,
    color: "black",
  },
});

export default SliderHome;
