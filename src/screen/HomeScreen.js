import React, { useEffect } from "react";
import {
  ActivityIndicator,
  StyleSheet,
  Text,
  View,
  Button,
  TouchableOpacity,
  ImageBackground,
} from "react-native";

// import SliderHome from "../components/SliderHome";
import TestSlider from "../components/TestSlider";

function HomeScreen({ navigation }) {
  return (
    <ImageBackground
      style={styles.imgBackground}
      resizeMode="cover"
      source={require("../../assets/home/iPhoneh.png")}
    >
      <View style={styles.sliderGeneral}>
        <View>
          {/* <SliderHome style={styles.slider} /> */}
          <TestSlider style={styles.slider} />
        </View>
        <View
          style={{
            flex: 1,
            alignItems: "center",
            justifyContent: "flex-end",
            marginTop: 40,
          }}
        >
          <Text
            style={{
              fontSize: 20,
              color: "white",
            }}
          >
            Partager votre expérience
          </Text>

          <View
            style={{
              marginTop: 30,
            }}
          >
            <Button
              title="Commencer"
              color="#F14D53"
              backgroundColor="black"
              style={{ borderRadius: 10 }}
              onPress={() => {
                navigation.navigate("Login");
              }}
            />
          </View>
        </View>
      </View>
    </ImageBackground>
  );
}

export default HomeScreen;

const styles = StyleSheet.create({
  sliderGeneral: {
    // marginTop: 300,
  },
  imgBackground: {
    flex: 1,
    justifyContent: "center",
  },
  slider: {
    flex: 1,
    justifyContent: "center",
    alignContent: "center",
    height: 30,
  },
});

//import datas from "../components/datas";

//Headphone
// import React, { useEffect } from "react";
// import {
//   Animated,
//   Dimensions,
//   Text,
//   View,
//   StyleSheet,
//   Image,
//   StatusBar,
//   SafeAreaView,
// } from "react-native";
// import datas from "../components/datas";

// const { width, height } = Dimensions.get("window");
// const TICKER_HEIGHT = 40;
// const LOGO_WIDTH = 220;
// const LOGO_HEIGHT = 40;
// const CIRCLE_SIZE = width * 0.6;
// const DOT_SIZE = 40;

// const Item = ({ imageUri, heading, description, scrollX, index }) => {
//   const inputRange = [(index - 1) * width, index * width, (index + 1) * width];
//   const opacityInputRange = [
//     (index - 0.4) * width,
//     index * width,
//     (index + 0.4) * width,
//   ];
//   const translateXHeading = scrollX.interpolate({
//     inputRange,
//     outputRange: [width * 0.1, 0, -width * 0.1],
//   });
//   const translateXDescription = scrollX.interpolate({
//     inputRange,
//     outputRange: [width, 0, -width],
//   });
//   const opacity = scrollX.interpolate({
//     inputRange: opacityInputRange,
//     outputRange: [0, 1, 0],
//   });
//   const imageScale = scrollX.interpolate({
//     inputRange,
//     outputRange: [0.2, 1, 0.2],
//   });
//   return (
//     <View style={styles.itemStyle}>
//       <Animated.Image
//         source={imageUri}
//         style={[
//           styles.imageStyle,
//           {
//             transform: [{ scale: imageScale }],
//           },
//         ]}
//       />
//       <View style={styles.textContainer}>
//         <Animated.Text
//           style={[
//             styles.heading,
//             {
//               opacity,
//               transform: [{ translateX: translateXHeading }],
//             },
//           ]}
//         >
//           {heading}
//         </Animated.Text>
//         <Animated.Text
//           style={[
//             styles.description,
//             {
//               opacity,
//               transform: [{ translateX: translateXDescription }],
//             },
//           ]}
//         >
//           {description}
//         </Animated.Text>
//       </View>
//     </View>
//   );
// };

// const Circle = ({ scrollX }) => {
//   return (
//     <View style={[StyleSheet.absoluteFillObject, styles.circleContainer]}>
//       {datas.map((p, index) => {
//         const inputRange = [
//           (index - 0.55) * width,
//           index * width,
//           (index + 0.55) * width,
//         ];
//         return (
//           <Animated.View
//             key={index}
//             style={[
//               styles.circle,
//               {
//                 backgroundColor: p.color,
//                 opacity: scrollX.interpolate({
//                   inputRange,
//                   outputRange: [0, 0.1, 0],
//                 }),
//                 transform: [
//                   {
//                     scale: scrollX.interpolate({
//                       inputRange,
//                       outputRange: [0, 1, 0],
//                     }),
//                   },
//                 ],
//               },
//             ]}
//           />
//         );
//       })}
//     </View>
//   );
// };

