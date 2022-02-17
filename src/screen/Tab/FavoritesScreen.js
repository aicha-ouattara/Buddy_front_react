import React, {useContext, useEffect, useState} from 'react';
import {ActivityIndicator, StyleSheet, Text, View, Image, ScrollView, Button, TouchableOpacity } from 'react-native';
import { Title } from 'react-native-paper';
import { Tabs, TabScreen, useTabIndex, useTabNavigation} from 'react-native-paper-tabs';
import BlocExperience from '../../components/BlocExperience';
import FormModal from '../../components/FormModal';
import Experience from '../Experience';
import { genericFetch } from '../../api/fetchApi';
import { genericFetchWithToken } from '../../api/fetchApiWithToken';
import {API_URL} from '@env';

function FavoritesScreen({navigation}) 
{

  

  return (
/*création de la 3 colonnes du profil */
    
    <Tabs style={{backgroundColor: 'white'}}>


      <TabScreen label="BucketList"  >
          <MyBucketlist navigation = {navigation} />
      </TabScreen >

      <TabScreen label="ToDoNow">
      <MyToDoNow navigation = {navigation} />
      </TabScreen>

 

    </Tabs>

  )
}
 


/* La partie toutes mes expériences créées*/
function MyBucketlist({navigation}) {

  const goTo = useTabNavigation();
  const index = useTabIndex();

    /*récupère token automatiquement */
    const body = JSON.stringify({
      "login": "kevin",
      "password": "kevin"
  })
    const [isLoading, setIsLoading] = useState(true);
    const [user, setUser] = useState([]);
    const [token, setToken] = useState("");
    //const [plan, setPlan] = useState({ id: "plan", value: 1 });
  
    useEffect(() => {
      genericFetch(`${API_URL}/login`, 'POST', body) 
      .then(json => json.json())
      .then(data => setToken(data.token))
      .catch(error => console.error(error))
    }, [])

  
    useEffect(() => {
      setIsLoading(true)
      genericFetchWithToken(`${API_URL}/users/4`, 'GET', token) 
      .then(json => json.json())
      .then(data => setUser(data))
      .catch(error => console.error(error))
      .finally(() => setIsLoading(false))
    }, [token])
    console.log(user);


function DeleteInterest(id){
    
  useEffect(() => {
    setIsLoading(true)
    genericFetchWithToken(`${API_URL}/interests/{$id}`, 'DELETE', token) 
    .then(json => json.json())
    .then(data => setUser(data))
    .catch(error => console.error(error))
    .finally(() => setIsLoading(false))
  }, [token])
  console.log(user);

    //alert(id);
}
  return (
    <View style={{ flex:1, backgroundColor: 'white' }}>

      <ScrollView>
        
        <View>
          
        {isLoading ? <Text> Loading ... </Text> : 
            (
             
              user.interests && user.interests.map(interest => 
             interest.plan == 0 && 
                  <>
              <BlocExperience navigation={navigation} key={interest.id} experience={interest.experience} user= {user} />
             
               <Button onClick={()=>DeleteInterest(interest.id)}>
                  <Image style={{ width: 25, height: 25}}
                  source={require('../../../assets/heart.png')}    /> 
              </Button>

                </>
            )
        
           
            )}


            
        </View>

      </ScrollView>
      
      </View>
  );
}



/*toutes mes intéractions */

function MyToDoNow({navigation}) {

  const goTo = useTabNavigation();
  const index = useTabIndex();
    /*récupère token automatiquement */
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
  
  
    useEffect(() => {
      setIsLoading(true)
      genericFetchWithToken(`${API_URL}/users/4`, 'GET', token) 
      .then(json => json.json())
      .then(data => setUser(data))
      .catch(error => console.error(error))
      .finally(() => setIsLoading(false))
    }, [token])


  return (
    <View>
    {isLoading ? <Text> Loading ... </Text> : 
        (
         // &&  équivalent d'un if une fois uqe la condition est vérifiée !
          user.interests && user.interests.map(interest => 

            interest.plan == 1 && 
            <>
          <BlocExperience navigation={navigation} key={interest.id} experience={interest.experience} user= {user}/>
          <Image style={{ width: 25, height: 25}}
              source={require('../../../assets/doubleheart.png')}
              /> 
              
              </>
        )
      
       
        )}


        
    </View>
  );
}





export default FavoritesScreen

