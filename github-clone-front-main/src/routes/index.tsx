import { Route, Routes, useNavigate } from "react-router-dom";
import { CreateRepository, Login, Profile, Register, Repo } from "../pages";
import { ProtectedRoute } from "../components";
import { useState } from "react";
import { useRequest } from "../hooks/useFetch";

export const RoutesList = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { apiRequest } = useRequest();
  const navigate = useNavigate();

  const login = async (email: string, password: string) => {
    setIsLoading(true);
    try {
      const { apiData, loading } = await apiRequest({ email, password }, "api/auth/login", "post");
      setIsLoading(loading);
      console.log(apiData);

      if (apiData.success) {
        setIsAuthenticated(true);
        navigate(`/${apiData.data.id}`);
      } else {
        console.error("Login failed");
      }
    } catch (error) {
      console.error("Error during login:", error);
      setIsLoading(false);
    }
  };

  // const logout = () => {
  //   // Lógica de cierre de sesión aquí
  //   setIsAuthenticated(false);
  // };

  return (
    <>
      <div>
        {/* Espacio para el header */}
        <Routes>
          <Route path="/" element={<Login onLogin={login} isLoading={isLoading} />} /> //TODO: cambiar el componente de
          login por el de la landing page
          <Route path="/register" element={<Register />} />
          <Route element={<ProtectedRoute isAuthenticated={isAuthenticated} />}>
            <Route path="/:username" element={<Profile />} />
            <Route path="/:username/:repo" element={<Repo />} />
            <Route path="/:username/new" element={<CreateRepository />} />
          </Route>
        </Routes>
      </div>
    </>
  );
};
