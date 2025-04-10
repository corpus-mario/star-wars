import { useState, useCallback } from "react";
import { StyleSheet, View, FlatList, RefreshControl } from "react-native";
import { useFocusEffect } from "expo-router";

import Loading from "@/components/Loading";
import Empty from "@/components/Empty";
import FavoriteItem from "@/components/FavoriteItem";

import { Movie } from "@/types";

import useFavorites from "@/hooks/useFavorites";

import colors from "@/constants/colors";

export default function FavoritesScreen() {
  const [isLoading, setIsLoading] = useState(false);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [favorites, setFavorites] = useState<Movie[]>([]);
  const { getFavorites, deleteFavorite } = useFavorites();

  useFocusEffect(
    useCallback(() => {
      fetchFavorites();
    }, [])
  );

  const fetchFavorites = async () => {
    try {
      setIsLoading(true);
      setFavorites(await getFavorites());
    } catch (error) {
      console.error(error);
    } finally {
      setIsRefreshing(false);
      setIsLoading(false);
    }
  };

  const handleRefresh = () => {
    setIsRefreshing(true);
    fetchFavorites();
  };

  const handleDelete = async (movie: Movie) => {
    await deleteFavorite(movie);
    await fetchFavorites();
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
