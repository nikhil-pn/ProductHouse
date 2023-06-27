import {
  View,
  Text,
  SafeAreaView,
  Image,
  TouchableOpacity,
} from "react-native";
import React from "react";

import { COLORS, FONT, SIZES } from "../constants";

const Navbar = () => {
  return (
    // <SafeAreaView>
    <View
      style={{
        flexDirection: "row",
        justifyContent: "space-between",
        padding: 12,

        backgroundColor: "black",
      }}
    >
      <TouchableOpacity>
        <Image
          style={{
            width: 50,
            height: 50,
            resizeMode: "contain",
            alignContent: "center",
            display: "flex",
          }}
          source={require("../assets/tph.png")}
        ></Image>
      </TouchableOpacity>
      <Image
        style={{
          width: 120,
          height: 50,
          // resizeMode: "contain",
          // backgroundColor: "white",
        }}
        source={require("../assets/phtext.png")}
      ></Image>

      <TouchableOpacity>
        <Image
          style={{
            width: 40,
            height: 40,
            resizeMode: "cover",
            backgroundColor: "white",
            borderRadius: 100,
          }}
          source={require("../assets/linkedin_logo.jpg")}
        ></Image>
      </TouchableOpacity>
    </View>
    // </SafeAreaView>
  );
};

export default Navbar;
