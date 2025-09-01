import {
  BaseQueryFn,
  createApi,
  FetchArgs,
  fetchBaseQuery,
  FetchBaseQueryError,
} from "@reduxjs/toolkit/query/react";

export const baseURL = "http://localhost:5000/api/v1";

// Define the base query with `fetchBaseQuery`
const baseQuery = fetchBaseQuery({
  baseUrl: baseURL,
  credentials: "include",
});

// Custom `baseQueryWithReAuth` to handle token refresh logic
export const baseQueryWithReAuth: BaseQueryFn<
  string | FetchArgs,
  unknown,
  FetchBaseQueryError
> = async (args, api, extraOptions) => {
  let result = await baseQuery(args, api, extraOptions);

  if (result.error && result.error.status === 401) {
    // Attempt to refresh the token
    const refreshResult = await baseQuery(
      "/auth/refresh-token",
      api,
      extraOptions
    );

    if (refreshResult.data) {
      // Retry the original query
      result = await baseQuery(args, api, extraOptions);
    } else {
      // Dispatch a logout action if token refresh fails
      api.dispatch({ type: "auth/logout" });
    }
  }

  return result;
};

// Define the `blogApiWork` API slice
const Api = createApi({
  reducerPath: "immigrationApi",
  baseQuery: baseQueryWithReAuth,
  tagTypes: [
    "EventCategory",
    "Sponsor",
    "Video",
    "Player",
    "Committee",
    "AllCommittee",
    "Performer",
    "Stats",
    "Achievement",
    "Gallery",
    "Contact",
  ], // ✅ MUST BE PRESENT
  endpoints: () => ({}),
});

export default Api;
