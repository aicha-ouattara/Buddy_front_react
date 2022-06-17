<<<<<<< Updated upstream
import React, {useContext, useEffect, useState} from 'react';
import {ActivityIndicator, StyleSheet, Text, View, Image, ScrollView, Button, TouchableOpacity, TextInput } from 'react-native';
import { Title } from 'react-native-paper';
import { Tabs, TabScreen, useTabIndex, useTabNavigation} from 'react-native-paper-tabs';
import BlocExperience from '../../components/BlocExperience';
import BlocInterest from '../../components/BlocInterest';
import {API_URL} from '@env';
import AsyncStorage from "@react-native-async-storage/async-storage";

function FavoritesScreen({navigation, route}) 
{


=======
import React, { useEffect, useState} from 'react';
import {ActivityIndicator, StyleSheet, Text, View, Image, ScrollView, Button, TouchableOpacity, TextInput } from 'react-native';
import { Tabs, TabScreen, useTabIndex, useTabNavigation} from 'react-native-paper-tabs';
import BlocInterest from '../../components/BlocInterest';
import { Avatar } from 'react-native-paper';
import {API_URL} from '@env';
import { genericFetchWithToken } from '../../api/fetchApiWithToken';
import { authState } from "../../store/auth/selectors";
import { useDispatch, useSelector } from "react-redux";

function FavoritesScreen({navigation, route}) 
{
>>>>>>> Stashed changes
  const [isLoading, setIsLoading] = useState(true);
  const [user, setUser] = useState([]);
  const [token, setToken] = useState("");

<<<<<<< Updated upstream
  useEffect(() => {
    getData();
    // removeData();
  }, []);

  const getData = () => {
    try {
      AsyncStorage.getItem("token").then((value) => {
        if (value != null) {
          setToken(value);
          console.log("valeur feed screen:", value);
          // navigation.navigate("Protected");
        }
      });
    } catch (error) {
      console.log(error);
    }
  };
=======
  const fetchUser = () => {
    genericFetchWithToken(`${API_URL}/users/${idUser}`, 'GET', token)
      .then(json => json.json())
      .then(data => setUser(data))
      .catch(error => console.error(error))
      .finally(() => setIsLoading(false))
  }
>>>>>>> Stashed changes

 
  const fetchUser = () => {
    genericFetchWithToken(`${API_URL}/users/7`, 'GET', token) 
    .then(json => json.json())
    .then(data => setUser(data))
    .catch(error => console.error(error))
    .finally(() => setIsLoading(false))
  }

  useEffect(() => {
<<<<<<< Updated upstream
    setIsLoading(true)
    fetchUser()
  }, [token])
=======
    setIsLoading(true);
    fetchUser();
  }, [])
>>>>>>> Stashed changes

  const deleteId = (id) => {
        genericFetchWithToken(`${API_URL}/interests/${id}`, 'DELETE', token)
         fetchUser()
         console.log('intéret supprimé !') 
  }

<<<<<<< Updated upstream
  
  
  console.log(user)


=======
>>>>>>> Stashed changes
  return (
    
    isLoading ? <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}><Text> Loading ... </Text>  </View> : 
      (
    <Tabs style={{backgroundColor: 'white'}}>

      <TabScreen label="BucketList"  >
          <BucketList user={user} navigation={navigation} deleteId={(id) => {deleteId(id); fetchUser()}}/>
      </TabScreen >


      <TabScreen label="ToDoNow">
          <ToDoNow user={user} navigation={navigation} deleteId={(id) => {deleteId(id); fetchUser()}}/>
      </TabScreen>

    </Tabs>
    ) 
  
  )
}
 
