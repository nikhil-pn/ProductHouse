import React, { useCallback, useState } from "react";
import {
  Text,
  View,
  SafeAreaView,
  ScrollView,
  ActivityIndicator,
  RefreshControl,
} from "react-native";

import { Stack, useRouter, useSearchParams } from "expo-router";

import {
  Company,
  JobAbout,
  JobFooter,
  JobTabs,
  ScreenHeaderBtn,
  Specifics,
} from "../../components/";
import { COLORS, SIZES, icons } from "../../constants";
import useFetch from "../../hook/useFetch";

const tabs = ["About", "Qualifications", "Responsibilities"];

const JobDetails = () => {
  //getting dynamic id from useSearchParams
  const params = useSearchParams();
  const router = useRouter();

  const paramsId = params.id;

  //fetching data from useFetch api via RapidAPi Jsearch
  const { data, isLoading, error, refetch } = useFetch("job-details", {
    job_id: paramsId,
  });
  // defining useStates of activeTab, Refreshing
  const [refreshing, setRefreshing] = useState(false);
  const [activeTab, setActiveTab] = useState(tabs[0]);

  // The DisplayTab switch statement creating for swith from about , qualification etc tabs
  const displayTabContent = () => {
    switch (activeTab) {
      //if switch case true the appropriate components will be rendered
      case "About":
        return (
          <JobAbout info={data[0].job_description ?? "No data provided"} />
        );

      case "Qualifications":
        return (
          <Specifics
            //passing props to the component
            title="Qualifications"
            points={data[0].job_highlights.Qualifications ?? ["N/A"]}
          />
        );
      case "Responsibilities":
        return (
          <Specifics
            title="Responsibilities"
            points={data[0].job_highlights.Responsibilities ?? ["N/A"]}
          />
        );
      default:
        break;
    }
  };
  // onRefresh func created for reload and fetching again data in not loaded
  const onRefresh = useCallback(() => {
    setRefreshing(true);
    refetch();
    setRefreshing(false);
  }, []);

  return (
    //safeAreaview added and right and left buttons added
    <SafeAreaView style={{ flex: 1, backgroundColor: "black" }}>
      <Stack.Screen
        options={{
          headerStyle: { backgroundColor: "black" },
          headerShadowVisible: false,
          headerBackVisible: false,
          headerLeft: () => (
            <ScreenHeaderBtn
              iconUrl={icons.left}
              dimension="60%"
              handlePress={() => router.back()}
            ></ScreenHeaderBtn>
          ),
          headerRight: () => (
            <ScreenHeaderBtn
              iconUrl={icons.share}
              dimension="60%"
              handlePress={() => router.back()}
            ></ScreenHeaderBtn>
          ),
          headerTitle: "",
        }}
      ></Stack.Screen>
      <>
        {/* scrollview added for vertical job display */}
        <ScrollView
          showsVerticalScrollIndicator={false}
          refreshControl={
            <RefreshControl
              refreshing={refreshing}
              onRefresh={onRefresh}
            ></RefreshControl>
          }
        >
          {/* Optional rendering if loaded activityIndicator fired else error etc if successful view container fired */}
          {isLoading ? (
            <ActivityIndicator
              size="large"
              color={COLORS.primary}
            ></ActivityIndicator>
          ) : error ? (
            <Text>Something Went Wrong</Text>
          ) : data.length === 0 ? (
            <Text>No Data</Text>
          ) : (
            <View style={{ padding: SIZES.medium, paddingBottom: 100 }}>
              <Company
                companyLogo={data[0].employer_logo}
                jobTitle={data[0].employer_name}
                companyName={data[0].employer_name}
                location={data[0].job_country}
              ></Company>
              <JobTabs
                tabs={tabs}
                activeTab={activeTab}
                setActiveTab={setActiveTab}
              ></JobTabs>
              {displayTabContent()}
            </View>
          )}
        </ScrollView>
        {/* footer apply for job button and heart added */}
        <View style={{ paddingBottom: 10 }}>
          <JobFooter
            url={
              data[0]?.job_google_link ??
              "https://careers.google.com/jobs/results"
            }
          />
        </View>
      </>
    </SafeAreaView>
  );
};

export default JobDetails;
