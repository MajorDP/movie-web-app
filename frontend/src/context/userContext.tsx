import { createContext, ReactNode, SetStateAction, useState } from "react";
import { useNavigate } from "react-router-dom";
import { IMovie } from "../interfaces/movies";

interface IAuthData {
  email: string;
  password: string;
}

interface IAuthProviderProps {
  children: ReactNode;
}

interface IUser {
  id: string | null;
  isLoggedIn: boolean;
  savedMovies: Array<{
    id: string;
    img: string;
    title: string;
  }>;
  email: string;
}

export const AuthContext = createContext<{
  user: IUser;
  login: (authData: IAuthData) => Promise<void>;
  logout: () => void;
  removeMovieFromSaved: (movieId: string, userId: string) => Promise<void>;
  addMovieToSaved: (movie: IMovie, userId: string) => Promise<void>;
  setUser: React.Dispatch<SetStateAction<IUser>>;
  error: string | null;
}>({
  user: { id: null, isLoggedIn: false, savedMovies: [], email: "" },
  login: async () => {},
  logout: () => {},
  removeMovieFromSaved: async () => {},
  addMovieToSaved: async () => {},
  setUser: () => {},
  error: null,
});

export function AuthProvider({ children }: IAuthProviderProps) {
  const navigate = useNavigate();
  const storedUser = sessionStorage.getItem("user");

  const [user, setUser] = useState<IUser>(
    storedUser
      ? JSON.parse(storedUser)
      : {
          id: null,
          isLoggedIn: false,
          savedMovies: [],
          email: "",
        }
  );

  const [error, setError] = useState<string | null>(null);

  const login = async (authData: IAuthData): Promise<void> => {
    const res = await fetch("http://localhost:5000/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: authData.email,
        password: authData.password,
      }),
    });
    if (!res.ok) {
      const errorData = await res.json();
      setError(errorData.message);
      return;
    }
    const data = await res.json();

    setUser(data);
    setError(null);

    sessionStorage.setItem(
      "user",
      JSON.stringify({
        id: data.id,
        isLoggedIn: data.isLoggedIn,
        email: data.email,
        savedMovies: data.savedMovies,
      })
    );

    navigate("/");
  };

  const logout = () => {
    setUser({
      id: null,
      isLoggedIn: false,
      savedMovies: [],
      email: "",
    });

    sessionStorage.removeItem("user");

    navigate("/auth");
  };

  const addMovieToSaved = async (movie: IMovie, userId: string) => {
    const movieObj = {
      id: movie.id,
      title: movie.title,
      img: movie.img,
    };

    const res = await fetch("http://localhost:5000/auth/movies/user/save", {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        movie: movieObj,
        userId,
      }),
    });

    const data = await res.json();
    setUser((user) => {
      return { ...user, savedMovies: data.savedMovies };
    });

    sessionStorage.setItem(
      "user",
      JSON.stringify({
        id: user.id,
        isLoggedIn: user.isLoggedIn,
        savedMovies: data.savedMovies,
      })
    );
  };

  const removeMovieFromSaved = async (movieId: string, userId: string) => {
    const res = await fetch("http://localhost:5000/auth/movies/user/remove", {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        movieId,
        userId,
      }),
    });

    const data = await res.json();
    setUser((user) => {
      return { ...user, savedMovies: data.savedMovies };
    });

    sessionStorage.setItem(
      "user",
      JSON.stringify({
        id: user.id,
        isLoggedIn: user.isLoggedIn,
        savedMovies: data.savedMovies,
      })
    );
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        logout,
        login,
        error,
        setUser,
        removeMovieFromSaved,
        addMovieToSaved,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
