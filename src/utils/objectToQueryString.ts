export default function objectToQueryString(params: {
  limit: string | number;
  page: string | number;
  search: string;
}): string {
  const urlSearchParams = new URLSearchParams();

  // Append parameters to URLSearchParams.
  // URLSearchParams automatically handles URL encoding.
  urlSearchParams.append("limit", params.limit.toString());
  urlSearchParams.append("page", params.page.toString());

  // Only append search if it's not an empty string, to keep the URL cleaner
  if (params.search) {
    urlSearchParams.append("search", params.search);
  }

  // Convert to string and prepend '?' if there are parameters
  const queryString = urlSearchParams.toString();
  return !!queryString ? `?${queryString}` : "";
}