// const Ticker = ({ scrollX }) => {
//   return (
//     <View style={styles.tickerContainer}>
//       <Animated.View
//         style={{
//           transform: [
//             {
//               translateY: scrollX.interpolate({
//                 inputRange: [-width * 2, -width, 0, width, width * 2],
//                 outputRange: [
//                   TICKER_HEIGHT * 2,
//                   TICKER_HEIGHT,
//                   0,
//                   -TICKER_HEIGHT,
//                   -TICKER_HEIGHT * 2,
//                 ],
//               }),
//             },
//           ],
//         }}
//       >
//         {datas.map(({ type }, index) => {
//           return (
//             <Text key={index} style={styles.ticker}>
//               {type}
//             </Text>
//           );
//         })}
//       </Animated.View>
//     </View>
//   );
// };

// const Pagination = ({ scrollX }) => {
//   const translateX = scrollX.interpolate({
//     inputRange: datas.map((_, i) => i * width),
//     outputRange: datas.map((_, i) => i * 40),
//   });

//   return (
//     <View style={styles.pagination}>
//       <Animated.View
//         style={[
//           styles.paginationIndicator,
//           {
//             transform: [{ translateX }],
//           },
//         ]}
//       />
//       {datas.map((item) => {
//         return (
//           <View key={item.key} style={styles.paginationDotContainer}>
//             <View
//               style={[styles.paginationDot, { backgroundColor: item.color }]}
//             />
//           </View>
//         );
//       })}
//     </View>
//   );
// };

// export default function App() {
//   const _scrollX = React.useRef(new Animated.Value(0)).current;

//   return (
//     <SafeAreaView style={styles.container}>
//       <StatusBar hidden />
//       <Circle scrollX={_scrollX} />
//       {/* <Image style={styles.logo} source={require("../../assets/u")} /> */}
//       <Animated.FlatList
//         pagingEnabled
//         showsHorizontalScrollIndicator={false}
//         scrollEventThrottle={16}
//         horizontal
//         keyExtractor={(item) => item.key}
//         onScroll={Animated.event(
//           [{ nativeEvent: { contentOffset: { x: _scrollX } } }],
//           { useNativeDriver: true }
//         )}
//         data={datas}
//         renderItem={({ item, index }) => (
//           <Item {...item} index={index} scrollX={_scrollX} />
//         )}
//       />
//       <Pagination scrollX={_scrollX} />
//       <Ticker scrollX={_scrollX} />
//     </SafeAreaView>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     flexDirection: "row",
//     position: "relative",
//   },

//   itemStyle: {
//     width,
//     height,
//     alignItems: "center",
//     justifyContent: "center",
//   },
//   imageStyle: {
//     width: width * 0.75,
//     height: width * 0.75,
//     resizeMode: "contain",
//     flex: 1,
//   },
//   textContainer: {
//     alignItems: "flex-start",
//     alignSelf: "flex-end",
//     flex: 0.55,
//   },
//   heading: {
//     color: "#444",
//     textTransform: "uppercase",
//     fontSize: 24,
//     fontWeight: "800",
//     letterSpacing: 2,
//     marginBottom: 10,
//   },
//   description: {
//     color: "#ccc",
//     fontWeight: "600",
//     textAlign: "left",
//     width: width * 0.75,
//     marginRight: 10,
//     fontSize: 16,
//     lineHeight: 16 * 1.5,
//   },

//   circleContainer: {
//     flex: 1,
//     alignItems: "center",
//     justifyContent: "center",
//   },
//   circle: {
//     width: CIRCLE_SIZE,
//     height: CIRCLE_SIZE,
//     borderRadius: CIRCLE_SIZE / 2,
//     position: "absolute",
//     top: "20%",
//   },
//   ticker: {
//     textTransform: "uppercase",
//     fontSize: TICKER_HEIGHT,
//     lineHeight: TICKER_HEIGHT,
//     fontWeight: "800",
//     color: "#222",
//   },
//   tickerContainer: {
//     height: TICKER_HEIGHT,
//     overflow: "hidden",
//     position: "absolute",
//     top: 40,
//     left: 20,
//   },
//   pagination: {
//     position: "absolute",
//     right: 20,
//     bottom: 40,
//     flexDirection: "row",
//     height: DOT_SIZE,
//   },
//   paginationDot: {
//     width: DOT_SIZE * 0.3,
//     height: DOT_SIZE * 0.3,
//     borderRadius: DOT_SIZE * 0.15,
//   },
//   paginationDotContainer: {
//     width: DOT_SIZE,
//     alignItems: "center",
//     justifyContent: "center",
//   },
//   paginationIndicator: {
//     width: DOT_SIZE,
//     height: DOT_SIZE,
//     borderRadius: DOT_SIZE / 2,
//     borderWidth: 2,
//     borderColor: "#eee",
//     position: "absolute",
//   },
//   logo: {
//     opacity: 0.9,
//     height: LOGO_HEIGHT,
//     width: LOGO_WIDTH,
//     resizeMode: "contain",
//     position: "absolute",
//     left: 10,
//     bottom: 10,
//     transform: [
//       { translateX: -LOGO_WIDTH / 2 },
//       { translateY: -LOGO_HEIGHT / 2 },
//       { rotateZ: "-90deg" },
//       { translateX: LOGO_WIDTH / 2 },
//       { translateY: LOGO_HEIGHT / 2 },
//     ],
//   },
// });

