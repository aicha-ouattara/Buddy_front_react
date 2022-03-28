 {/* {(experience.interests.length == 0 && (
                  <TouchableOpacity onPress={() => {handleUnlike(interest)}} >
                  <Image style={styles.heartLogo} source={require('../../assets/heart.png')} />
                </TouchableOpacity>
                   ) )} 

    

               {(  experience?.interests && experience.interests.map(function(interest) {
                   if(interest.user == userUri ) {
                     return  <>
                     <TouchableOpacity onPress={() => {handleUnlike(interest)}} >
                       <Image style={styles.noheartLogo} source={require('../../assets/heart.png')} />
                     </TouchableOpacity>
                       </>
                   }  else {
                    return  <>
                    <TouchableOpacity onPress={() => {handleUnlike(interest)}} >
                      <Image style={styles.heartLogo} source={require('../../assets/heart.png')} />
                    </TouchableOpacity>
                      </>
                   }        })
                   
                   )}             */}







          {/* <TouchableOpacity onPress={() => {handleUnlike(interest)}} >
                <Image style={styles.noheartLogo} source={require('../../assets/heart.png')} />
               </TouchableOpacity> */}


          {/* {isLoading ? <Text> Loading ... </Text> : 
            (
            
                experience.interests && experience.interests.map(interest => {

                    interest.user == userUri && <Heart handleUnlike={handleUnlike} handleLike={handleLike}/>
                 
              // experience.interests && experience.interests.map(interest => {

              //   interest.user == userUri && <Heart handleUnlike={handleUnlike} handleLike={handleLike}/>
            )})} */}



            
  useEffect(() => {
    const ids = loggedInUserInterests
    .map(interest => interest.experience)
    .map(interest => interest.replace('/api/experiences/', ''))
    .map(id => parseInt(id))
    setLoggedInUserInterestsIds(ids)
  }, [loggedInUserInterests])

  <View style={styles.firstpart}>
  <Image style={{ width: 25, height: 25 }}
    source={require('../../assets/profil.png')}
  />
  <Text onPress={() => { navigation.navigate('User', { id: experience.user.id }) }} >{experience.user.login}</Text>
</View>

<View>
  <Text style={{ fontSize: 12, textAlign: 'justify', paddingBottom: 10 }}>{experience.description}</Text>
  <Text style={{ paddingBottom: 10 }}>date création : {experience.created_at}</Text>
  <Text style={{ paddingBottom: 10 }}>date modification : {experience.updated_at}</Text>
</View>

<View style={styles.secondpart}>
  <Text>
    <Image style={{ width: 25, height: 25 }}
      source={require('../../assets/localisation.png')}
    /> {experience.location}
  </Text>

  <Text>
    <Image style={{ width: 25, height: 25 }}
      source={require('../../assets/time.png')}
    /> {experience.duration}
  </Text>

  <Text>
    <Image style={{ width: 25, height: 25 }}
      source={require('../../assets/foule.png')}
    />{experience.spots}</Text>

</View>

<View style={styles.thirdpart}>
  <Text>
    <Image style={{ width: 25, height: 25 }}
      source={require('../../assets/doubleheart.png')}
    />
    {experience.interests.length} intéréssés
  </Text>

  <Text>
    <Image style={{ width: 25, height: 25 }}
      source={require('../../assets/doubleheart.png')}
    />  To do now
  </Text>

  <BucketForm />

</View> 