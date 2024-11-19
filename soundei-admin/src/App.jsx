import AppLayout from "./ui/AppLayout";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "./pages/Login.jsx";
import ProtectedRoute from "./ui/ProtectedRoute.jsx";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          element={
            <ProtectedRoute>
              <AppLayout />;
            </ProtectedRoute>
          }
        >
          <Route path={"/"} />
          <Route path={"/hello"} element={<h1>hello form </h1>} />
        </Route>
        <Route path={"/login"} element={<Login />} />
      </Routes>
    </BrowserRouter>
  );
}
