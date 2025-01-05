import { useQuery } from "@tanstack/react-query";
import { getGeneralData } from "../../services/apiSettings";

export default function useUpdateSettings() {
  const { isPending, data, error } = useQuery({
    queryFn: getGeneralData,
    queryKey: ["general"],
  });

  return { isPending, data, error };
}
