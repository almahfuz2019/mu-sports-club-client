import Api from "@/Redux/api/baseApi";

const EventCategoryApi = Api.injectEndpoints({
  endpoints: (builder) => ({
    // ➕ Create new media
    handleCreateEventCategory: builder.mutation<any, any>({
      query: (payload) => ({
        url: "/event-category/create",
        method: "POST",
        body: payload,
      }),
      invalidatesTags: [{ type: "EventCategory", id: "LIST" }],
    }),

    // 🔍 Find all media
    handleFindEventCategory: builder.query<any, any>({
      query: ({
        page = 1,
        limit = 1000,
        search = "",
        status,
        isTrash,
        type,
      }) => ({
        url: "/event-category/find",
        method: "GET",
        params: { page, limit, name: search, status, isTrash, type },
      }),
      providesTags: (result) =>
        result?.data
          ? [
              { type: "EventCategory", id: "LIST" },
              ...result.data.map((EventCategory: any) => ({
                type: "EventCategory",
                id: EventCategory.id,
              })),
            ]
          : [{ type: "EventCategory", id: "LIST" }],
    }),

    // 🔍 Find single media by slug
    handleFindSingleEventCategory: builder.query<any, any>({
      query: (slug) => ({
        url: `/event-category/find-single/${slug}`,
        method: "GET",
      }),
      providesTags: (result, error, slug) => [{ type: "EventCategory", id: slug }],
    }),

    // ✏️ Update media
    handleUpdateEventCategory: builder.mutation<any, any>({
      query: ({ id, payload }) => ({
        url: `/event-category/update/${id}`,
        method: "PUT",
        body: payload,
      }),
      invalidatesTags: (result, error, { id }) => [
        { type: "EventCategory", id },
        { type: "EventCategory", id: "LIST" },
      ],
    }),

    // 🔄 Update media type
    handleUpdateEventCategoryType: builder.mutation<any, any>({
      query: (data) => ({
        url: `/event-category/type/${data?.id}`,
        method: "PUT",
        body: { type: data?.type },
      }),
      invalidatesTags: (result, error, data) => [
        { type: "EventCategory", id: data?.id },
        { type: "EventCategory", id: "LIST" },
      ],
    }),

    // 🔄 Update media status
    handleUpdateEventCategoryStatus: builder.mutation<any, any>({
      query: (data) => ({
        url: `/event-category/update-status/${data?.id}`,
        method: "PUT",
        body: { status: data?.status },
      }),
      invalidatesTags: (result, error, data) => [
        { type: "EventCategory", id: data?.id },
        { type: "EventCategory", id: "LIST" },
      ],
    }),

    // 🗑️ Move media to trash (soft delete)
    handleUpdateEventCategoryTrash: builder.mutation<any, any>({
      query: ({ id, isTrash }) => ({
        url: `/event-category/trash/${id}`,
        method: "PUT",
        body: { isTrash },
      }),
      invalidatesTags: (result, error, { id }) => [
        { type: "EventCategory", id },
        { type: "EventCategory", id: "LIST" },
      ],
    }),

    // ❌ Permanently delete media
    handleDeleteEventCategory: builder.mutation<any, string>({
      query: (id) => ({
        url: `/event-category/delete/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: (result, error, id) => [
        { type: "EventCategory", id },
        { type: "EventCategory", id: "LIST" },
      ],
    }),
  }),
  overrideExisting: false,
});

export const {
  useHandleCreateEventCategoryMutation,
  useHandleFindEventCategoryQuery,
  useHandleFindSingleEventCategoryQuery,
  useHandleUpdateEventCategoryMutation,
  useHandleUpdateEventCategoryStatusMutation,
  useHandleUpdateEventCategoryTrashMutation,
  useHandleDeleteEventCategoryMutation,
} = EventCategoryApi;
