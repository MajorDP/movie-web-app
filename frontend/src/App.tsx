import { BrowserRouter, Route, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage";
import Navigation from "./components/Navigation";
import MoviesPage from "./pages/MoviesPage";
import MoviePage from "./pages/MoviePage";
import AuthPage from "./pages/AuthPage";
import Watchlist from "./pages/Watchlist";
import { AuthProvider } from "./context/userContext";
import ProtectedRoute from "./components/ProtectedRoute";

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Navigation />
        <Routes>
          <Route element={<ProtectedRoute />}>
            <Route path="/watchlist" element={<Watchlist />} />
          </Route>
          <Route path="/" element={<HomePage />} />
          <Route path="/movies" element={<MoviesPage />} />
          <Route path="/movies/:id" element={<MoviePage />} />
          <Route path="/auth" element={<AuthPage />} />
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
