import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools/production";
import { Toaster } from "react-hot-toast";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import DashboardPage from "./features/dashboard/DashboardPage.jsx";
import UserDetail from "./features/users/UserDetail.jsx";
import AllAudios from "./pages/audios/AllAudios.jsx";
import Categories from "./pages/audios/Categories.jsx";
import UploadAudios from "./pages/audios/UploadAudios.jsx";
import Login from "./pages/auth/Login.jsx";
import NotFound from "./pages/others/NotFound.jsx";
import General from "./pages/settings/General.jsx";
import Notification from "./pages/settings/Notification.jsx";
import Payments from "./pages/settings/Payments.jsx";
import AllUsers from "./pages/users/AllUsers.jsx";
import BlockList from "./pages/users/BlockList.jsx";
import CreateNewUser from "./pages/users/CreateNewUser.jsx";
import RolesAndPermission from "./pages/users/RolesAndPermission.jsx";
import AppLayout from "./ui/AppLayout";
import ProtectedRoute from "./ui/ProtectedRoute.jsx";

export default function App() {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        staleTime: 0,
      },
    },
  });

  const isRunningInDev = import.meta.env.DEV;

  return (
    <QueryClientProvider client={queryClient}>
      {isRunningInDev && <ReactQueryDevtools initialIsOpen={false} />}

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
              <Route index element={<Navigate to={"overview"} />} />
              <Route path="overview" element={<DashboardPage />} />
            </Route>
            <Route path="users">
              <Route index element={<Navigate to={"all"} />} />
              <Route path="all" element={<AllUsers />} />
              <Route path="roles" element={<RolesAndPermission />} />
              <Route path="blocked" element={<BlockList />} />
              <Route path="new" element={<CreateNewUser />} />
              <Route path="detail/:id" element={<UserDetail />} />
            </Route>{" "}
            <Route path="audio">
              <Route index element={<Navigate to={"all"} />} />
              <Route path="all" element={<AllAudios />} />
              <Route path="upload" element={<UploadAudios />} />
              <Route path="categories" element={<Categories />} />
            </Route>
            <Route path={"settings"}>
              <Route index element={<Navigate to={"general"} />} />
              <Route path="general" element={<General />} />
              <Route path="payment" element={<Payments />} />
              <Route path="notifications" element={<Notification />} />
            </Route>
          </Route>

          <Route path="*" element={<NotFound />} />
          <Route path={"/login"} element={<Login />} />
        </Routes>

        <Toaster
          position="top-center"
          gutter={12}
          containerStyle={{ margin: "8px" }}
          toastOptions={{
            success: {
              duration: 3000,
            },
            error: {
              duration: 5000,
            },
            style: {
              fontSize: "16px",
              maxWidth: "500px",
              padding: "16px 24px",
              backgroundColor: "var(--color-grey-0)",
              color: "var(--color-grey-700)",
            },
          }}
        />
      </BrowserRouter>
    </QueryClientProvider>
  );
}
