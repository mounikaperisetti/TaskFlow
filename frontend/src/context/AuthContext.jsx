import { createContext, useContext, useEffect, useState } from "react";

const AuthContext = createContext(null);

function AuthProvider({ children }) {
  const [token, setToken] = useState(() => {
    return sessionStorage.getItem("taskflow-access-token");
  });
  const [user, setUser] = useState(null);
  const [memberships, setMemberships] = useState([]);
  const [loading, setLoading] = useState(true);

  async function fetchCurrentUser(accessToken) {
    try {
      const response = await fetch("http://127.0.0.1:5000/api/v1/auth/me", {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });

      if (!response.ok) {
        sessionStorage.removeItem("taskflow-access-token");
        setToken(null);
        setUser(null);
        setMemberships([]);
        return null;
      }

      const data = await response.json();
      setUser(data.user);
      setMemberships(data.memberships || []);
      return data;
    } catch {
      setUser(null);
      setMemberships([]);
      return null;
    }
  }

  async function login(accessToken) {
    sessionStorage.setItem("taskflow-access-token", accessToken);
    setToken(accessToken);
    return await fetchCurrentUser(accessToken);
  }
  useEffect(() => {
    if (!token) {
      setLoading(false);
      return;
    }

    fetchCurrentUser(token).finally(() => {
      setLoading(false);
    });
  }, [token]);

  async function login(accessToken) {
    sessionStorage.setItem("taskflow-access-token", accessToken);
    setToken(accessToken);

    const success = await fetchCurrentUser(accessToken);
    return success;
  }

  function logout() {
    sessionStorage.removeItem("taskflow-access-token");
    setToken(null);
    setUser(null);
    setMemberships([]);
  }

  return (
    <AuthContext.Provider
      value={{
        token,
        user,
        memberships,
        loading,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}

export default AuthProvider;
