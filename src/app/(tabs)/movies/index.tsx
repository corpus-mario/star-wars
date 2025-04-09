import { useState, useEffect } from "react";
import { StyleSheet, View, FlatList, RefreshControl } from "react-native";

import Loading from "@/components/Loading";
import MovieItem from "@/components/MovieItem";
import Empty from "@/components/Empty";

import { Movie } from "@/types";

import colors from "@/constants/colors";

export default function MoviesScreen() {
  const [isLoading, setIsLoading] = useState(false);
  const [movies, setMovies] = useState<Movie[]>([]);
  const [isRefreshing, setIsRefreshing] = useState(false);

  useEffect(() => {
    getMovies();
  }, []);

  const getMovies = async () => {
    try {
      setIsLoading(true);

      const response = await fetch("https://www.swapi.tech/api/films");
      const data = await response.json();
      setMovies(data.result.map((res: any) => res.properties));
    } catch (error) {
      console.error(error);
    } finally {
      setIsRefreshing(false);
      setIsLoading(false);
    }
  };

  const handleRefresh = () => {
    setIsRefreshing(true);
    getMovies();
  };

  if (isLoading) {
    return <Loading />;
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={movies}
        renderItem={({ item }) => <MovieItem movie={item} />}
        ListEmptyComponent={<Empty text="No movies found." />}
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
