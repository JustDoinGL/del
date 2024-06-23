import { useState, createContext, useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import { RequireAuth } from "./hoc/RequireAuth";
import { NeedAuth } from "./hoc/NeedAuth";
import LoginPage from "./pages/Login/LoginPage";
import createToken from "./utils/cerateToken";
import checkToken from "./utils/checkToken";
import ContentLayout from "./layouts/ContentLayout";
import ContentPage from "./pages/ContentPage";
import { url } from "./utils/const";
import AuthPage from "./pages/Login/AuthPage";

const DataContext = createContext();

function App() {
  const [roles, setRoles] = useState(['Not Found']);
  const [email, setEmail] = useState('');
  const [token, setToken] = useState(checkToken());

  useEffect(() => {
    fetch(`${url}/get-roles`)
      .then(response => response.json())
      .then(data => setRoles(data.roles))
      .catch(error => console.error('Error fetching roles:', error));
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])


  const updateEmail = (email) => {
    setEmail(email);
  };

  const updateToken = (newToken) => {
    createToken(newToken);
    setToken(newToken);
  };

  return (
    <DataContext.Provider value={{roles, token, updateToken, email, updateEmail}}>
      <Routes>
        <Route
          path="/"
          element={
            <NeedAuth>
              <LoginPage />
            </NeedAuth>
          }
        />
        <Route
          path="/auth"
          element={
            <NeedAuth>
              <AuthPage />
            </NeedAuth>
          }
        />
        <Route
          path="/content"
          element={
            <RequireAuth>
              <ContentLayout />
            </RequireAuth>
          }
        >
          <Route index element={<ContentPage />} />
        </Route>
      </Routes>
    </DataContext.Provider>
  );
}

export default App;

export { DataContext };