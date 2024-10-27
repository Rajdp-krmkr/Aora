import { Slot, Stack } from "expo-router";
import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";

// Import your global CSS file
import "../global.css";

const RootLayout = () => {
  // return (
  //   <>
  //     <SafeAreaView style={styles.container}>
  //       <View style={styles.container}>
  //         <Text>Header</Text>
  //         <Slot />
  //         <Text>Footer</Text>
  //       </View>
  //     </SafeAreaView>
  //   </>
  // );
  return (
    <Stack>
      <Stack.Screen name="index" options={{ headerShown : false }} />
    </Stack>
  );
};

export default RootLayout;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // backgroundColor: "#fff",
      alignItems: "center",
    justifyContent: "center",
  },
});
