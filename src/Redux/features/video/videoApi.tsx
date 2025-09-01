import Api from "@/Redux/api/baseApi";

const VideoApi = Api.injectEndpoints({
  endpoints: (builder) => ({
    // ➕ Create new media
    handleCreateVideo: builder.mutation<any, any>({
      query: (payload) => ({
        url: "/video/create",
        method: "POST",
        body: payload,
      }),
      invalidatesTags: [{ type: "Video", id: "LIST" }],
    }),

    // 🔍 Find all media
    handleFindVideo: builder.query<any, any>({
      query: ({
        page = 1,
        limit = 1000,
        search = "",
        status,
        isTrash,
        type,
      }) => ({
        url: "/video/find",
        method: "GET",
        params: { page, limit, name: search, status, isTrash, type },
      }),
      providesTags: (result) =>
        result?.data
          ? [
              { type: "Video", id: "LIST" },
              ...result.data.map((Video: any) => ({
                type: "Video",
                id: Video.id,
              })),
            ]
          : [{ type: "Video", id: "LIST" }],
    }),

    // 🔍 Find single media by slug
    handleFindSingleVideo: builder.query<any, any>({
      query: (slug) => ({
        url: `/video/find-single/${slug}`,
        method: "GET",
      }),
      providesTags: (result, error, slug) => [{ type: "Video", id: slug }],
    }),

    // ✏️ Update media
    handleUpdateVideo: builder.mutation<any, any>({
      query: ({ id, payload }) => ({
        url: `/video/update/${id}`,
        method: "PUT",
        body: payload,
      }),
      invalidatesTags: (result, error, { id }) => [
        { type: "Video", id },
        { type: "Video", id: "LIST" },
      ],
    }),

    // 🔄 Update media type
    handleUpdateVideoType: builder.mutation<any, any>({
      query: (data) => ({
        url: `/video/type/${data?.id}`,
        method: "PUT",
        body: { type: data?.type },
      }),
      invalidatesTags: (result, error, data) => [
        { type: "Video", id: data?.id },
        { type: "Video", id: "LIST" },
      ],
    }),

    // 🔄 Update media status
    handleUpdateVideoStatus: builder.mutation<any, any>({
      query: (data) => ({
        url: `/video/update-status/${data?.id}`,
        method: "PUT",
        body: { status: data?.status },
      }),
      invalidatesTags: (result, error, data) => [
        { type: "Video", id: data?.id },
        { type: "Video", id: "LIST" },
      ],
    }),

    // 🗑️ Move media to trash (soft delete)
    handleUpdateVideoTrash: builder.mutation<any, any>({
      query: ({ id, isTrash }) => ({
        url: `/video/trash/${id}`,
        method: "PUT",
        body: { isTrash },
      }),
      invalidatesTags: (result, error, { id }) => [
        { type: "Video", id },
        { type: "Video", id: "LIST" },
      ],
    }),

    // ❌ Permanently delete media
    handleDeleteVideo: builder.mutation<any, string>({
      query: (id) => ({
        url: `/video/delete/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: (result, error, id) => [
        { type: "Video", id },
        { type: "Video", id: "LIST" },
      ],
    }),
  }),
  overrideExisting: false,
});

export const {
  useHandleCreateVideoMutation,
  useHandleFindVideoQuery,
  useHandleFindSingleVideoQuery,
  useHandleUpdateVideoMutation,
  useHandleUpdateVideoStatusMutation,
  useHandleUpdateVideoTrashMutation,
  useHandleDeleteVideoMutation,
} = VideoApi;
