import { Image, StyleSheet, Text, View, ScrollView, Alert } from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";
import { Link, router } from "expo-router";
import { images } from "../../constants";
import CustomButton from "../../components/CustomButton";
import FormField from "../../components/FormField";
import { createUser } from "../../lib/firebaseConfig";

const SignUp = () => {
  const [form, setform] = useState({
    username: "",
    email: "",
    password: "",
  });

  const [isSubmitting, setisSubmitting] = useState(false);

  const submit = async () => {
    if (form.username === "" || form.email === "" || form.password === "") {
      Alert.alert("Error", "Please fill all fields");
      return;
    }

    setisSubmitting(true);
    // console.log(form.email, form.username, form.password);

    await createUser(form.email, form.password, form.username)
      .then(() => {
        router.replace("/home");
      })
      .catch((error) => {
        Alert.alert("Error", error.message);
      })
      .finally(() => {
        setisSubmitting(false);
      });

    //TODO set it to global state...
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
            Sign up to Aora
          </Text>
          <FormField
            title={"Username"}
            value={form.username}
            handleChangeText={(e) => {
              setform({ ...form, username: e });
            }}
            otherStyles="mt-7"
          />
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
            Sign up
          </CustomButton>
          <View className="flex flex-row justify-center items-center mt-5">
            <Text className="text-lg text-gray-100 font-pregular">
              Have an account already?{" "}
              <Link
                href={`/sign-in`}
                className="text-lg font-psemibold text-secondary "
              >
                Sign In
              </Link>
            </Text>
          </View>
        </View>
      </ScrollView>
      <StatusBar backgroundColor="#161622" style="light" />
    </SafeAreaView>
  );
};

export default SignUp;

const styles = StyleSheet.create({});
