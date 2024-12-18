import { useEvent } from "expo";
import { useVideoPlayer, VideoView } from "expo-video";
import {
  StyleSheet,
  View,
  Button,
  Image,
  TouchableOpacity,
  ImageBackground,
} from "react-native";
import { icons } from "../../constants";
const videoSource =
  "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4";

const Bookmarks = () => {
  const player = useVideoPlayer(videoSource, (player) => {
    player.loop = true;
    // player.play();
  });
  const { isPlaying } = useEvent(player, "playingChange", {
    isPlaying: player.playing,
  });

  return (
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
          contentFit="cover"
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
            source={{ uri: "https://i.ibb.co/Xkgk7DY/Video.png" }}
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
  );
};

export default Bookmarks;

const styles = StyleSheet.create({
  video: {
    height: 278,
    width: 198,
    borderRadius: 35,
  },
});
