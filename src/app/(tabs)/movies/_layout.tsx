import { Stack } from "expo-router";

import colors from "@/constants/colors";

export default function MoviesLayout() {
  return (
    <Stack
      screenOptions={{
        headerStyle: {
          backgroundColor: colors.black,
        },
        headerTintColor: colors.yellow,
        headerTitleStyle: {
          fontWeight: "bold",
        },
        headerShadowVisible: false,
        contentStyle: {
          backgroundColor: colors.grey,
        },
      }}
    >
      <Stack.Screen name="index" options={{ title: "All Movies" }} />
      <Stack.Screen name="[id]" options={{ title: "Movie Details" }} />
    </Stack>
  );
}
