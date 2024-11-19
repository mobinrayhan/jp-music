import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import AllAudios from "./pages/audios/AllAudios.jsx";
import Categories from "./pages/audios/Categories.jsx";
import UploadAudios from "./pages/audios/UploadAudios.jsx";
import Login from "./pages/auth/Login.jsx";
import General from "./pages/settings/General.jsx";
import Notification from "./pages/settings/Notification.jsx";
import Payments from "./pages/settings/Payments.jsx";
import AllUsers from "./pages/users/AllUsers.jsx";
import BlockList from "./pages/users/BlockList.jsx";
import RolesAndPermission from "./pages/users/RolesAndPermission.jsx";
import AppLayout from "./ui/AppLayout";
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
          <Route index element={<Navigate to={"/dashboard/overview"} />} />
          <Route path="dashboard">
            <Route path="overview" element={<h1>Hello overview</h1>} />
          </Route>
          <Route path="users">
            <Route path="all" element={<AllUsers />} />
            <Route path="roles" element={<RolesAndPermission />} />
            <Route path="blocked" element={<BlockList />} />
          </Route>{" "}
          <Route path="audio">
            <Route path="all" element={<AllAudios />} />
            <Route path="upload" element={<UploadAudios />} />
            <Route path="categories" element={<Categories />} />
          </Route>
          <Route path={"settings"}>
            <Route path="general" element={<General />} />
            <Route path="payment" element={<Payments />} />
            <Route path="notifications" element={<Notification />} />
          </Route>
        </Route>
        <Route path={"/login"} element={<Login />} />
      </Routes>
    </BrowserRouter>
  );
}
