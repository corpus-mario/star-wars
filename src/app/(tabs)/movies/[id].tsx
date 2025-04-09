import { useState, useCallback } from "react";
import { StyleSheet, ScrollView, View, Text } from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import { useLocalSearchParams, Stack, useFocusEffect } from "expo-router";
import { format } from "date-fns";
import AsyncStorage from "@react-native-async-storage/async-storage";
import path from "path";

import Loading from "@/components/Loading";
import Empty from "@/components/Empty";

import { Movie } from "@/types";

import colors from "@/constants/colors";

export default function MovieDetailsScreen() {
  const [isLoading, setIsLoading] = useState(false);
  const [movie, setMovie] = useState<Movie>();
  const [isFavorite, setIsFavorite] = useState(false);
  const { id } = useLocalSearchParams();

  useFocusEffect(
    useCallback(() => {
      getMovie();
    }, [])
  );

  const getMovie = async () => {
    try {
      setIsLoading(true);

      const response = await fetch(`https://www.swapi.tech/api/films/${id}`);
      const data = await response.json();
      setMovie(data.result.properties);

      const favorites = await AsyncStorage.getItem("favorites");
      if (favorites) {
        setIsFavorite(
          JSON.parse(favorites).some((movie: Movie) => {
            const movieId = path.basename(movie.url.replace(/\/$/, ""));

            return movieId === id;
          })
        );
      }
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  const toggleFavorite = async () => {
    try {
      const favorites = await AsyncStorage.getItem("favorites");

      if (favorites) {
        const parsedFavorites = JSON.parse(favorites);
        const updatedFavorites = isFavorite
          ? parsedFavorites.filter((movie: Movie) => {
              const movieId = path.basename(movie.url.replace(/\/$/, ""));
              return movieId !== id;
            })
          : [movie, ...parsedFavorites];

        await AsyncStorage.setItem(
          "favorites",
          JSON.stringify(updatedFavorites)
        );
      } else {
        await AsyncStorage.setItem("favorites", JSON.stringify([movie]));
      }

      setIsFavorite((v) => !v);
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
              name={isFavorite ? "star" : "star-outline"}
              size={24}
              color={colors.white}
              onPress={toggleFavorite}
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
