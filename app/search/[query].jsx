import {
  View,
  Text,
  FlatList,
  Image,
  RefreshControl,
  Alert,
} from "react-native";
import React, { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { images } from "../../constants";
import SearchInput from "../../components/SearchInput";
import Trending from "../../components/Trending";
import EmptyState from "../../components/EmptyState";
import { getAllPosts, getLatestPosts } from "../../lib/firebaseConfig";
import VideoCard from "../../components/VideoCard";
import useFirebase from "../../lib/useFirebase";

import { SearchPosts } from "../../lib/firebaseConfig";
import { useLocalSearchParams } from "expo-router";

const query = () => {
  const { query } = useLocalSearchParams();
  const [searchPostsArray, setSearchPostsArray] = useState([]);

  const { data: posts, reFetch } = useFirebase(SearchPosts);

  useEffect(() => {
    reFetch();
    if (query != "") {
      SearchPosts()
        .then((data) => {
          data.forEach((doc) => {
            doc.title.split(" ").map((word) => {
              if (word.toLowerCase() === query.toLowerCase()) {
                setSearchPostsArray((prev) => [...prev, doc]);
              }
            });
          });
        })
        .catch((err) => {
          console.error("Error fetching search results: ", err);
          return Alert.alert("Error fetching search results");
        });
    }
  }, [query]);

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
          <View className="my-6 px-4">
            <Text className="font-pmedium text-sm text-gray-100">
              Search Results
            </Text>
            <Text className="font-psemibold text-2xl text-white">{query}</Text>
            <View className="mt-6 mb-8">
              <SearchInput initialQuery={query} />
            </View>
          </View>
        )}
        ListEmptyComponent={() => (
          <EmptyState
            title="No videos found"
            subtitle={`No videos found for search query '${query}'`}
          />
        )}
      />
    </SafeAreaView>
  );
};

export default query;
