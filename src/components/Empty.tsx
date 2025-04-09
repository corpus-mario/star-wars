import { StyleSheet, View, Text } from "react-native";

import colors from "@/constants/colors";

type EmptyProps = {
  text?: string;
};

export default function Empty({ text = "No item found" }: EmptyProps) {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>{text}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    height: 80,
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    color: colors.white,
  },
});
