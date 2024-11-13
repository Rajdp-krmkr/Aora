import { View, Text, StyleSheet } from "react-native";
import { Tabs, Redirect } from "expo-router";
import React from "react";
import { Image } from "react-native";
import { icons } from "../../constants";

const TabIcon = ({ icon, color, name, focused }) => {
  return (
    <View>
      <Image
        source={icon}
        resizeMode="contain"
        tintColor={color}
        className="h-6 w-6"
      />
      <Text className={`${focused ? "font-psemibold" : "font-pregular"}`}>
        {name}
      </Text>
    </View>
  );
};

const TabsLayout = () => {
  return (
    <>
      <Tabs>
        <Tabs.Screen
          name="home"
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
      </Tabs>
    </>
  );
};

const style = StyleSheet.create({
  contain: {
    width: 24,
    height: 24,
  },
});

export default TabsLayout;
