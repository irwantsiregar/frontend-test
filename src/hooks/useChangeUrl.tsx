import {
  DELAY,
  LIMIT_DEFAULT,
  PAGE_DEFAULT,
} from "@/constants/limit.constants";
import useDebounce from "@/hooks/useDebounce";
import objectToQueryString from "@/utils/objectToQueryString";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { ChangeEvent } from "react";

const useChangeUrl = () => {
  const router = useRouter();
  const debounce = useDebounce();

  const pathname = usePathname();
  const searchParams = useSearchParams();

  const currentLimit = searchParams.get("limit") || LIMIT_DEFAULT;
  const currentPage = searchParams.get("page") || PAGE_DEFAULT;
  const currentSearch = searchParams.get("search") || "";

  const query = {
    limit: currentLimit,
    page: currentPage,
    search: currentSearch,
  };

  const isReady = !!objectToQueryString(query);

  const setURL = () => {
    router.replace(objectToQueryString(query));
  };

  const handleChangePage = (page: number) => {
    router.push(
      pathname +
        objectToQueryString({
          ...query,
          page,
        }),
    );
  };

  const handleChangeLimit = (e: ChangeEvent<HTMLSelectElement>) => {
    const selectedLimit = e.target.value;

    router.push(
      pathname +
        objectToQueryString({
          ...query,
          limit: selectedLimit,
          page: PAGE_DEFAULT,
        }),
    );
  };

  const handleSearch = (e: ChangeEvent<HTMLInputElement>) => {
    debounce(() => {
      const search = e.target.value;

      router.push(
        pathname +
          objectToQueryString({
            ...query,
            page: PAGE_DEFAULT,
            search,
          }),
      );
    }, DELAY);
  };

  const handleClearSearch = () => {
    router.push(
      pathname +
        objectToQueryString({
          ...query,
          page: PAGE_DEFAULT,
          search: "",
        }),
    );
  };

  return {
    currentLimit,
    currentPage,
    currentSearch,

    handleChangePage,
    handleChangeLimit,
    handleSearch,
    handleClearSearch,

    setURL,
    isReady,
  };
};

export default useChangeUrl;
