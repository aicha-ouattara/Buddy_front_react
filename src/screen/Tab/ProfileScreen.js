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

function ProfileScreen({navigation}) 
{


  
  return (
/*création de la 3 colonnes du profil */
    
    <Tabs style={{backgroundColor: 'white'}}>


      <TabScreen label="Experiences"  >
          <AllMyExperiences navigation = {navigation} />
      </TabScreen >

      <TabScreen label="Interactions">
      <AllMyInteractions navigation = {navigation} />
      </TabScreen>

      <TabScreen label="Profil">
          <MyProfileInfos/>
      </TabScreen>

    </Tabs>

  )
}
 


/* La partie toutes mes expériences créées*/
function AllMyExperiences({navigation}) {

  const goTo = useTabNavigation();
  const index = useTabIndex();

    /*récupère token automatiquement */
    const body = JSON.stringify({
      "login": "test",
      "password": "test"
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
      genericFetchWithToken(`${API_URL}/users/5`, 'GET', token) 
      .then(json => json.json())
      .then(data => setUser(data))
      .catch(error => console.error(error))
      .finally(() => setIsLoading(false))
    }, [token])


  
  return (
    <View style={{ flex:1, backgroundColor: 'white' }}>
      
      <ScrollView>
        
        <View>
        {isLoading ? <Text> Loading ... </Text> : 
            (
             
              user.experiences && user.experiences.map(experience => 

                <View >
                  <BlocExperience navigation={navigation} key={experience.id} experience={experience} user= {user}/>
               
          </View>
            )
          
           
            )}


            
        </View>

      </ScrollView>
      
      </View>
  );
}



/*toutes mes intéractions */

function AllMyInteractions({navigation}) {

  const goTo = useTabNavigation();
  const index = useTabIndex();
    /*récupère token automatiquement */
    const body = JSON.stringify({
      "login": "test",
      "password": "test"
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
    <View style={{ flex:1, backgroundColor: 'white' }}>
          {isLoading ? <Text> Loading ... </Text> : 
            (
             
            user.experiences && user.experiences.map(experience => 
       
                <BlocExperience navigation={navigation} key={experience.id} experience={experience} user= {user}/>
           
            
            )
          
           
            )}


  </View>
  );
}

/*mon profil persod + possibilité de modif de ce dernier */

function MyProfileInfos() {

  const goTo = useTabNavigation();
  const index = useTabIndex();

    /*récupère token automatiquement */
    const body = JSON.stringify({
      "login": "test",
      "password": "test"
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
         
          user && ( 
            <Text key={user.id}>

         <View style={styles.container}>
           <View style={styles.profil}> 
               <Image style={{ width: 50, height: 50}}
               source={require('../../../assets/profil.png')}
               />  

           <View style={styles.profiltop}>
             <Text>{user.login}</Text>
           < Text>Notes/AVIS</Text>
          </View>
      
     </View>
 
     <View>
        <Text><Image source={require('../../../assets/localisation.png')} /> Localisation</Text>
        <Text> <Image source={require('../../../assets/ok.png')} />  Vérifications gmail, facebook, téléphone</Text>
        <Text>Utilisateur depuis : {user.created_at}</Text>
     </View>

     <FormModal/>
     
   </View>
   

        </Text>)
      
       
        )}


        
    </View>
    
 


       
    );
  }



const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "space-between",
    backgroundColor: "#fff",
    padding: 20,
    margin: 10,
  },

     
    profil: {
      flex: 0.6,
      flexDirection: "row",
      justifyContent: 'flex-start',
      alignItems: 'center',
    },

    profiltop: {
      flex: 0.6,
      flexDirection: "column",
      justifyContent: 'space-between',
      alignItems: 'center',
    }

});



export default ProfileScreen

