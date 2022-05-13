import React, { useEffect, useState} from 'react';
import {ActivityIndicator, StyleSheet, Text, View, Image, ScrollView, Button, TouchableOpacity, TextInput } from 'react-native';
import { Title } from 'react-native-paper';
import { Tabs, TabScreen, useTabIndex, useTabNavigation} from 'react-native-paper-tabs';
import BlocExperience from '../../components/BlocExperience';
import BlocInterest from '../../components/BlocInterest';
import {API_URL} from '@env';
import { genericFetch } from '../../api/fetchApi';
import { genericFetchWithToken } from '../../api/fetchApiWithToken';
import {PatchWithTokenBody} from '../../api/fetchApiWithTokenBody'
import { authState } from "../../store/auth/selectors";
import { useDispatch, useSelector } from "react-redux";

function FavoritesScreen({navigation, route}) 
{
  const [isLoading, setIsLoading] = useState(true);
  const [user, setUser] = useState(0);
  const { token, idUser } = useSelector(authState);

  const fetchUser = () => {
    genericFetchWithToken(`${API_URL}/users/${idUser}`, 'GET', token)
      .then(json => json.json())
      .then(data => setUser(data))
      .catch(error => console.error(error))
      .finally(() => setIsLoading(false))
  }

  useEffect(() => {
    setIsLoading(true);
    fetchUser();
  }, [])

  const deleteId = (id) => {
        genericFetchWithToken(`${API_URL}/interests/${id}`, 'DELETE', token)
         fetchUser()
         console.log('intéret supprimé !') 
  }

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
           
              <>    { console.log(experience)}
                <BlocInterest navigation={navigation} interest={interest} experience={experience} user={user}/>
                <Text onClick={() => deleteId(interest.id)} key={interest.id} ><Image 
            style={{ width: 25, height: 25 }} source={require('../../../assets/bucket-red.png')}  /></Text>
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
              <Text onClick={() => deleteId(interest.id)} key={interest.id} ><Image 
            style={{ width: 25, height: 25 }} source={require('../../../assets/heart-red.png')}  /></Text>
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

