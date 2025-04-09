import { StyleSheet, View, ActivityIndicator } from "react-native";

import colors from "@/constants/colors";

export default function Loading() {
  return (
    <View style={styles.container}>
      <ActivityIndicator color={colors.yellow} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
