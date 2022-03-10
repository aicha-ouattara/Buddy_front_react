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

 