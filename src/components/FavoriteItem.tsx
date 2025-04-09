import { StyleSheet, View, Text } from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";

import { Movie } from "@/types";

import colors from "@/constants/colors";

type FavoriteItemProps = {
  movie: Movie;
  onDelete: () => void;
};

export default function FavoriteItem({ movie, onDelete }: FavoriteItemProps) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>{movie.title}</Text>

      <Ionicons
        name="trash-outline"
        size={24}
        color={colors.white}
        onPress={onDelete}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: colors.black,
    borderRadius: 8,
    margin: 12,
    padding: 12,
  },
  title: {
    color: colors.yellow,
    fontSize: 20,
    fontWeight: "600",
  },
});
