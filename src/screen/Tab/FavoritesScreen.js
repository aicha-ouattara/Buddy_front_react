import React, {useContext, useEffect, useState} from 'react';
import {ActivityIndicator, StyleSheet, Text, View, Image, ScrollView, Button, TouchableOpacity, TextInput } from 'react-native';
import { Title } from 'react-native-paper';
import { Tabs, TabScreen, useTabIndex, useTabNavigation} from 'react-native-paper-tabs';
import BlocExperience from '../../components/BlocExperience';
import BlocInterest from '../../components/BlocInterest';
import {API_URL} from '@env';
import { genericFetch } from '../../api/fetchApi';
import { genericFetchWithToken } from '../../api/fetchApiWithToken';


function FavoritesScreen({navigation, route}) 
{


  const body = JSON.stringify({
    "login": "kevin",
    "password": "kevin"
})
  const [isLoading, setIsLoading] = useState(true);
  const [user, setUser] = useState([]);
  const [token, setToken] = useState("");

  useEffect(() => {
    genericFetch(`${API_URL}/login`, 'POST', body) 
    .then(json => json.json())
    .then(data => setToken(data.token))
    .catch(error => console.error(error))
  }, [])


 
  const fetchUser = () => {
    genericFetchWithToken(`${API_URL}/users/4`, 'GET', token) 
    .then(json => json.json())
    .then(data => setUser(data))
    .catch(error => console.error(error))
    .finally(() => setIsLoading(false))
  }

  useEffect(() => {
    setIsLoading(true)
    fetchUser()
  }, [token])

  const deleteId = (id) => {
        genericFetchWithToken(`${API_URL}/interests/${id}`, 'DELETE', token)
         fetchUser()
         console.log('intéret supprimé !')

       
    
 
  }

  
  
  console.log(user)


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
    <View style={{ flex:1, backgroundColor: 'white' }}>

      <Title style={{textAlign: 'center', paddingTop: 10}}>BUCKETLIST</Title>
      
      <ScrollView>
        
          <View>
          {(

         
          user.experiences && user.experiences.map(experience => 
            experience.interests.map(

              interest =>
              interest.plan == 0 && 
             
              <>   
                <BlocInterest navigation={navigation} interest={interest} experience={experience} user={user}/>
                <Text onClick={() => deleteId(interest.id)} key={interest.id} >Delete</Text>
              </>
              
 
              )
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

  return (
    <View style={{ flex:1, backgroundColor: 'white' }}>
      
    <Title style={{textAlign: 'center', paddingTop: 10}}>TO DO NOW</Title>


    <ScrollView>

      <View >
      {(
         
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
         )}
      </View>

    </ScrollView>


  </View>
  );
}




export default FavoritesScreen

