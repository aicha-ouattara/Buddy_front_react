import React, { useContext, useEffect, useState } from "react";
import {
  ActivityIndicator,
  StyleSheet,
  Text,
  View,
  Button,
  Image,
  TouchableOpacity,
} from "react-native";
// import { GlobalContext } from '../context/Provider';
import BucketForm from '../components/BucketForm';
import {API_URL} from '@env';
import { genericFetch } from '../api/fetchApi';
import { genericFetchWithToken } from '../api/fetchApiWithToken';

const Experience = ({route, navigation}) => {

    // const state = useContext(GlobalContext);

    const body = JSON.stringify({
      "login": "mioumiou",
      "password": "mioumiou"
  })
    const [isLoading, setIsLoading] = useState(true);
    const [experience, setExperience] = useState([]);
    const [token, setToken] = useState("");

    useEffect(() => {
      genericFetch(`${API_URL}/login`, 'POST', body) 
      .then(json => json.json())
      .then(data => setToken(data.token))
      .catch(error => console.error(error))
    }, [])
  

    useEffect(() => {
      setIsLoading(true)
      genericFetchWithToken(`${API_URL}/experiences/${route.params.id}`, 'GET', token) 
      .then(json => json.json())
      .then(data => setExperience(data))
      .catch(error => console.error(error))
      .finally(() => setIsLoading(false))
    }, [token])

    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        
        {isLoading ? <Text> Loading ... </Text> : 
            (experience.user && ( 
          <View key={experience.id}>
          <Text>{ experience.title}</Text>
          <Image style={{ width: 200, height: 200, alignSelf: 'center'}}
            source={require('../../assets/exemple_ville.jpeg')}
            /> 

        <View style={styles.firstpart}>
            <Image style={{ width: 25, height: 25}}
            source={require('../../assets/profil.png')}
            /> 
            <Text onPress={() => {navigation.navigate('User', {id : experience.user.id})}} >{experience.user.login}</Text>
        </View>

        <View>
            <Text  style={{fontSize: 12, textAlign:'justify', paddingBottom: 10}}>{experience.description}</Text>
            <Text style={{paddingBottom: 10}}>date création : {experience.created_at}</Text>
            <Text style={{paddingBottom: 10}}>date modification : {experience.updated_at}</Text>
        </View>
        
        <View style={styles.secondpart}>
            <Text>
            <Image style={{ width: 25, height: 25}}
          source={require('../../assets/localisation.png')}
          /> {experience.location}
          </Text>

          <Text>
            <Image style={{ width: 25, height: 25}}
          source={require('../../assets/time.png')}
          /> {experience.duration}
          </Text>
           
          <Text>  
             <Image style={{ width: 25, height: 25}}
            source={require('../../assets/foule.png')}
            />{experience.spots}</Text>

        </View>
        
        <View style={styles.thirdpart}>
        <Text>
            <Image style={{ width: 25, height: 25}}
          source={require('../../assets/doubleheart.png')}
          />  
          {experience.interests.length} intéréssés
          
          </Text>

            <Text>
            <Image style={{ width: 25, height: 25}}
            source={require('../../assets/doubleheart.png')}
            />  To do now
            </Text>

          <BucketForm/>
        
        </View> 

  
       </View>))}
  

    </View>
    );
  }


// const Experience = ({ route, navigation }) => {
//   // const state = useContext(GlobalContext);

//   const body = JSON.stringify({
//     login: "mioumiou",
//     password: "mioumiou",
//   });
//   const [isLoading, setIsLoading] = useState(true);
//   const [experience, setExperience] = useState([]);

//   const [token, setToken] = useState("");

//   useEffect(() => {
//     genericFetch(`${API_URL}/login`, "POST", body)
//       .then((json) => json.json())
//       .then((data) => setToken(data.token))
//       .catch((error) => console.error(error));
//   }, []);

//   useEffect(() => {
//     setIsLoading(true);
//     genericFetchWithToken(
//       `${API_URL}/experiences/${route.params.id}`,
//       "GET",
//       token
//     )
//       .then((json) => json.json())
//       .then((data) => setExperience(data))
//       .catch((error) => console.error(error))
//       .finally(() => setIsLoading(false));
//   }, [token]);

//   return (
//     <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
//       {isLoading ? (
//         <Text> Loading ... </Text>
//       ) : (
//         experience.user && (
//           <View key={experience.id}>
//             <Text>{experience.title}</Text>
//             <Image
//               style={{ width: 200, height: 200, alignSelf: "center" }}
//               source={require("../../assets/exemple_ville.jpeg")}
//             />

//             <View style={styles.firstpart}>
//               <Image
//                 style={{ width: 25, height: 25 }}
//                 source={require("../../assets/profil.png")}
//               />
//               <Text
//                 onPress={() => {
//                   navigation.navigate("User", { id: experience.user.id });
//                 }}
//               >
//                 {experience.user.login}
//               </Text>
//             </View>

//             <View>
//               <Text
//                 style={{
//                   fontSize: 12,
//                   textAlign: "justify",
//                   paddingBottom: 10,
//                 }}
//               >
//                 {experience.description}
//               </Text>
//               <Text style={{ paddingBottom: 10 }}>
//                 date création : {experience.created_at}
//               </Text>
//               <Text style={{ paddingBottom: 10 }}>
//                 date modification : {experience.updated_at}
//               </Text>
//             </View>

//             <View style={styles.secondpart}>
//               <Text>
//                 <Image
//                   style={{ width: 25, height: 25 }}
//                   source={require("../../assets/localisation.png")}
//                 />{" "}
//                 {experience.location}
//               </Text>

//               <Text>
//                 <Image
//                   style={{ width: 25, height: 25 }}
//                   source={require("../../assets/time.png")}
//                 />{" "}
//                 {experience.duration}
//               </Text>

//               <Text>
//                 <Image
//                   style={{ width: 25, height: 25 }}
//                   source={require("../../assets/foule.png")}
//                 />
//                 {experience.spots}
//               </Text>
//             </View>

//             <View style={styles.thirdpart}>
//               <Text>
//                 <Image
//                   style={{ width: 25, height: 25 }}
//                   source={require("../../assets/doubleheart.png")}
//                 />
//                 {experience.interests.length} intéréssés
//               </Text>

//               <Text>
//                 <Image
//                   style={{ width: 25, height: 25 }}
//                   source={require("../../assets/doubleheart.png")}
//                 />{" "}
//                 To do now
//               </Text>

//               <BucketForm />
//             </View>
//           </View>
//         )
//       )}
//     </View>
 // );
//};

const styles = StyleSheet.create({
  firstpart: {
    flex: 0.4,
    flexDirection: "row",
    justifyContent: "space-between",
    paddingLeft: 40,
    paddingRight: 40,
    paddingTop: 10,
  },

  secondpart: {
    flex: 0.4,
    flexDirection: "row",
    justifyContent: "space-between",
  },

  thirdpart: {
    flex: 0.4,
    flexDirection: "row",
    justifyContent: "space-between",
  },
});

export default Experience;
