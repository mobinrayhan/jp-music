import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import useUser from "../features/auth/useUser";
import { getToken } from "../lib/getToken";
import FullPageSpinner from "./FullPageSpinner";

export default function ProtectedRoute({ children }) {
  const { isPending, user } = useUser();
  const token = getToken();
  const navigate = useNavigate();

  useEffect(() => {
    if ((!user?.isActive && !isPending) || !token) {
      navigate("/login");
    }
  }, [isPending, user?.isActive, navigate, token]);

  if (isPending) return <FullPageSpinner />;

  if (user && token) return children;
}
