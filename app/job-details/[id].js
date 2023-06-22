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
  const params = useSearchParams();
  const router = useRouter();

  const paramsId = params.id;

  const { data, isLoading, error, refetch } = useFetch("job-details", {
    job_id: paramsId,
  });
  const [refreshing, setRefreshing] = useState(false);
  const [activeTab, setActiveTab] = useState(tabs[0]);

  const displayTabContent = () => {
    switch (activeTab) {
      case "About":
        return (
          <JobAbout info={data[0].job_description ?? "No data provided"} />
        );

      case "Qualifications":
        return (
          <Specifics
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

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    refetch();
    setRefreshing(false);
  }, []);

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.lightWhite }}>
      <Stack.Screen
        options={{
          headerStyle: { backgroundColor: COLORS.lightWhite },
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
        <ScrollView
          showsVerticalScrollIndicator={false}
          refreshControl={
            <RefreshControl
              refreshing={refreshing}
              onRefresh={onRefresh}
            ></RefreshControl>
          }
        >
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

// import {
//   Text,
//   View,
//   SafeAreaView,
//   ScrollView,
//   ActivityIndicator,
//   RefreshControl,
//   Share,
// } from "react-native";
// import { Stack, useRouter, useSearchParams } from "expo-router";
// import { useCallback, useState } from "react";

// import {
//   Company,
//   JobAbout,
//   JobFooter,
//   JobTabs,
//   ScreenHeaderBtn,
//   Specifics,
// } from "../../components";

// import { COLORS, icons, images, SIZES } from "../../constants";
// import useFetch from "../../hook/useFetch";

// const tabs = ["About", "Qualifications", "Responsibilities"];

// const JobDetails = () => {
//   const params = useSearchParams();
//   const router = useRouter();

//   console.log(params.id, "params id")

//   const { data, isLoading, error, refetch } = useFetch("job-details", {
//     job_id: params.id,
//   });

//   const [refreshing, setRefreshing] = useState(false);
//   const [activeTab, setActiveTab] = useState(tabs[0]);

//   const onRefresh = useCallback(() => {
//     setRefreshing(true);
//     refetch();
//     setRefreshing(false);
//   }, []);

//   const displayTabContent = () => {
//     switch (activeTab) {
//       case "About":
//         return (
//           <JobAbout info={data[0].job_description ?? "No data provided"} />
//         );

//       case "Qualifications":
//         return (
//           <Specifics
//             title="Qualifications"
//             points={data[0].job_highlights.Qualifications ?? ["N/A"]}
//           />
//         );
//       case "Responsibilities":
//         return (
//           <Specifics
//             title="Responsibilities"
//             points={data[0].job_highlights.Responsibilities ?? ["N/A"]}
//           />
//         );
//       default:
//         break;
//     }
//   };

//   return (
//     <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.lightWhite }}>
//       <Stack.Screen
//         options={{
//           headerStyle: { backgroundColor: COLORS.lightWhite },
//           headerShadowVisible: false,
//           headerBackVisible: false,
//           headerLeft: () => (
//             <ScreenHeaderBtn
//               iconUrl={icons.left}
//               dimension="60%"
//               handlePress={() => router.back()}
//             />
//           ),
//           // Add share functionality
//           headerRight: () => (
//             <ScreenHeaderBtn
//               iconUrl={icons.share}
//               dimension="60%"
//               handlePress={() =>
//                 Share.share({ message: "Check out this fantastic job!" })
//               }
//             />
//           ),

//           headerTitle: "",
//         }}
//       />

//       <>
//         <ScrollView
//           showsVerticalScrollIndicator={false}
//           refreshControl={
//             <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
//           }
//         >
//           {isLoading ? (
//             <ActivityIndicator size="large" color={COLORS.primary} />
//           ) : error ? (
//             <Text>Something went wrong!</Text>
//           ) : data.length === 0 ? (
//             <Text>No data found!</Text>
//           ) : (
//             <View style={{ padding: SIZES.medium, paddingBottom: 100 }}>
//               <Company
//                 companyLogo={data[0].employer_logo}
//                 jobTitle={data[0].job_title}
//                 companyName={data[0].employer_name}
//                 location={data[0].job_country}
//               />
//               <JobTabs
//                 tabs={tabs}
//                 activeTab={activeTab}
//                 setActiveTab={setActiveTab}
//               />

//               {displayTabContent()}
//             </View>
//           )}
//         </ScrollView>

//         <View style={{ paddingBottom: 10 }}>
//           <JobFooter
//             url={
//               data[0]?.job_google_link ??
//               "https://careers.google.com/jobs/results"
//             }
//           />
//         </View>
//       </>
//     </SafeAreaView>
//   );
// };

// export default JobDetails;
