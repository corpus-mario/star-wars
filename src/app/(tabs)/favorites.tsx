import { useState, useCallback } from "react";
import { StyleSheet, View, FlatList, RefreshControl } from "react-native";
import { useFocusEffect } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";
import path from "path";

import Loading from "@/components/Loading";
import Empty from "@/components/Empty";
import FavoriteItem from "@/components/FavoriteItem";

import { Movie } from "@/types";

import colors from "@/constants/colors";

export default function FavoritesScreen() {
  const [isLoading, setIsLoading] = useState(false);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [favorites, setFavorites] = useState<Movie[]>([]);

  useFocusEffect(
    useCallback(() => {
      getFavorites();
    }, [])
  );

  const getFavorites = async () => {
    try {
      setIsLoading(true);

      const favorites = await AsyncStorage.getItem("favorites");
      if (favorites) {
        setFavorites(JSON.parse(favorites));
      }
    } catch (error) {
      console.error(error);
    } finally {
      setIsRefreshing(false);
      setIsLoading(false);
    }
  };

  const handleRefresh = () => {
    setIsRefreshing(true);
    getFavorites();
  };

  const handleDelete = async (movie: Movie) => {
    const favorites = await AsyncStorage.getItem("favorites");

    if (favorites) {
      const movieId = path.basename(movie.url.replace(/\/$/, ""));

      const updatedFavorites = JSON.parse(favorites).filter((_movie: Movie) => {
        const _id = path.basename(_movie.url.replace(/\/$/, ""));
        return _id !== movieId;
      });

      await AsyncStorage.setItem("favorites", JSON.stringify(updatedFavorites));
      setFavorites(updatedFavorites);
    }
  };

  if (isLoading) {
    return <Loading />;
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={favorites}
        renderItem={({ item }) => (
          <FavoriteItem movie={item} onDelete={() => handleDelete(item)} />
        )}
        ListEmptyComponent={<Empty text="No favorites found." />}
        refreshControl={
          <RefreshControl
            refreshing={isRefreshing}
            onRefresh={handleRefresh}
            tintColor={colors.yellow}
          />
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
