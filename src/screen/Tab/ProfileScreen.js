import React, {useContext, useState, useEffect} from 'react';
import {ActivityIndicator, StyleSheet, Text, View, Image, ScrollView } from 'react-native';
import { Title } from 'react-native-paper';
import { Tabs, TabScreen, useTabIndex, useTabNavigation} from 'react-native-paper-tabs';
import BlocExperience from '../../components/BlocExperience';
import BlocInterest from '../../components/BlocInterest';
import {API_URL} from '@env';
import { genericFetch } from '../../api/fetchApi';
import { genericFetchWithToken } from '../../api/fetchApiWithToken';


function Profile({navigation, route}) 
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


  useEffect(() => {
    setIsLoading(true)
    genericFetchWithToken(`${API_URL}/users/4`, 'GET', token) 
    .then(json => json.json())
    .then(data => setUser(data))
    .catch(error => console.error(error))
    .finally(() => setIsLoading(false))
  }, [token])

console.log(user)
  return (
    
    isLoading ? <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}><Text> Loading ... </Text>  </View> : 
      (
    <Tabs style={{backgroundColor: 'white'}}>

      <TabScreen label="Experiences"  >
          <AllExperiences user={user} navigation={navigation} />
      </TabScreen >

      <TabScreen label="Interactions">
      <AllInteractions user={user} navigation={navigation} />
      </TabScreen>

      <TabScreen label="Profil">
          <UserProfileInfos user={user} navigation={navigation} />
      </TabScreen>

    </Tabs>
    ) 
  
  )
}
 
function AllExperiences({navigation, user}) {

  const goTo = useTabNavigation();
  const index = useTabIndex();

  return (
    <View style={{ flex:1, backgroundColor: 'white' }}>

      <Title style={{textAlign: 'center', paddingTop: 10}}>ALL EXPERIENCES</Title>
      
      <ScrollView>
        
          <View>
          {user.experiences && user.experiences.map(experience => 
          <BlocExperience navigation={navigation} key={experience.id} experience={experience} user={user}/>
         )}
        </View>
      
      </ScrollView>
    
    </View>
  );
}

function AllInteractions({navigation, user}) {
  
  const goTo = useTabNavigation();
  const index = useTabIndex();

  return (
    <View style={{ flex:1, backgroundColor: 'white' }}>
      
    <Title style={{textAlign: 'center', paddingTop: 10}}>ALL INTERACTIONS</Title>

    <ScrollView>

      <View >
        { 
         user.experiences && user.experiences.map(experience => 
            experience.interests.map(
              interest => <BlocInterest navigation={navigation} key={interest.id} interest={interest} experience={experience} user={user}/>
              )
        )}
      </View>

    </ScrollView>

  </View>
  );
}

function UserProfileInfos({navigation, user}) {

  const goTo = useTabNavigation();
  const index = useTabIndex();

  return (
    <View style={{ flex:1, backgroundColor: 'white' }}>
      
      <Title style={{textAlign: 'center', paddingTop: 10}}>PROFILE INFOS</Title>

      <View style={styles.container}>
        <View style={styles.profil}> 
        <Image style={{ width: 50, height: 50}}
        source={require('../../../assets/profil.png')}
        />  

          <View style={styles.profiltop}>
          <Text>id {user.id} </Text>
             <Text>Login {user.login} </Text>
             <Text>Date d'inscription {user.created_at} </Text>
          </View>
         
        </View>
    
        <View>
           <Text> <Image source={require('../../../assets/ok.png')} />  Vérifications gmail, facebook, téléphone</Text>
        </View>
       
      </View>

    </View>

  
  );
}



export default Profile

