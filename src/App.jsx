import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Product from "./Pages/Product";
import Pricing from "./Pages/Pricing";
import AppLayout from "./Pages/AppLayout";
import Login from "./Pages/Login";
import PageNotFound from "./Pages/PageNotFound";
import CityList from "./Components/CityList";
import CountryList from "./Components/CountryList";
import Homepage from "./Pages/Homepage";
import City from "./Components/City";
import Form from "./Components/Form";
import { CitiesProvider } from "./Contexts/ContextCities";
import { AuthProvider } from "./Contexts/fakeAuthContext";
import ProtectedRoute from "./Pages/ProtectedRoute";
import { useEffect, useState } from "react";

export default function App() {
  const [jwtToken, setJwtToken] = useState("");
  const [tokenFetched, setTokenFetched] = useState(false);

  useEffect(() => {
    async function getToken() {
      try {
        if (!tokenFetched) {
          const response = await fetch(
            "https://backend-worldwise-production.up.railway.app/auth/login",
            {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                email: "Durgesh",
                password: "abc",
              }),
            }
          );

          if (response.ok) {
            const data = await response.json();
            setJwtToken(data.jwtToken);
            setTokenFetched(true);
          } else {
            console.error("Login failed");
          }
        }
      } catch (error) {
        console.error("Error during login", error);
      }
    }

    // getToken();
  }, []);

  // Render the App component only when the token is fetched
  return tokenFetched ? (
    //<AuthProvider>
      //<CitiesProvider jwtToken={jwtToken}>
        //<BrowserRouter>
          //<Routes>
            //{/* <Route path="/" element={<HomePage />} /> */}
            //<Route index element={<Homepage />} />
            //<Route path="product" element={<Product />} />
            //<Route path="pricing" element={<Pricing />} />
            //<Route path="/login" element={<Login />} />
            //<Route
              //path="app"
              //element={
                //<ProtectedRoute>
                  //<AppLayout />
                //</ProtectedRoute>
              //}
            //>
    <h1>HI</h1>
              <Route index element={<Navigate replace to="cities" />} />

              <Route path="cities" element={<CityList />} />
              <Route path="cities/:id" element={<City />} />
              <Route path="countries" element={<CountryList />} />
              <Route path="form" element={<Form />} />
            </Route>
            <Route path="*" element={<PageNotFound />} />
          </Routes>
        </BrowserRouter>
      </CitiesProvider>
    </AuthProvider>
  ) : null;
}
