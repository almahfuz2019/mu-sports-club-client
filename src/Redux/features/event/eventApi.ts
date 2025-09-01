import Api from "@/Redux/api/baseApi";

const EventApi = Api.injectEndpoints({
  endpoints: (builder) => ({
    // ➕ Create new media
    handleCreateEvent: builder.mutation<any, any>({
      query: (payload) => ({
        url: "/event/create",
        method: "POST",
        body: payload,
      }),
      invalidatesTags: [{ type: "Event", id: "LIST" }],
    }),

    // 🔍 Find all media
    handleFindEvent: builder.query<any, any>({
      query: ({
        page = 1,
        limit = 1000,
        search = "",
        status,
        isTrash,
        type,
      }) => ({
        url: "/event/find",
        method: "GET",
        params: { page, limit, name: search, status, isTrash, type },
      }),
      providesTags: (result) =>
        result?.data
          ? [
              { type: "Event", id: "LIST" },
              ...result.data.map((Event: any) => ({
                type: "Event",
                id: Event.id,
              })),
            ]
          : [{ type: "Event", id: "LIST" }],
    }),

    // 🔍 Find single media by slug
    handleFindSingleEvent: builder.query<any, any>({
      query: (slug) => ({
        url: `/event/find-single/${slug}`,
        method: "GET",
      }),
      providesTags: (result, error, slug) => [{ type: "Event", id: slug }],
    }),

    // ✏️ Update media
    handleUpdateEvent: builder.mutation<any, any>({
      query: ({ id, payload }) => ({
        url: `/event/update/${id}`,
        method: "PUT",
        body: payload,
      }),
      invalidatesTags: (result, error, { id }) => [
        { type: "Event", id },
        { type: "Event", id: "LIST" },
      ],
    }),

    // 🔄 Update media type
    handleUpdateEventType: builder.mutation<any, any>({
      query: (data) => ({
        url: `/event/type/${data?.id}`,
        method: "PUT",
        body: { type: data?.type },
      }),
      invalidatesTags: (result, error, data) => [
        { type: "Event", id: data?.id },
        { type: "Event", id: "LIST" },
      ],
    }),

    // 🔄 Update media status
    handleUpdateEventStatus: builder.mutation<any, any>({
      query: (data) => ({
        url: `/event/update-status/${data?.id}`,
        method: "PUT",
        body: { status: data?.status },
      }),
      invalidatesTags: (result, error, data) => [
        { type: "Event", id: data?.id },
        { type: "Event", id: "LIST" },
      ],
    }),

    // 🗑️ Move media to trash (soft delete)
    handleUpdateEventTrash: builder.mutation<any, any>({
      query: ({ id, isTrash }) => ({
        url: `/event/trash/${id}`,
        method: "PUT",
        body: { isTrash },
      }),
      invalidatesTags: (result, error, { id }) => [
        { type: "Event", id },
        { type: "Event", id: "LIST" },
      ],
    }),

    // ❌ Permanently delete media
    handleDeleteEvent: builder.mutation<any, string>({
      query: (id) => ({
        url: `/event/delete/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: (result, error, id) => [
        { type: "Event", id },
        { type: "Event", id: "LIST" },
      ],
    }),
  }),
  overrideExisting: false,
});

export const {
  useHandleCreateEventMutation,
  useHandleFindEventQuery,
  useHandleFindSingleEventQuery,
  useHandleUpdateEventMutation,
  useHandleUpdateEventStatusMutation,
  useHandleUpdateEventTrashMutation,
  useHandleDeleteEventMutation,
} = EventApi;
