import { useState, useCallback } from "react";
import { StyleSheet, ScrollView, View, Text } from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import { useLocalSearchParams, Stack, useFocusEffect } from "expo-router";
import { format } from "date-fns";

import Loading from "@/components/Loading";
import Empty from "@/components/Empty";

import useFavorites from "@/hooks/useFavorites";

import { Movie } from "@/types";

import colors from "@/constants/colors";

export default function MovieDetailsScreen() {
  const [isLoading, setIsLoading] = useState(false);
  const [movie, setMovie] = useState<Movie>();
  const [favorite, setFavorite] = useState(false);
  const { isFavorite, toggleFavorite } = useFavorites();
  const { id } = useLocalSearchParams();

  useFocusEffect(
    useCallback(() => {
      fetchMovie();
    }, [])
  );

  const fetchMovie = async () => {
    try {
      setIsLoading(true);

      const response = await fetch(`https://www.swapi.tech/api/films/${id}`);
      const data = await response.json();

      setMovie(data.result.properties);
      setFavorite(await isFavorite(data.result.properties));
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleToggle = async () => {
    try {
      if (movie) {
        await toggleFavorite(movie);
        setFavorite((v) => !v);
      }
    } catch (error) {
      console.error(error);
    }
  };

  if (isLoading) {
    return <Loading />;
  }

  if (!movie) {
    return <Empty />;
  }

  return (
    <ScrollView>
      <Stack.Screen
        options={{
          headerRight: () => (
            <Ionicons
              name={favorite ? "star" : "star-outline"}
              size={24}
              color={colors.white}
              onPress={handleToggle}
            />
          ),
        }}
      />

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
    fontSize: 20,
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
