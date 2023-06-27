import { useState } from "react";
import { View, ScrollView, SafeAreaView } from "react-native";
import { Stack, useRouter } from "expo-router";

import { COLORS, icons, images, SIZES } from "../constants";
import {
  Nearbyjobs,
  Popularjobs,
  ScreenHeaderBtn,
  Welcome,
} from "../components";
import { Image } from "react-native";
import Navbar from "../screen/Navbar";

//home page default main component
const Home = () => {
  const router = useRouter();
  const [searchTerm, setSearchTerm] = useState("");

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.lightWhite }}>
      {/* Left and Right button navigation */}
      {/* <Stack.Screen
        options={{
          headerStyle: { backgroundColor: COLORS.lightWhite },
          headerShadowVisible: false,
          headerLeft: () => (
            <>
              <ScreenHeaderBtn iconUrl={icons.menu} dimension="60%" />
              <Image  style={{width: 50, height: 50 , resizeMode: "contain", alignSelf: "center"}} source={require("../assets/tph.png")}></Image>
            </>
          ),
         
          
          headerRight: () => (
            <ScreenHeaderBtn iconUrl={images.profile} dimension="80%" />
          ),
          //empty title hidden
          headerTitle: "",
        }}
      /> */}
      <Stack.Screen options={{ headerShown: false }} />
      <Navbar></Navbar>
      
      <ScrollView showsVerticalScrollIndicator={false}>
        <View
          style={{
            flex: 1,
            padding: SIZES.medium,
          }}
        >
          <Welcome
            // search component passing all props & using router to route to search result page
            searchTerm={searchTerm}
            setSearchTerm={setSearchTerm}
            handleClick={() => {
              if (searchTerm) {
                router.push(`/search/${searchTerm}`);
              }
            }}
          />
          {/* popularjobs, nearbyJob component, add more if needed */}
          <Popularjobs />
          <Nearbyjobs />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Home;
