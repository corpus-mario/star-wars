import AsyncStorage from "@react-native-async-storage/async-storage";
import path from "path";

import { Movie } from "@/types";

export default function useFavorites() {
  const getMovieId = (movie: Movie) => {
    return path.basename(movie.url.replace(/\/$/, ""));
  };

  const getFavorites = async () => {
    const favorites = await AsyncStorage.getItem("favorites");
    return favorites ? JSON.parse(favorites) : null;
  };

  const deleteFavorite = async (movie: Movie) => {
    const favorites = await getFavorites();

    if (favorites) {
      await AsyncStorage.setItem(
        "favorites",
        JSON.stringify(
          favorites.filter((favorite: Movie) => {
            const favoriteId = getMovieId(favorite);
            const movieId = getMovieId(movie);

            return favoriteId !== movieId;
          })
        )
      );
    }
  };

  const toggleFavorite = async (movie: Movie) => {
    const favorites = await getFavorites();

    if (favorites) {
      const updatedFavorites = (await isFavorite(movie))
        ? favorites.filter((favorite: Movie) => {
            const favoriteId = getMovieId(favorite);
            const movieId = getMovieId(movie);

            return favoriteId !== movieId;
          })
        : [movie, ...favorites];

      await AsyncStorage.setItem("favorites", JSON.stringify(updatedFavorites));
    } else {
      await AsyncStorage.setItem("favorites", JSON.stringify([movie]));
    }
  };

  const isFavorite = async (movie: Movie) => {
    const favorites = await getFavorites();

    if (favorites) {
      return favorites.some((favorite: Movie) => {
        const favoriteId = getMovieId(favorite);
        const movieId = getMovieId(movie);

        return favoriteId === movieId;
      });
    }

    return false;
  };

  return {
    getFavorites,
    deleteFavorite,
    toggleFavorite,
    isFavorite,
  };
}
