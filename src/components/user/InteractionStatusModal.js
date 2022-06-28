import React, { useEffect, useState, createRef} from 'react';
import { StyleSheet, TextInput, View, Text, ScrollView, Image, Keyboard, TouchableOpacity, KeyboardAvoidingView, Pressable, Modal, Alert} from 'react-native';
import SelectDropdown from "react-native-select-dropdown";


const InteractionStatusModal = () => {

  const [open, setOpen] = useState(false);
  const [accepted, setAccepted] = useState();
  const { token, idUser } = useSelector(authState);
  const [isLoading, setIsLoading] = useState(true);

  const fetchUser = () => {
    genericFetchWithToken(`${API_URL}/users/${idUser}`, "GET", token)
      .then((json) => json.json())
      .then((data) => setUser(data))
      .catch((error) => console.error(error))
      .finally(() => setIsLoading(false));
  };

  useEffect(() => {
    setIsLoading(true);
    fetchUser();
  }, [route]);

  const handleSubmitButton = () => {
    
    const body = JSON.stringify({
      "accepted": accepted
    })
    PatchWithTokenBody(`${API_URL}/interests/${interest.id}`, 'PATCH', token, body) 
    .then(json => { console.log(json); } ) 
    .catch((error) => {console.error("error" , error)})
    fetchUser();
    setOpenPhone(false)

};

return (
      <Modal
     presentationStyle="overFullScreen"
     animationType="fade"
     transparent={true}
     visible={open}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
        
          <TouchableOpacity onPress={() => setOpen(false)}>
                  <Image
                    style={styles.close}
                    source={require(`../../../assets/icons/close.png`)}
                  />
                </TouchableOpacity>
                  

    <View style={styles.text}>
   
    <Text style={{ fontWeight: "bold", paddingBottom: 5 }}>
                  Change ton login ici !
                  </Text>
        
       
                


    <View style={styles.SectionStyle}>
         
    <SelectDropdown
              data={[
                { status: "Accepter", data: 2 },
                { status: "Refuser", data: 1}
          
              ]}
              onSelect={(selectedItem) => {
                setAccepted(selectedItem.data);
              }}
              defaultButtonText='Modifie le statut'
              buttonTextAfterSelection={(selectedItem, index) => {
                return selectedItem.status;
              }}
              rowTextForSelection={(item, index) => item.status}
              buttonStyle={styles.dropdown}
            />
    </View>

        <TouchableOpacity
            style={styles.buttonStyle}
            activeOpacity={0.5}
            onPress={handleSubmitButton}>
            <Text style={styles.buttonTextStyle}>Envoyer</Text>
        </TouchableOpacity>

    
     
    
    
      
</View>
          
          </View>
        </View>
      </Modal>
  
);

};

const styles = StyleSheet.create({
  experiencePicture: {
    flex: 1,
    height: 300,
    width: 300,
    resizeMode: "cover",
  },

  title: {
    flex: 1,
    flexWrap: "wrap",
    fontSize: 30,
    fontWeight: "bold",
  },

  avatar: {
    backgroundColor: "white",
  },

  blocActions: {
    marginLeft: 10,
    paddingLeft: 10,
    borderLeftWidth: 3,
    borderLeftColor: "#f14d53",
    flexDirection: "row",
    alignItems: "center",
  },

  views: {
    padding: 10,
    flex: 0.5,
    justifyContent: "space-around",
  },

  container: {
    flex: 0.7,
    justifyContent: "center",
    alignContent: "space-around",
    backgroundColor: "rgba(0,0,0,0.3)",
    paddingTop: 20,
    paddingLeft: 5,

  },

  modalView: {
    margin: 20,
    borderRadius: 10,
    justifyContent: "center",
    alignContent: "center",
    elevation: 5,
    alignSelf: "center",
    textAlign: "center",
    backgroundColor: "white",
  },
  image: {
    padding: 20,
  },
  close: {
    alignSelf: "flex-end",
    height: 24,
    width: 24,
    margin: 5,
  },
  icon: {
    width: 72,
    height: 72,
    alignSelf: "center",
    marginBottom: 10,
  },
  text: {
    backgroundColor: "#f2f2f2",
    padding: 15,
    borderRadius: 10,
  },
  input: {
    padding: 10,
    marginTop: 10,
    marginBottom: 10,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: "rgba(0,0,0,0.1)",
  },

  buttonStyle: {
    backgroundColor: "#f14d53",
    height: 40,
    alignItems: "center",
   padding: 10,
    justifyContent: "center",
    marginTop: 70,
  },

});

export default InteractionStatusModal;