function BucketList({navigation, user, deleteId,}) {

  const goTo = useTabNavigation();
  const index = useTabIndex();


  
  return (
<<<<<<< Updated upstream
    <View style={{ flex:1, backgroundColor: 'white' }}>

      <Title style={{textAlign: 'center', paddingTop: 10}}>BUCKETLIST</Title>
=======
    <View style={styles.container}>
>>>>>>> Stashed changes
      
      <ScrollView>
        
          <View>
          {(

         
<<<<<<< Updated upstream
          user.experiences && user.experiences.map(experience => 
            experience.interests.map(

              interest =>
              interest.plan == 0 && 
           
              <>    { console.log(experience)}
                <BlocInterest navigation={navigation} interest={interest} experience={experience} user={user}/>
                <Text onClick={() => deleteId(interest.id)} key={interest.id} >Delete</Text>
              </>
              
 
              )
=======
          user.interests && user.interests.map(interest => 
          
              interest.plan == 0 && 
           
              <>    
                 <View style={styles.box}>
                    <View style= {styles.blocText}>
                      <Text style={{fontWeight: "bold"}}>{interest.title}</Text>
                      <TouchableOpacity onPress={() => { navigation.navigate('User', { id: user.id }) }}>
                        <Text>{user.login}</Text>
                        <Image style={styles.experiencePicture} source={{ uri: encodedBase64 }}  /> 
                    </TouchableOpacity>
                  </View>
                 

                  <View style={styles.blocActions}>
                  
                    <TouchableOpacity style={styles.blocExperience} onPress={() => { navigation.navigate('Experience', { id: experience.id }) }}/>
                    <Text onClick={() => deleteId(interest.id)} key={interest.id} >
                        <Image style={{ width: 25, height: 25 }} source={require('../../../assets/icons/bucket-red.png')}  />
                    </Text>
                    <View style={styles.blocText}>
                        <Text style={{fontWeight: "bold"}}>{new Date(interest.date).toLocaleDateString()}</Text>
                    </View>
                   
                  </View>
                 
                </View>

             
              </>
            
 
              
>>>>>>> Stashed changes
        )
          )}
      

        </View>
      
      </ScrollView>
    
    </View>
  );
}

function ToDoNow({navigation, user, deleteId}) {
  
  const goTo = useTabNavigation();
  const index = useTabIndex();
  const encodedBase64 = interest.user.avatar

  return (
<<<<<<< Updated upstream
    <View style={{ flex:1, backgroundColor: 'white' }}>
      
    <Title style={{textAlign: 'center', paddingTop: 10}}>TO DO NOW</Title>

=======
    <View style={styles.container}>
>>>>>>> Stashed changes

    <ScrollView>

      <View >
      {(
         
<<<<<<< Updated upstream
         user.experiences && user.experiences.map(experience => 
           experience.interests.map(

             interest =>
             interest.plan == 1 && 
             <>
              <BlocInterest navigation={navigation} key={interest.id} interest={interest} experience={experience} user={user}/>
              <Text onClick={() => deleteId(interest.id)} key={interest.id} >Delete</Text>
             </>
            
             
             )
       )
=======
         user.interests && user.interests.map(interest => 
         
             interest.plan == 1 && 
             
             <>
                <View style={styles.box}>      
                  <View style={styles.blocText}>
                      <Text style={{fontWeight: "bold"}}>{interest.title}</Text>
                      <Text style={{fontWeight: "bold"}}>{new Date(interest.date).toLocaleDateString()}</Text>
                      <Text>{user.login}</Text>
                      <TouchableOpacity onPress={() => { navigation.navigate('User', { id: user.id }) }}>
                      <Image style={styles.experiencePicture} source={{ uri: encodedBase64 }}  /> 
                    </TouchableOpacity>
                  </View>
                  
                  <View style={styles.blocActions}>
                  
                    <TouchableOpacity style={styles.blocExperience} onPress={() => { navigation.navigate('Experience', { id: experience.id }) }}/>     
                      <Text onClick={() => deleteId(interest.id)} key={interest.id} >
                        <Image style={{ width: 25, height: 25 }} source={require('../../../assets/heart-red.png')}  />
                      </Text>
                      <TouchableOpacity>
                          {
                            interest.accepted == 0 &&
                            <Image style={{ width: 25, height: 25 }} source={require('../../../assets/attente.png')}  />
                          }

                          {
                            interest.accepted == 1 &&
                            <Image style={{ width: 25, height: 25 }} source={require('../../../assets/refused.png')}  />
                          }

                          {
                            interest.accepted == 2 &&
                            <Image style={{ width: 25, height: 25 }} source={require('../../../assets/accepted.png')}  />
                          }
                      </TouchableOpacity>

                  </View>
                 

                </View>
             
             </>
            
            
          )
>>>>>>> Stashed changes
         )}
      </View>

    </ScrollView>


  </View>
  );
}

<<<<<<< Updated upstream
=======
const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'space-around',
    alignContent: "center",
    backgroundColor: "#f2f2f2",
  },


  blocExperience: {
    flex: 1,
    flexDirection: "row",
  },

  box: {
    flexDirection: "row",
    borderRadius: 10,
    backgroundColor: "white",
    padding: 10,
    margin: 10,
    shadowColor: "grey",
    shadowOpacity: 0.25,
    shadowRadius: 6,
    elevation: 5, 
    justifyContent: 'space-between',
  },

  blocActions: {
    paddingLeft: 10,
    borderLeftWidth: 3,
    borderLeftColor: "#f14d53",
    justifyContent: "space-between"
  }, 

  experiencePicture: {
    height: 32,
    width: 32,
  },
  
});

>>>>>>> Stashed changes



export default FavoritesScreen

