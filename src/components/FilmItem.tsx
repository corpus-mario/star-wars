import { StyleSheet, View, Text } from "react-native";
import { format } from "date-fns";

import { Film } from "@/types";

import colors from "@/constants/colors";

type FilmItemProps = {
  film: Film;
};

export default function FilmItem({ film }: FilmItemProps) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>{film.title}</Text>
      <Text style={styles.details}>Episode: {film.episode_id}</Text>
      <Text style={styles.details}>
        Released: {format(film.release_date, "MMMM d, yyyy")}
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
    marginBottom: 8,
  },
  details: {
    color: colors.white,
  },
});
