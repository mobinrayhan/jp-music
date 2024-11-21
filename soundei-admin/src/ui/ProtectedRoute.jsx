import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import useUser from "../features/auth/useUser";

export default function ProtectedRoute({ children }) {
  const { isPending, user } = useUser();
  const navigate = useNavigate();

  useEffect(() => {
    if (!user?.isActive && !isPending) {
      navigate("/login");
    }
  }, [isPending, user?.isActive, navigate]);

  if (user) return children;
}
