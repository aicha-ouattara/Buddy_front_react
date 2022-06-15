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
  "https://zupimages.net/up/22/20/8810.png",
  "https://zupimages.net/up/22/20/lvzb.png",
  "https://zupimages.net/up/22/20/6y6m.png",
];

const width = 320;
const height = width * 1.3; //60%
console.log("dimensions:", width);

const TestSlider = () => {
  const [imgActive, setImgActive] = useState(0);

  const change = ({ nativeEvent }) => {
    const slide = Math.ceil(
      nativeEvent.contentOffset.x / nativeEvent.layoutMeasurement.width
    );
    if (slide !== imgActive) {
      setImgActive(slide);
    }
  };

  return (
    <View style={styles.container}>
      <ScrollView
        pagingEnabled
        horizontal
        onScroll={change}
        scrollEventThrottle={16}
        showsHorizontalScrollIndicator={false}
        style={styles.scroll}
      >
        {images.map((image, index) => (
          <Image key={index} source={{ uri: image }} style={styles.image} />
        ))}
      </ScrollView>
      <View style={styles.pagination}>
        {images.map((i, k) => (
          <Text
            key={k}
            style={k == imgActive ? styles.pagingActiveText : styles.pagingText}
          >
            ●
          </Text>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { alignItems: "center", justifyContent: "center" },
  scroll: { width, height },
  image: { width, height, resizeMode: "cover", borderRadius: 20 },
  pagination: {
    flexDirection: "row",
    position: "absolute",
    bottom: 0,
    alignSelf: "center",
  },
  pagingText: { color: "black", margin: 3 },
  pagingActiveText: { color: "#fff", margin: 3 },
});

export default TestSlider;
