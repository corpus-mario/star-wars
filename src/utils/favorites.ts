import AsyncStorage from "@react-native-async-storage/async-storage";
import path from "path";

import { Movie } from "@/types";

export const getMovieId = (movie: Movie) => {
  return path.basename(movie.url.replace(/\/$/, ""));
};

export const isFavorite = async (movie: Movie) => {
  const favorites = await getFavorites();

  if (favorites) {
    const movieId = getMovieId(movie);

    return favorites.some(
      (favorite: Movie) => getMovieId(favorite) === movieId
    );
  }

  return false;
};

export const getFavorites = async () => {
  const favorites = await AsyncStorage.getItem("favorites");
  return favorites ? JSON.parse(favorites) : null;
};

export const deleteFavorite = async (movie: Movie) => {
  const favorites = await getFavorites();

  if (favorites) {
    const movieId = getMovieId(movie);

    await AsyncStorage.setItem(
      "favorites",
      JSON.stringify(
        favorites.filter((favorite: Movie) => getMovieId(favorite) !== movieId)
      )
    );
  }
};

export const toggleFavorite = async (movie: Movie) => {
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