// import * as React from "react";
// import {
//   StatusBar,
//   Image,
//   FlatList,
//   Dimensions,
//   Animated,
//   Text,
//   View,
//   StyleSheet,
//   SafeAreaView,
// } from "react-native";
// const { width } = Dimensions.get("screen");
// import { EvilIcons } from "@expo/vector-icons";
// import {
//   FlingGestureHandler,
//   Directions,
//   State,
// } from "react-native-gesture-handler";

// // https://www.creative-flyers.com
// const DATA = [
//   {
//     title: "Afro vibes",
//     location: "Mumbai, India",
//     date: "Nov 17th, 2020",
//     poster:
//       "https://images.pexels.com/photos/708440/pexels-photo-708440.jpeg?cs=srgb&dl=pexels-helena-lopes-708440.jpg&fm=jpg",
//   },
//   {
//     title: "Jungle Party",
//     location: "Unknown",
//     date: "Sept 3rd, 2020",
//     poster:
//       "https://images.pexels.com/photos/708440/pexels-photo-708440.jpeg?cs=srgb&dl=pexels-helena-lopes-708440.jpg&fm=jpg",
//   },
//   {
//     title: "4th Of July",
//     location: "New York, USA",
//     date: "Oct 11th, 2020",
//     poster:
//       "https://images.pexels.com/photos/708440/pexels-photo-708440.jpeg?cs=srgb&dl=pexels-helena-lopes-708440.jpg&fm=jpg",
//   },
//   {
//     title: "Summer festival",
//     location: "Bucharest, Romania",
//     date: "Aug 17th, 2020",
//     poster:
//       "https://images.pexels.com/photos/708440/pexels-photo-708440.jpeg?cs=srgb&dl=pexels-helena-lopes-708440.jpg&fm=jpg",
//   },
//   {
//     title: "BBQ with friends",
//     location: "Prague, Czech Republic",
//     date: "Sept 11th, 2020",
//     poster:
//       "https://images.pexels.com/photos/39369/baby-teddy-bear-cute-39369.jpeg?cs=srgb&dl=pexels-pixabay-39369.jpg&fm=jpg",
//   },
//   {
//     title: "Festival music",
//     location: "Berlin, Germany",
//     date: "Apr 21th, 2021",
//     poster:
//       "https://images.pexels.com/photos/1510150/pexels-photo-1510150.jpeg?cs=srgb&dl=pexels-d%C6%B0%C6%A1ng-nh%C3%A2n-1510150.jpg&fm=jpg",
//   },
//   {
//     title: "Beach House",
//     location: "Liboa, Portugal",
//     date: "Aug 12th, 2020",
//     poster:
//       "https://images.pexels.com/photos/708440/pexels-photo-708440.jpeg?cs=srgb&dl=pexels-helena-lopes-708440.jpg&fm=jpg",
//   },
// ];

// const OVERFLOW_HEIGHT = 70;
// const SPACING = 10;
// const ITEM_WIDTH = width * 0.76;
// const ITEM_HEIGHT = ITEM_WIDTH * 1.7;
// const VISIBLE_ITEMS = 3;

// const OverflowItems = ({ data, scrollXAnimated }) => {
//   const inputRange = [-1, 0, 1];
//   const translateY = scrollXAnimated.interpolate({
//     inputRange,
//     outputRange: [OVERFLOW_HEIGHT, 0, -OVERFLOW_HEIGHT],
//   });
//   return (
//     <View style={styles.overflowContainer}>
//       <Animated.View style={{ transform: [{ translateY }] }}>
//         {data.map((item, index) => {
//           return (
//             <View key={index} style={styles.itemContainer}>
//               <Text style={[styles.title]} numberOfLines={1}>
//                 {item.title}
//               </Text>
//               <View style={styles.itemContainerRow}>
//                 <Text style={[styles.location]}>
//                   <EvilIcons
//                     name="location"
//                     size={16}
//                     color="black"
//                     style={{ marginRight: 5 }}
//                   />
//                   {item.location}
//                 </Text>
//                 <Text style={[styles.date]}>{item.date}</Text>
//               </View>
//             </View>
//           );
//         })}
//       </Animated.View>
//     </View>
//   );
// };

