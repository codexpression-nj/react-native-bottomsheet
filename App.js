import { StatusBar } from 'expo-status-bar';
import {
  Text, View, Button,
  Pressable,
  StyleSheet,
  Switch,
  useWindowDimensions,
  ToastAndroid
} from 'react-native';
import {
  BottomSheetModal,
  BottomSheetModalProvider,
  TouchableOpacity,
} from "@gorhom/bottom-sheet";
import "react-native-gesture-handler";
import { useEffect, useRef, useState } from "react";
import { AntDesign } from "@expo/vector-icons";
import { RootSiblingParent } from 'react-native-root-siblings';
import Toast from 'react-native-root-toast';
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { ShakeEventExpo } from './assets/accelerometer';

export default function App() {

  const [isOpen, setIsOpen] = useState(false);
  const [islogged, setIsLogged] = useState(false)
  const bottomSheetModalRef = useRef(null);
  const [openToast, setOpenToast] = useState(false)
  const snapPoints = ["15%", "25%"];
  const [contacts,setContacts]=useState([])
  // const accountSid = process.env.TWILIO_ACCOUNT_SID;
  // const authToken = process.env.TWILIO_AUTH_TOKEN;
  // const client = require('twilio')(accountSid, authToken);

  // client.messages
  //   .create({
  //      body: 'This is the ship that made the Kessel Run in fourteen parsecs?',
  //      from: '+15017122661',
  //      to: '+15558675310'
  //    })
  //   .then(message => console.log(message.sid));
  function handlePresentModal() {

    bottomSheetModalRef.current?.present();
    setTimeout(() => {
      setIsOpen(true);
    }, 100);
  }
  function showToast() {
    ToastAndroid.show('Request sent successfully!', ToastAndroid.SHORT);
  }
  useEffect(() => {

    ShakeEventExpo.addListener(() => {
      //add your code here
      console.log(' I say Send SMS');

    });

  }, []);

  const handleAdd  = () => {
      setContacts([{name:'Nokanda',number:221221123}])
  }

  return (
    <RootSiblingParent>
      <GestureHandlerRootView style={{ flex: 1 }}>

        <BottomSheetModalProvider>
          <View
            style={[
              styles.container,
              { backgroundColor: isOpen ? "gray" : "white" },
            ]}
          >
            <View style={{ marginTop: 100, }}>
              {islogged ?
                <TouchableOpacity style={styles.chip} onPress={() => setIsLogged(false)}>
                  <Text>Sign Out</Text>
                </TouchableOpacity>
                :
                <TouchableOpacity style={styles.chip} onPress={() => setIsLogged(true)}>
                  <Text>Sign IN</Text>
                </TouchableOpacity>
              }
            </View>
            {islogged ?


              
            <View style={styles.card}>
              <Text style={styles.title}>Trusted Contacts</Text>
              {contacts.length > 0 ?
                <View style={styles.contacts}>
                  <TouchableOpacity style={styles.chip} onPress={handlePresentModal} >
                    <Text style={styles.name} >Nokwanda</Text>
                  </TouchableOpacity>
                  <TouchableOpacity style={styles.chip} onPress={handlePresentModal} >
                    <Text style={styles.name} >Nokwanda</Text>
                  </TouchableOpacity>
                  <TouchableOpacity style={styles.chip} onPress={handlePresentModal} >
                    <Text style={styles.name} >Nokwanda</Text>
                  </TouchableOpacity>
                  <TouchableOpacity style={styles.chip} onPress={handlePresentModal} >
                    <Text style={styles.name} >Nokwanda</Text>
                  </TouchableOpacity>
                  <TouchableOpacity style={styles.chip} onPress={handlePresentModal} >
                    <Text style={styles.name} >Nokwanda</Text>
                  </TouchableOpacity>
                </View>
                : <View style={{ margin: 15, alignItems: 'center' }}>
                  <Text style={[styles.noUserText, { fontWeight: 'bold' }]}>
                    YOUR EMERGENCY CONTACTS WILL APPEAR HERE

                  </Text>
                  <Text style={styles.noUserText}>

                    You currently do not have any emergency contact.
                    Import contacts or add new contacts
                  </Text>
                </View>
              }
            
              <TouchableOpacity style={styles.addContact}>
                <Text>Add Contact</Text>
              </TouchableOpacity>
              <StatusBar style="auto" />
            </View>
:
<></>
          }
            <BottomSheetModal
              ref={bottomSheetModalRef}
              index={1}
              snapPoints={snapPoints}
              backgroundStyle={{ borderRadius: 50, backgroundColor: '#002E15' }}
              onDismiss={() => setIsOpen(false)}
            >
              <View style={styles.contentContainer}>
                <Text style={[styles.title, { marginBottom: 20 }]}>
                  Nokwanda
                </Text>
                <Text style={{color:'white'}}>0834482835</Text>
                <TouchableOpacity ><Text style={{color:'white'}}>Update contact</Text></TouchableOpacity>
                <TouchableOpacity onPress={() => setOpenToast(true)}><Text style={{color:'red'}}>Remove Contact</Text></TouchableOpacity>
              </View>
            </BottomSheetModal>
          </View>
        </BottomSheetModalProvider>
      </GestureHandlerRootView>
      <Toast visible={openToast}>Contact Removed!</Toast>

    </RootSiblingParent>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 2,
    backgroundColor: "gray",
    // alignItems: "center",
    // justifyContent: "center",
  },
  contentContainer: {
    flex: 2,
    alignItems: "center",
    paddingHorizontal: 15,
  },
  row: {
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginVertical: 10,
  },
  title: {
    fontWeight: "900",
    letterSpacing: 0.5,
    fontSize: 20,
    color: 'white', alignSelf: 'center',
    marginBottom: 10,
    marginTop: 30
  },
  chip: {
    borderColor: 'white',
    borderWidth: 1,
    borderRadius: 50,
    padding: 10,
    margin: 2
  },
  subtitle: {
    color: "white",
    fontSize: 14,
    fontWeight: "bold",
  },
  description: {
    color: "#56636F",
    fontSize: 13,
    fontWeight: "normal",
    width: "100%",
  },
  card: {
    position: 'absolute',
    bottom: 0,
    backgroundColor: '#125127',
    // height: '30%',
    width: '100%',
    borderRadius: 20,
    flexDirection: 'column',
    justifyContent: 'flex-end',
    // flex:1.5,
    // justifyContent: 'space-between'
  },
  contacts: {
    display: 'flex',
    flexDirection: 'row',
    margin: 15,
    flexWrap: 'wrap'
  },
  addContact: {
    borderRadius: 40,
    backgroundColor: '#C8FFD7',
    alignItems: 'center',
    height: 42,
    justifyContent: 'center',
    margin: 10
  },
  name: {
    color: 'white',
    fontSize: 13
  },
  noUserText: {
    letterSpacing: 0.16,
    color: 'white', fontSize: 13, textAlign: 'center'
  }

});
