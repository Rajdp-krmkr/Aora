import {
  View,
  Text,
  FlatList,
  Alert,
  TouchableOpacity,
  Image,
} from "react-native";
import React, { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import SearchInput from "../../components/SearchInput";
import EmptyState from "../../components/EmptyState";
import VideoCard from "../../components/VideoCard";
import useFirebase from "../../lib/useFirebase";
import { useGlobalContext } from "../../context/GlobalProvider";
import InfoBox from "../../components/InfoBox";

import { auth, getUSerPosts, SearchPosts } from "../../lib/firebaseConfig";
import { icons } from "../../constants";
import { router } from "expo-router";
import { signOut } from "firebase/auth";

const Profile = () => {
  const { setIsLoggedin, user, setUser } = useGlobalContext();
  const [searchPostsArray, setSearchPostsArray] = useState([]);

  const { data: posts, reFetch } = useFirebase(() =>
    getUSerPosts(user.accountId)
  );

  useEffect(() => {
    if (posts) {
      setSearchPostsArray(posts);
    }
  }, [posts]);

  const logout = () => {
    signOut(auth)
      .then(() => {
        router.replace("/sign-in");
      })
      .catch((error) => {
        Alert.alert("Error", error.message);
      });
  };

  return (
    <SafeAreaView className="bg-primary h-full">
      <FlatList
        data={searchPostsArray}
        keyExtractor={(item) => item.thumbnail}
        renderItem={({ item, index }) => (
          <View key={index}>
            <VideoCard video={item} />
          </View>
        )}
        ListHeaderComponent={() => (
          <View
            className="w-full justify-center
            items-center mt-6 mb-12 px-4"
          >
            <TouchableOpacity
              className="w-full items-end mb-10"
              onPress={logout}
            >
              <Image
                source={icons.logout}
                resizeMode="contain"
                className="w-6 h-6"
              />
            </TouchableOpacity>
            <View className="w-16 h-16 border border-secondary rounded-lg justify-center items-center">
              <Image
                source={{ uri: user?.avatar }}
                className="w-[90%] h-[90%] rounded-lg"
                resizeMode="cover"
              />
            </View>
            <InfoBox
              title={user?.username}
              containerStyles={"mt-5"}
              titleStyles={"text-lg"}
            />
            <View className="mt-5 flex-row">
              <InfoBox
                title={posts.length || 0}
                subtitle="Posts"
                containerStyles={"mr-10"}
                titleStyles={"text-xl"}
              />
              <InfoBox
                title={"1.2k"}
                subtitle="Followers"
                titleStyles={"text-xl"}
              />
            </View>
          </View>
        )}
        ListEmptyComponent={() => (
          <EmptyState title="No videos found" subtitle={`No videos found`} />
        )}
      />
    </SafeAreaView>
  );
};

export default Profile;
