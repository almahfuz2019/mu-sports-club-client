import Api from "@/Redux/api/baseApi";

const DashboardApi = Api.injectEndpoints({
  endpoints: (builder) => ({
    handleFindDashboardOverview: builder.query<any, any>({
      query: () => {
        return {
          url: "dashboard/overview",
          method: "GET",
        };
      },
    }),
  }),
  overrideExisting: false,
});

export const { useHandleFindDashboardOverviewQuery } = DashboardApi;
