import Api from "@/Redux/api/baseApi";

const GalleryApi = Api.injectEndpoints({
  endpoints: (builder) => ({
    // ➕ Create new media
    handleCreateGallery: builder.mutation<any, any>({
      query: (payload) => ({
        url: "/gallery/create",
        method: "POST",
        body: payload,
      }),
      invalidatesTags: [{ type: "Gallery", id: "LIST" }],
    }),

    // 🔍 Find all media
    handleFindGallery: builder.query<any, any>({
      query: ({
        page = 1,
        limit = 1000,
        search = "",
        status,
        isTrash,
        type,
      }) => ({
        url: "/gallery/find",
        method: "GET",
        params: { page, limit, name: search, status, isTrash, type },
      }),
      providesTags: (result) =>
        result?.data
          ? [
              { type: "Gallery", id: "LIST" },
              ...result.data.map((Gallery: any) => ({
                type: "Gallery",
                id: Gallery.id,
              })),
            ]
          : [{ type: "Gallery", id: "LIST" }],
    }),

    // 🔍 Find single media by slug
    handleFindSingleGallery: builder.query<any, any>({
      query: (slug) => ({
        url: `/gallery/find-single/${slug}`,
        method: "GET",
      }),
      providesTags: (result, error, slug) => [{ type: "Gallery", id: slug }],
    }),

    // ✏️ Update media
    handleUpdateGallery: builder.mutation<any, any>({
      query: ({ id, payload }) => ({
        url: `/gallery/update/${id}`,
        method: "PUT",
        body: payload,
      }),
      invalidatesTags: (result, error, { id }) => [
        { type: "Gallery", id },
        { type: "Gallery", id: "LIST" },
      ],
    }),

    // 🔄 Update media type
    handleUpdateGalleryType: builder.mutation<any, any>({
      query: (data) => ({
        url: `/gallery/type/${data?.id}`,
        method: "PUT",
        body: { type: data?.type },
      }),
      invalidatesTags: (result, error, data) => [
        { type: "Gallery", id: data?.id },
        { type: "Gallery", id: "LIST" },
      ],
    }),

    // 🔄 Update media status
    handleUpdateGalleryStatus: builder.mutation<any, any>({
      query: (data) => ({
        url: `/gallery/update-status/${data?.id}`,
        method: "PUT",
        body: { status: data?.status },
      }),
      invalidatesTags: (result, error, data) => [
        { type: "Gallery", id: data?.id },
        { type: "Gallery", id: "LIST" },
      ],
    }),

    // 🗑️ Move media to trash (soft delete)
    handleUpdateGalleryTrash: builder.mutation<any, any>({
      query: ({ id, isTrash }) => ({
        url: `/gallery/trash/${id}`,
        method: "PUT",
        body: { isTrash },
      }),
      invalidatesTags: (result, error, { id }) => [
        { type: "Gallery", id },
        { type: "Gallery", id: "LIST" },
      ],
    }),

    // ❌ Permanently delete media
    handleDeleteGallery: builder.mutation<any, string>({
      query: (id) => ({
        url: `/gallery/delete/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: (result, error, id) => [
        { type: "Gallery", id },
        { type: "Gallery", id: "LIST" },
      ],
    }),
  }),
  overrideExisting: false,
});

export const {
  useHandleCreateGalleryMutation,
  useHandleFindGalleryQuery,
  useHandleFindSingleGalleryQuery,
  useHandleUpdateGalleryMutation,
  useHandleUpdateGalleryStatusMutation,
  useHandleUpdateGalleryTrashMutation,
  useHandleDeleteGalleryMutation,
} = GalleryApi;
