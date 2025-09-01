import Api from "@/Redux/api/baseApi";

const PlayerApi = Api.injectEndpoints({
  endpoints: (builder) => ({
    // ➕ Create new media
    handleCreatePlayer: builder.mutation<any, any>({
      query: (payload) => ({
        url: "/player/create",
        method: "POST",
        body: payload,
      }),
      invalidatesTags: [{ type: "Player", id: "LIST" }],
    }),

    // 🔍 Find all media
    handleFindPlayer: builder.query<any, any>({
      query: ({
        page = 1,
        limit = 1000,
        search = "",
        status,
        isTrash,
        type,
      }) => ({
        url: "/player/find",
        method: "GET",
        params: { page, limit, name: search, status, isTrash, type },
      }),
      providesTags: (result) =>
        result?.data
          ? [
              { type: "Player", id: "LIST" },
              ...result.data.map((Player: any) => ({
                type: "Player",
                id: Player.id,
              })),
            ]
          : [{ type: "Player", id: "LIST" }],
    }),

    // 🔍 Find single media by slug
    handleFindSinglePlayer: builder.query<any, any>({
      query: (slug) => ({
        url: `/player/find-single/${slug}`,
        method: "GET",
      }),
      providesTags: (result, error, slug) => [{ type: "Player", id: slug }],
    }),

    // ✏️ Update media
    handleUpdatePlayer: builder.mutation<any, any>({
      query: ({ id, payload }) => ({
        url: `/player/update/${id}`,
        method: "PUT",
        body: payload,
      }),
      invalidatesTags: (result, error, { id }) => [
        { type: "Player", id },
        { type: "Player", id: "LIST" },
      ],
    }),

    // 🔄 Update media type
    handleUpdatePlayerType: builder.mutation<any, any>({
      query: (data) => ({
        url: `/player/type/${data?.id}`,
        method: "PUT",
        body: { type: data?.type },
      }),
      invalidatesTags: (result, error, data) => [
        { type: "Player", id: data?.id },
        { type: "Player", id: "LIST" },
      ],
    }),

    // 🔄 Update media status
    handleUpdatePlayerStatus: builder.mutation<any, any>({
      query: (data) => ({
        url: `/player/update-status/${data?.id}`,
        method: "PUT",
        body: { status: data?.status },
      }),
      invalidatesTags: (result, error, data) => [
        { type: "Player", id: data?.id },
        { type: "Player", id: "LIST" },
      ],
    }),

    // 🗑️ Move media to trash (soft delete)
    handleUpdatePlayerTrash: builder.mutation<any, any>({
      query: ({ id, isTrash }) => ({
        url: `/player/trash/${id}`,
        method: "PUT",
        body: { isTrash },
      }),
      invalidatesTags: (result, error, { id }) => [
        { type: "Player", id },
        { type: "Player", id: "LIST" },
      ],
    }),

    // ❌ Permanently delete media
    handleDeletePlayer: builder.mutation<any, string>({
      query: (id) => ({
        url: `/player/delete/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: (result, error, id) => [
        { type: "Player", id },
        { type: "Player", id: "LIST" },
      ],
    }),
  }),
  overrideExisting: false,
});

export const {
  useHandleCreatePlayerMutation,
  useHandleFindPlayerQuery,
  useHandleFindSinglePlayerQuery,
  useHandleUpdatePlayerMutation,
  useHandleUpdatePlayerStatusMutation,
  useHandleUpdatePlayerTrashMutation,
  useHandleDeletePlayerMutation,
} = PlayerApi;
