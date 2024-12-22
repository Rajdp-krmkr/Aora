import { Image, StyleSheet, Text, View, ScrollView, Alert } from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";
import { Link, router } from "expo-router";
import { images } from "../../constants";
import CustomButton from "../../components/CustomButton";
import FormField from "../../components/FormField";
import { auth, createUser, signIn } from "../../lib/firebaseConfig";
import { sendSignInLinkToEmail } from "firebase/auth";

const SignIn = () => {
  const [form, setform] = useState({
    email: "",
    password: "",
  });

  const [isSubmitting, setisSubmitting] = useState(false);

  const submit = async () => {
    if (form.email === "" || form.password === "") {
      Alert.alert("Error", "Please fill all fields");
      return;
    }

    setisSubmitting(true);
    await signIn(form.email, form.password)
      .then(() => {
        console.log("User Signed In");
        router.replace("/home");
        //TODO set it to global state...
      })
      .catch((error) => {
        Alert.alert("Error", error.message);
        console.log("Error", error.message);
      })
      .finally(() => {
        setisSubmitting(false);
      });
  };

  return (
    <SafeAreaView className="bg-primary h-full">
      <ScrollView>
        <View className="w-full min-h-[85vh] justify-center px-4 my-6">
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
          <CustomButton
            handlePress={submit}
            containerStyles={"mt-7"}
            isLoading={isSubmitting}
          >
            Sign in
          </CustomButton>
          <View className="flex flex-row justify-center items-center mt-5">
            <Text className="text-lg text-gray-100 font-pregular">
              Don&apos;t have an account?{" "}
              <Link
                href={`/sign-up`}
                className="text-lg font-psemibold text-secondary "
              >
                Sign Up
              </Link>
            </Text>
          </View>
        </View>
      </ScrollView>
      <StatusBar backgroundColor="#161622" style="light" />
    </SafeAreaView>
  );
};

export default SignIn;

const styles = StyleSheet.create({});
