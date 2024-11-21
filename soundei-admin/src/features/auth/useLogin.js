import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { loginUser } from "../../services/apiAuth";

export default function useLogin() {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const { mutate: login, isPending } = useMutation({
    mutationFn: loginUser,
    onSuccess: (user) => {
      queryClient.setQueryData(["user"], user);
      localStorage.setItem("user", JSON.stringify(user));
      toast.success(user.message || "User Logged In Successfully!");
      navigate("/dashboard/overview");
    },
    onError: ({ response }) => {
      toast.error(response?.data?.message || "Something Went Wrong !");
    },
  });

  return { login, isPending };
}
