import { StyleSheet, View, Text } from "react-native";
import { format } from "date-fns";

import { Movie } from "@/types";

import colors from "@/constants/colors";

type MovieItemProps = {
  movie: Movie;
};

export default function MovieItem({ movie }: MovieItemProps) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>{movie.title}</Text>
      <Text style={styles.details}>Episode: {movie.episode_id}</Text>
      <Text style={styles.details}>
        Released: {format(movie.release_date, "MMMM d, yyyy")}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.black,
    borderRadius: 8,
    margin: 12,
    padding: 12,
  },
  title: {
    color: colors.yellow,
    fontSize: 20,
    fontWeight: "600",
    marginBottom: 8,
  },
  details: {
    color: colors.white,
  },
});
