import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  ImageBackground,
  Image,
  StyleSheet,
} from "react-native";
import React, { useState } from "react";
import EmptyState from "./EmptyState";
import * as Animatable from "react-native-animatable";
import { icons } from "../constants";
import { ResizeMode, Video } from "expo-av";
import { useVideoPlayer, VideoView } from "expo-video";
import { useEvent } from "expo";

//TODO start from importing Video from expo-video

const zoomIn = {
  0: {
    scale: 0.9,
  },
  1: {
    scale: 1.1,
  },
};
const zoomOut = {
  0: {
    scale: 1,
  },
  1: {
    scale: 0.9,
  },
};

const TrendingItem = ({ activeItem, item }) => {
  const videoSource = item.video;
  // const [play, setPlay] = useState(false);

  const player = useVideoPlayer(videoSource, (player) => {
    player.loop = true;
    // player.play();
  });
  const { isPlaying } = useEvent(player, "playingChange", {
    isPlaying: player.playing,
  });

  return (
    <Animatable.View
      className="mr-5"
      animation={activeItem.thumbnail === item.thumbnail ? zoomIn : zoomOut}
      duration={300}
    >
      <View className="relative justify-center items-center">
        {isPlaying ? (
          <VideoView
            style={styles.video}
            player={player}
            resizeMode="contain"
            allowsFullscreen
            allowsPictureInPicture
            className=""
            nativeControls
            contentFit="contain"
          />
        ) : (
          <TouchableOpacity
            className="relative justify-center items-center"
            activeOpacity={0.7}
            onPress={() => {
              player.play();
            }}
          >
            <ImageBackground
              source={{ uri: item.thumbnail }}
              className="w-52 h-72 rounded-[35px] my-5 overflow-hidden shadow-lg shadow-black/40"
              resizeMode="cover"
            />
            <Image
              source={icons.play}
              className="w-12 h-12 absolute"
              resizeMode="contain"
            />
          </TouchableOpacity>
        )}
      </View>
    </Animatable.View>
  );
};

const Trending = ({ posts }) => {
  const [activeItem, setActiveItem] = useState(posts[1]);
  const viewableItemsChanged = ({ viewableItems }) => {
    if (viewableItems.length > 0) {
      setActiveItem(viewableItems[0].item);
    }
  };
  return (
    <FlatList
      data={posts}
      keyExtractor={(item) => item.thumbnail}
      renderItem={({ item }) => (
        <TrendingItem activeItem={activeItem} item={item} />
      )}
      onViewableItemsChanged={viewableItemsChanged}
      viewabilityConfig={{ itemVisiblePercentThreshold: 70 }} //50% of the item must be visible to be considered as in view
      contentOffset={{ x: 170 }} //initial offset from the left
      horizontal
      showsHorizontalScrollIndicator={false} //hides the horizontal scrollbar
    />
  );
};

export default Trending;
const styles = StyleSheet.create({
  video: {
    height: 258,
    width: 182,
    borderRadius: 35,
    marginTop: 15,
  },
});
