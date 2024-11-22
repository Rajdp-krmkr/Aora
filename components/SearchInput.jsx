import { View, Text, TextInput, TouchableOpacity, Image } from "react-native";
import React, { useState } from "react";
import { icons } from "../constants";

const SearchInput = ({
  title,
  value,
  handleChangeText,
  otherStyles,
  placeholder,
  ...props
}) => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <View className="border-2 w-full h-16 px-4 space-x-4 bg-black-100 border-black-200 rounded-2xl flex flex-row items-center focus:border-secondary">
      <TextInput
        className="text-base mt-0.5 text-white flex-1 font-pregular placeholder:font-pregular"
        value={value}
        placeholder="Search for a video topic"
        placeholderTextColor="#7b7b8b"
        onChangeText={handleChangeText}
        secureTextEntry={title === "Password" && !showPassword}
      />
      <TouchableOpacity>
        <Image
          source={icons.search}
          resizeMode="contain"
          className=" w-5 h-5"
        />
      </TouchableOpacity>
    </View>
  );
};

export default SearchInput;
