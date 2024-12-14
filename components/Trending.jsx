import { View, Text, FlatList } from "react-native";
import React from "react";
import EmptyState from "./EmptyState";

const Trending = ({ posts }) => {
  return (
    <FlatList
      data={posts}
      keyExtractor={(item) => item.video}
      renderItem={({ item }) => (
        <Text className="text-3xl text-white" key={item.$id}>
          {item.$id}
        </Text>
      )}
      horizontal
      showsHorizontalScrollIndicator={false} //hides the horizontal scrollbar
    />
  );
};

export default Trending;
