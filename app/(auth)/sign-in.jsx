import { Image, StyleSheet, Text, View, ScrollView } from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";
import { images } from "../../constants";
import FormField from "../../components/FormField";

const SignIn = () => {
  const [form, setform] = useState({
    email: "",
    password: "",
  });
  return (
    <SafeAreaView className="bg-primary h-full">
      <ScrollView>
        <View className="w-full h-full justify-center px-4 my-6">
          <Image
            source={images.logo}
            className="w-[115px] h-[35px]"
            resizeMode="contain"
          />
          <Text className="font-semibold text-white font-psemibold mt-10  text-2xl">
            Log in to Aora
          </Text>
          <FormField
            title={"Email"}
            value={form.email}
            handleChangeText={(e) => {
              setform({ ...form, email: e });
            }}
            otherStyles="mt-7"
            keyboardType="email-address"
          />
          <FormField
            title={"Password"}
            value={form.password}
            handleChangeText={(e) => {
              setform({ ...form, password: e });
            }}
            otherStyles="mt-7"
          />
        </View>
      </ScrollView>
      <StatusBar backgroundColor="#0a120a" style="light" />
    </SafeAreaView>
  );
};

export default SignIn;

const styles = StyleSheet.create({});
