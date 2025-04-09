import { useState, useEffect } from "react";
import { StyleSheet, View, FlatList, RefreshControl } from "react-native";

import Loading from "@/components/Loading";
import FilmItem from "@/components/FilmItem";
import Empty from "@/components/Empty";

import { Film } from "@/types";

import colors from "@/constants/colors";

export default function FilmsScreen() {
  const [isLoading, setIsLoading] = useState(false);
  const [films, setFilms] = useState<Film[]>([]);
  const [isRefreshing, setIsRefreshing] = useState(false);

  useEffect(() => {
    getFilms();
  }, []);

  const getFilms = async () => {
    try {
      setIsLoading(true);

      const response = await fetch("https://www.swapi.tech/api/films");
      const data = await response.json();
      setFilms(data.result.map((res: any) => res.properties));
    } catch (error) {
      console.error(error);
    } finally {
      setIsRefreshing(false);
      setIsLoading(false);
    }
  };

  const handleRefresh = () => {
    setIsRefreshing(true);
    getFilms();
  };

  if (isLoading) {
    return <Loading />;
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={films}
        renderItem={({ item }) => <FilmItem film={item} />}
        ListEmptyComponent={<Empty text="No items found." />}
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
