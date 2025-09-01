import Api from "@/Redux/api/baseApi";

const NoticeApi = Api.injectEndpoints({
  endpoints: (builder) => ({
    // ➕ Create new media
    handleCreateNotice: builder.mutation<any, any>({
      query: (payload) => ({
        url: "/notice/create",
        method: "POST",
        body: payload,
      }),
      invalidatesTags: [{ type: "Notice", id: "LIST" }],
    }),

    // 🔍 Find all media
    handleFindNotice: builder.query<any, any>({
      query: ({
        page = 1,
        limit = 1000,
        search = "",
        status,
        isTrash,
        type,
      }) => ({
        url: "/notice/find",
        method: "GET",
        params: { page, limit, name: search, status, isTrash, type },
      }),
      providesTags: (result) =>
        result?.data
          ? [
              { type: "Notice", id: "LIST" },
              ...result.data.map((Notice: any) => ({
                type: "Notice",
                id: Notice.id,
              })),
            ]
          : [{ type: "Notice", id: "LIST" }],
    }),

    // 🔍 Find single media by slug
    handleFindSingleNotice: builder.query<any, any>({
      query: (slug) => ({
        url: `/notice/find-single/${slug}`,
        method: "GET",
      }),
      providesTags: (result, error, slug) => [{ type: "Notice", id: slug }],
    }),

    // ✏️ Update media
    handleUpdateNotice: builder.mutation<any, any>({
      query: ({ id, payload }) => ({
        url: `/notice/update/${id}`,
        method: "PUT",
        body: payload,
      }),
      invalidatesTags: (result, error, { id }) => [
        { type: "Notice", id },
        { type: "Notice", id: "LIST" },
      ],
    }),

    // 🔄 Update media type
    handleUpdateNoticeType: builder.mutation<any, any>({
      query: (data) => ({
        url: `/notice/type/${data?.id}`,
        method: "PUT",
        body: { type: data?.type },
      }),
      invalidatesTags: (result, error, data) => [
        { type: "Notice", id: data?.id },
        { type: "Notice", id: "LIST" },
      ],
    }),

    // 🔄 Update media status
    handleUpdateNoticeStatus: builder.mutation<any, any>({
      query: (data) => ({
        url: `/notice/update-status/${data?.id}`,
        method: "PUT",
        body: { status: data?.status },
      }),
      invalidatesTags: (result, error, data) => [
        { type: "Notice", id: data?.id },
        { type: "Notice", id: "LIST" },
      ],
    }),

    // 🗑️ Move media to trash (soft delete)
    handleUpdateNoticeTrash: builder.mutation<any, any>({
      query: ({ id, isTrash }) => ({
        url: `/notice/trash/${id}`,
        method: "PUT",
        body: { isTrash },
      }),
      invalidatesTags: (result, error, { id }) => [
        { type: "Notice", id },
        { type: "Notice", id: "LIST" },
      ],
    }),

    // ❌ Permanently delete media
    handleDeleteNotice: builder.mutation<any, string>({
      query: (id) => ({
        url: `/notice/delete/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: (result, error, id) => [
        { type: "Notice", id },
        { type: "Notice", id: "LIST" },
      ],
    }),
  }),
  overrideExisting: false,
});

export const {
  useHandleCreateNoticeMutation,
  useHandleFindNoticeQuery,
  useHandleFindSingleNoticeQuery,
  useHandleUpdateNoticeMutation,
  useHandleUpdateNoticeStatusMutation,
  useHandleUpdateNoticeTrashMutation,
  useHandleDeleteNoticeMutation,
} = NoticeApi;
