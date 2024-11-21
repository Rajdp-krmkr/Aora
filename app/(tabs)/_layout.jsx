import { View, Text, StyleSheet } from "react-native";
import { Tabs, Redirect } from "expo-router";
import React from "react";
import { Image } from "react-native";
import { icons } from "../../constants";

const TabIcon = ({ icon, color, name, focused }) => {
  return (
    <View className="flex justify-center items-center gap-2 w-[50px]">
      <Image
        source={icon}
        // resizeMode="contain"
        tintColor={color}
        // className="h-6 w-6 object-contain"
        style={style.contain}
      />
      <Text
        className={`${focused ? "font-psemibold" : "font-pregular"} text-[8px]`}
        style={{ color: color }}
      >
        {name}
      </Text>
    </View>
  );
};

const TabsLayout = () => {
  return (
    <Tabs
      screenOptions={{
        tabBarShowLabel: false,
        tabBarActiveTintColor: "#FFA001",
        tabBarInactiveTintColor: "#CDCDE0",
        tabBarStyle: {
          backgroundColor: "#161622",
          borderTopWidth: 1,
          borderTopColor: "#161622",
          height: 60,
          paddingTop: 10,
        },
      }}
    >
      <Tabs.Screen
        name="home" //!does it work like expo route?
        options={{
          title: "Home",
          headerShown: false,
          tabBarIcon: ({ color, focused }) => (
            <TabIcon
              icon={icons.home}
              color={color}
              name="Home"
              focused={focused}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="bookmark"
        options={{
          title: "Bookmark",
          headerShown: false,
          tabBarIcon: ({ color, focused }) => (
            <TabIcon
              icon={icons.bookmark}
              color={color}
              name="Bookmark"
              focused={focused}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="create"
        options={{
          title: "Create",
          headerShown: false,
          tabBarIcon: ({ color, focused }) => (
            <TabIcon
              icon={icons.plus}
              color={color}
              name="Create"
              focused={focused}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: "Profile",
          headerShown: false,
          tabBarIcon: ({ color, focused }) => (
            <TabIcon
              icon={icons.profile}
              color={color}
              name="profile"
              focused={focused}
            />
          ),
        }}
      />
    </Tabs>
  );
};

const style = StyleSheet.create({
  contain: {
    width: 24,
    height: 24,
  },
});

export default TabsLayout;