// export default function HomeScreen() {
//   const [data, setData] = React.useState(DATA);
//   const scrollXIndex = React.useRef(new Animated.Value(0)).current;
//   const scrollXAnimated = React.useRef(new Animated.Value(0)).current;
//   const [index, setIndex] = React.useState(0);
//   const setActiveIndex = React.useCallback((activeIndex) => {
//     scrollXIndex.setValue(activeIndex);
//     setIndex(activeIndex);
//   });

//   React.useEffect(() => {
//     if (index === data.length - VISIBLE_ITEMS - 1) {
//       // get new data
//       // fetch more data
//       const newData = [...data, ...data];
//       setData(newData);
//     }
//   });

//   React.useEffect(() => {
//     Animated.spring(scrollXAnimated, {
//       toValue: scrollXIndex,
//       useNativeDriver: true,
//     }).start();
//   });

//   return (
//     <FlingGestureHandler
//       key="left"
//       direction={Directions.LEFT}
//       onHandlerStateChange={(ev) => {
//         if (ev.nativeEvent.state === State.END) {
//           if (index === data.length - 1) {
//             return;
//           }
//           setActiveIndex(index + 1);
//         }
//       }}
//     >
//       <FlingGestureHandler
//         key="right"
//         direction={Directions.RIGHT}
//         onHandlerStateChange={(ev) => {
//           if (ev.nativeEvent.state === State.END) {
//             if (index === 0) {
//               return;
//             }
//             setActiveIndex(index - 1);
//           }
//         }}
//       >
//         <SafeAreaView style={styles.container}>
//           <StatusBar hidden />
//           <OverflowItems data={data} scrollXAnimated={scrollXAnimated} />
//           <FlatList
//             data={data}
//             keyExtractor={(_, index) => String(index)}
//             horizontal
//             inverted
//             contentContainerStyle={{
//               flex: 1,
//               justifyContent: "center",
//               padding: SPACING * 2,
//               marginTop: 50,
//             }}
//             scrollEnabled={false}
//             removeClippedSubviews={false}
//             CellRendererComponent={({
//               item,
//               index,
//               children,
//               style,
//               ...props
//             }) => {
//               const newStyle = [style, { zIndex: data.length - index }];
//               return (
//                 <View style={newStyle} index={index} {...props}>
//                   {children}
//                 </View>
//               );
//             }}
//             renderItem={({ item, index }) => {
//               const inputRange = [index - 1, index, index + 1];
//               const translateX = scrollXAnimated.interpolate({
//                 inputRange,
//                 outputRange: [50, 0, -100],
//               });
//               const scale = scrollXAnimated.interpolate({
//                 inputRange,
//                 outputRange: [0.8, 1, 1.3],
//               });
//               const opacity = scrollXAnimated.interpolate({
//                 inputRange,
//                 outputRange: [1 - 1 / VISIBLE_ITEMS, 1, 0],
//               });

//               return (
//                 <Animated.View
//                   style={{
//                     position: "absolute",
//                     left: -ITEM_WIDTH / 2,
//                     opacity,
//                     transform: [
//                       {
//                         translateX,
//                       },
//                       { scale },
//                     ],
//                   }}
//                 >
//                   <Image
//                     source={{ uri: item.poster }}
//                     style={{
//                       width: ITEM_WIDTH,
//                       height: ITEM_HEIGHT,
//                       borderRadius: 14,
//                     }}
//                   />
//                 </Animated.View>
//               );
//             }}
//           />
//         </SafeAreaView>
//       </FlingGestureHandler>
//     </FlingGestureHandler>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     justifyContent: "center",
//     backgroundColor: "#fff",
//   },
//   title: {
//     fontSize: 28,
//     fontWeight: "900",
//     textTransform: "uppercase",
//     letterSpacing: -1,
//   },
//   location: {
//     fontSize: 16,
//   },
//   date: {
//     fontSize: 12,
//   },
//   itemContainer: {
//     height: OVERFLOW_HEIGHT,
//     padding: SPACING * 2,
//   },
//   itemContainerRow: {
//     flexDirection: "row",
//     justifyContent: "space-between",
//     alignItems: "center",
//   },
//   overflowContainer: {
//     height: OVERFLOW_HEIGHT,
//     overflow: "hidden",
//   },
// });
