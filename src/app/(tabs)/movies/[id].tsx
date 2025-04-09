import { useState, useEffect } from "react";
import { StyleSheet, ScrollView, View, Text } from "react-native";
import { useLocalSearchParams } from "expo-router";
import { format } from "date-fns";

import Loading from "@/components/Loading";
import Empty from "@/components/Empty";

import { Movie } from "@/types";

import colors from "@/constants/colors";

export default function MovieDetailsScreen() {
  const [isLoading, setIsLoading] = useState(false);
  const [movie, setMovie] = useState<Movie>();
  const { id } = useLocalSearchParams();

  useEffect(() => {
    const getMovie = async () => {
      try {
        setIsLoading(true);

        const response = await fetch(`https://www.swapi.tech/api/films/${id}`);
        const data = await response.json();
        setMovie(data.result.properties);
      } catch (error) {
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    };

    getMovie();
  }, []);

  if (isLoading) {
    return <Loading />;
  }

  if (!movie) {
    return <Empty />;
  }

  return (
    <ScrollView>
      <View style={styles.container}>
        <Text style={styles.title}>{movie.title}</Text>

        <View style={styles.detailsContainer}>
          <Text style={styles.details}>Episode: {movie.episode_id}</Text>
          <Text style={styles.details}>Director: {movie.director}</Text>
          <Text style={styles.details}>Producer: {movie.producer}</Text>
          <Text style={styles.details}>
            Release Date {format(movie.release_date, "MMMM d, yyyy")}
          </Text>
        </View>

        <Text style={styles.openingCrawl}>{movie.opening_crawl}</Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 12,
    gap: 24,
  },
  title: {
    color: colors.yellow,
    fontSize: 24,
    fontWeight: "600",
  },
  detailsContainer: {
    gap: 12,
  },
  details: {
    color: colors.white,
    fontSize: 16,
  },
  openingCrawl: {
    color: colors.white,
    fontStyle: "italic",
    letterSpacing: 2,
    fontSize: 16,
  },
});
