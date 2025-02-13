import { createContext, ReactNode, useState } from "react";
import { useNavigate } from "react-router-dom";

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
}

export const AuthContext = createContext<{
  user: IUser;
  login: (authData: IAuthData) => Promise<void>;
  logout: () => void;
  error: string | null;
}>({
  user: { id: null, isLoggedIn: false },
  login: async () => {},
  logout: () => {},
  error: null,
});

export function AuthProvider({ children }: IAuthProviderProps) {
  const navigate = useNavigate();
  const storedUser = localStorage.getItem("user");

  const [user, setUser] = useState<IUser>(
    storedUser ? JSON.parse(storedUser) : { id: null, isLoggedIn: false }
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

    localStorage.setItem("user", JSON.stringify(data));

    navigate("/");
  };

  const logout = () => {
    setUser({
      id: null,
      isLoggedIn: false,
    });

    localStorage.removeItem("user");

    navigate("/auth");
  };

  return (
    <AuthContext.Provider value={{ user, logout, login, error }}>
      {children}
    </AuthContext.Provider>
  );
}
