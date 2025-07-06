import useChangeUrl from "@/hooks/useChangeUrl";
import inventoryServices from "@/services/inventory.services";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";

const useInventory = () => {
  const [selectedId, setSelectedId] = useState<string>("");

  const { currentLimit, currentPage, currentSearch, isReady } = useChangeUrl();

  const getInventories = async () => {
    let params = `limit=${currentLimit}&page=${currentPage}`;

    if (currentSearch) {
      params += `&search=${currentSearch}`;
    }

    const res = await inventoryServices.getInventories(params);

    const { data } = res;

    return data;
  };

  const {
    data: dataInventories,
    isLoading: isLoadingInventories,
    isRefetching: isRefetchingInventories,
    refetch: refetchInventories,
  } = useQuery({
    queryKey: ["Inventories", currentPage, currentLimit, currentSearch],
    queryFn: () => getInventories(),
    enabled: !!isReady && !!currentPage && !!currentLimit,
  });

  return {
    dataInventories,
    isLoadingInventories,
    isRefetchingInventories,
    refetchInventories,
    selectedId,
    setSelectedId,
  };
};

export default useInventory;
