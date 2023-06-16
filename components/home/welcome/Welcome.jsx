import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, Image } from "react-native";

import styles from "./welcome.style";
import { useRouter } from "expo-router";
import { SIZES, icons } from "../../../constants";
import { FlatList } from "react-native-gesture-handler";

const jobTypes = ["Full-time", "Part-time", "Contractor"];

const Welcome = () => {
  const router = useRouter();
  const [activeJobType, setActiveJobType] = useState("Full-time");

  return (
    <View>
      <View style={styles.container}>
        <Text style={styles.userName}>Hello Nikhil</Text>
        <Text style={styles.welcomeMessage}>Find Your Perfect JOb</Text>
      </View>
      <View style={styles.searchContainer}>
        <View style={styles.searchWrapper}>
          <TextInput
            style={styles.searchInput}
            value=""
            onChange={() => {}}
            placeholder="What are you Looking for?"
          ></TextInput>
        </View>
        <TouchableOpacity style={styles.searchBtn} onPress={() => {}}>
          <Image style={styles.searchBtnImage} source={icons.search}></Image>
        </TouchableOpacity>
      </View>
      <View style={styles.tabsContainer}>
        <FlatList
          data={jobTypes}
          keyExtractor={(item) => item}
          contentContainerStyle={{columnGap: SIZES.small}} horizontal
          renderItem={({ item }) => (
            <TouchableOpacity
              style={styles.tab(activeJobType, item)}
              onPress={() => {
                setActiveJobType(item);
                router.push(`/search/${item}`);
              }}
            >
              <Text style={styles.tabText(activeJobType, item)}>{item}</Text>
            </TouchableOpacity>
          )}
        ></FlatList>
      </View>
    </View>
  );
};

export default Welcome;
