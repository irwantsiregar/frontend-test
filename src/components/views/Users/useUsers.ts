import useChangeUrl from "@/hooks/useChangeUrl";
import userServices from "@/services/users.services";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";

const useInventory = () => {
  const [selectedId, setSelectedId] = useState<string>("");

  const { currentLimit, currentPage, currentSearch, isReady } = useChangeUrl();

  const getUsers = async () => {
    let params = `limit=${currentLimit}&page=${currentPage}`;

    if (currentSearch) {
      params += `&search=${currentSearch}`;
    }

    const res = await userServices.getUsers(params);

    const { data } = res;

    return data;
  };

  const {
    data: dataUsers,
    isLoading: isLoadingUsers,
    isRefetching: isRefetchingUsers,
    refetch: refetchUsers,
  } = useQuery({
    queryKey: ["Users", currentPage, currentLimit, currentSearch],
    queryFn: () => getUsers(),
    enabled: !!isReady && !!currentPage && !!currentLimit,
  });

  return {
    dataUsers,
    isLoadingUsers,
    isRefetchingUsers,
    refetchUsers,
    selectedId,
    setSelectedId,
  };
};

export default useInventory;
