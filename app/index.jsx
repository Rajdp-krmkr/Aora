//homepage

import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import { Link } from "expo-router";

export default function App() {
  return (
    <>
      <View style={styles.container}>
        <Text className="">hello</Text>
        <StatusBar style="auto" />
        <Link href="/home" className="text-2xl text-blue-300">
          Go to Home{" "}
        </Link>
        <Text className=" text-red-500">hio</Text>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
