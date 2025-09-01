import Api from "@/Redux/api/baseApi";

const StatsApi = Api.injectEndpoints({
  endpoints: (builder) => ({
    // ➕ Create new media
    handleCreateStats: builder.mutation<any, any>({
      query: (payload) => ({
        url: "/stats/create",
        method: "POST",
        body: payload,
      }),
      invalidatesTags: [{ type: "Stats", id: "LIST" }],
    }),

    // 🔍 Find all media
    handleFindStats: builder.query<any, any>({
      query: ({
        page = 1,
        limit = 1000,
        search = "",
        status,
        isTrash,
        type,
      }) => ({
        url: "/stats/find",
        method: "GET",
        params: { page, limit, name: search, status, isTrash, type },
      }),
      providesTags: (result) =>
        result?.data
          ? [
              { type: "Stats", id: "LIST" },
              ...result.data.map((Stats: any) => ({
                type: "Stats",
                id: Stats.id,
              })),
            ]
          : [{ type: "Stats", id: "LIST" }],
    }),

    // 🔍 Find single media by slug
    handleFindSingleStats: builder.query<any, any>({
      query: (slug) => ({
        url: `/stats/find-single/${slug}`,
        method: "GET",
      }),
      providesTags: (result, error, slug) => [{ type: "Stats", id: slug }],
    }),

    // ✏️ Update media
    handleUpdateStats: builder.mutation<any, any>({
      query: ({ id, payload }) => ({
        url: `/stats/update/${id}`,
        method: "PUT",
        body: payload,
      }),
      invalidatesTags: (result, error, { id }) => [
        { type: "Stats", id },
        { type: "Stats", id: "LIST" },
      ],
    }),

    // 🔄 Update media type
    handleUpdateStatsType: builder.mutation<any, any>({
      query: (data) => ({
        url: `/stats/type/${data?.id}`,
        method: "PUT",
        body: { type: data?.type },
      }),
      invalidatesTags: (result, error, data) => [
        { type: "Stats", id: data?.id },
        { type: "Stats", id: "LIST" },
      ],
    }),

    // 🔄 Update media status
    handleUpdateStatsStatus: builder.mutation<any, any>({
      query: (data) => ({
        url: `/stats/update-status/${data?.id}`,
        method: "PUT",
        body: { status: data?.status },
      }),
      invalidatesTags: (result, error, data) => [
        { type: "Stats", id: data?.id },
        { type: "Stats", id: "LIST" },
      ],
    }),

    // 🗑️ Move media to trash (soft delete)
    handleUpdateStatsTrash: builder.mutation<any, any>({
      query: ({ id, isTrash }) => ({
        url: `/stats/trash/${id}`,
        method: "PUT",
        body: { isTrash },
      }),
      invalidatesTags: (result, error, { id }) => [
        { type: "Stats", id },
        { type: "Stats", id: "LIST" },
      ],
    }),

    // ❌ Permanently delete media
    handleDeleteStats: builder.mutation<any, string>({
      query: (id) => ({
        url: `/stats/delete/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: (result, error, id) => [
        { type: "Stats", id },
        { type: "Stats", id: "LIST" },
      ],
    }),
  }),
  overrideExisting: false,
});

export const {
  useHandleCreateStatsMutation,
  useHandleFindStatsQuery,
  useHandleFindSingleStatsQuery,
  useHandleUpdateStatsMutation,
  useHandleUpdateStatsStatusMutation,
  useHandleUpdateStatsTrashMutation,
  useHandleDeleteStatsMutation,
} = StatsApi;
