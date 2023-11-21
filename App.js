import { StatusBar } from 'expo-status-bar';
import {  Text, View, Button,
  Pressable,
  StyleSheet,
  Switch,
  useWindowDimensions,
   } from 'react-native';
import {
  BottomSheetModal,
  BottomSheetModalProvider,
  TouchableOpacity,
} from "@gorhom/bottom-sheet";
import "react-native-gesture-handler";
import { useEffect, useRef, useState } from "react";
import { AntDesign } from "@expo/vector-icons";

import { GestureHandlerRootView } from "react-native-gesture-handler";
import { ShakeEventExpo } from './assets/accelerometer';

export default function App() {

  const [isOpen, setIsOpen] = useState(false);

  const bottomSheetModalRef = useRef(null);

  const snapPoints = ["25%","35%"];
 
  function handlePresentModal() {
    
    bottomSheetModalRef.current?.present();
    setTimeout(() => {
      setIsOpen(true);
    }, 100);
  }

useEffect(() => {
  
  ShakeEventExpo.addListener(() => {
    //add your code here
    console.log(' I say Send SMS');
    
  });

}, []);
  
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>

    <BottomSheetModalProvider>
      <View
        style={[
          styles.container,
          { backgroundColor: isOpen ? "gray" : "white" },
        ]}
      >
        <View style={styles.card}>
        <TouchableOpacity onPress={handlePresentModal} >
        <Text>Nokwanda</Text>
        </TouchableOpacity>

        <StatusBar style="auto" />
        </View>
      
      
        <BottomSheetModal
          ref={bottomSheetModalRef}
          index={1}
          snapPoints={snapPoints}
          backgroundStyle={{ borderRadius: 50,backgroundColor:'#002E15' }}
          onDismiss={() => setIsOpen(false)}
        >
          <View style={styles.contentContainer}>
            <Text style={[styles.title, { marginBottom: 20 }]}>
              Nokwanda
            </Text>
            <Text>0834482835</Text>
            <TouchableOpacity><Text>Update contact</Text></TouchableOpacity>
            <TouchableOpacity><Text>Remove Contact</Text></TouchableOpacity>
          </View>
        </BottomSheetModal>
      </View>
    </BottomSheetModalProvider>
  </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "gray",
    alignItems: "center",
    justifyContent: "center",
  },
  contentContainer: {
    flex: 1,
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
    fontSize: 16,
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
  card:{
    position:'absolute',
    bottom:0,
    backgroundColor:'#125127',
    height: '40%',
    width: '100%',
    borderRadius:20
  }

});
