import { Tabs } from 'expo-router';
import React from 'react';

import { TabBarIcon } from '@/components/navigation/TabBarIcon';
import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';
import { SafeAreaViewComponent, StyleSheet, Text, View } from 'react-native';
import { StatusBar } from 'expo-status-bar';


export default function TabLayout() {
  const colorScheme = useColorScheme();

  return (
    <>
      <SafeAreaViewComponent>
        <View style={styles.container}>
          <Text>
            Aora!
          </Text>
        </View>
      </SafeAreaViewComponent>

    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',

  }
})
