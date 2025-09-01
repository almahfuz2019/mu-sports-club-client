import Api from "@/Redux/api/baseApi";

const PerformerApi = Api.injectEndpoints({
  endpoints: (builder) => ({
    // ➕ Create new media
    handleCreatePerformer: builder.mutation<any, any>({
      query: (payload) => ({
        url: "/performer/create",
        method: "POST",
        body: payload,
      }),
      invalidatesTags: [{ type: "Performer", id: "LIST" }],
    }),

    // 🔍 Find all media
    handleFindPerformer: builder.query<any, any>({
      query: ({
        page = 1,
        limit = 1000,
        search = "",
        status,
        isTrash,
        type,
      }) => ({
        url: "/performer/find",
        method: "GET",
        params: { page, limit, name: search, status, isTrash, type },
      }),
      providesTags: (result) =>
        result?.data
          ? [
              { type: "Performer", id: "LIST" },
              ...result.data.map((Performer: any) => ({
                type: "Performer",
                id: Performer.id,
              })),
            ]
          : [{ type: "Performer", id: "LIST" }],
    }),

    // 🔍 Find single media by slug
    handleFindSinglePerformer: builder.query<any, any>({
      query: (slug) => ({
        url: `/performer/find-single/${slug}`,
        method: "GET",
      }),
      providesTags: (result, error, slug) => [{ type: "Performer", id: slug }],
    }),

    // ✏️ Update media
    handleUpdatePerformer: builder.mutation<any, any>({
      query: ({ id, payload }) => ({
        url: `/performer/update/${id}`,
        method: "PUT",
        body: payload,
      }),
      invalidatesTags: (result, error, { id }) => [
        { type: "Performer", id },
        { type: "Performer", id: "LIST" },
      ],
    }),

    // 🔄 Update media type
    handleUpdatePerformerType: builder.mutation<any, any>({
      query: (data) => ({
        url: `/performer/type/${data?.id}`,
        method: "PUT",
        body: { type: data?.type },
      }),
      invalidatesTags: (result, error, data) => [
        { type: "Performer", id: data?.id },
        { type: "Performer", id: "LIST" },
      ],
    }),

    // 🔄 Update media status
    handleUpdatePerformerStatus: builder.mutation<any, any>({
      query: (data) => ({
        url: `/performer/update-status/${data?.id}`,
        method: "PUT",
        body: { status: data?.status },
      }),
      invalidatesTags: (result, error, data) => [
        { type: "Performer", id: data?.id },
        { type: "Performer", id: "LIST" },
      ],
    }),

    // 🗑️ Move media to trash (soft delete)
    handleUpdatePerformerTrash: builder.mutation<any, any>({
      query: ({ id, isTrash }) => ({
        url: `/performer/trash/${id}`,
        method: "PUT",
        body: { isTrash },
      }),
      invalidatesTags: (result, error, { id }) => [
        { type: "Performer", id },
        { type: "Performer", id: "LIST" },
      ],
    }),

    // ❌ Permanently delete media
    handleDeletePerformer: builder.mutation<any, string>({
      query: (id) => ({
        url: `/performer/delete/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: (result, error, id) => [
        { type: "Performer", id },
        { type: "Performer", id: "LIST" },
      ],
    }),
  }),
  overrideExisting: false,
});

export const {
  useHandleCreatePerformerMutation,
  useHandleFindPerformerQuery,
  useHandleFindSinglePerformerQuery,
  useHandleUpdatePerformerMutation,
  useHandleUpdatePerformerStatusMutation,
  useHandleUpdatePerformerTrashMutation,
  useHandleDeletePerformerMutation,
} = PerformerApi;
