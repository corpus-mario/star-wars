import { Tabs } from "expo-router";
import Ionicons from "@expo/vector-icons/Ionicons";

import colors from "@/constants/colors";

export default function TabsLayout() {
  return (
    <Tabs
      screenOptions={{
        headerStyle: {
          backgroundColor: colors.black,
        },
        headerTintColor: colors.yellow,
        headerTitleStyle: {
          fontWeight: "bold",
        },
        headerShadowVisible: false,
        sceneStyle: {
          backgroundColor: colors.grey,
        },
        tabBarStyle: {
          backgroundColor: colors.black,
          borderTopWidth: 1,
          borderTopColor: colors.yellow,
        },
        tabBarActiveTintColor: colors.yellow,
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "All Movies",
          tabBarLabel: "Movies",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="film-outline" color={color} size={size} />
          ),
        }}
      />
      <Tabs.Screen
        name="characters"
        options={{
          title: "All Characters",
          tabBarLabel: "Characters",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="people-outline" color={color} size={size} />
          ),
        }}
      />
      <Tabs.Screen
        name="favorites"
        options={{
          title: "My Favorites",
          tabBarLabel: "Favorites",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="star-outline" color={color} size={size} />
          ),
        }}
      />
    </Tabs>
  );
}
