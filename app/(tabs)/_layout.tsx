import React from 'react';
import { Tabs } from 'expo-router';

export default function TabLayout() {

  return (
    <Tabs
      screenOptions={{
        // Disable the static render of the header on web
        // to prevent a hydration error in React Navigation v6
      }}>
      <Tabs.Screen
        name="index"
      />
    </Tabs>
  );
}
