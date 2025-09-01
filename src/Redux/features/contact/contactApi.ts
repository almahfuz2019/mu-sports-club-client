import Api from "@/Redux/api/baseApi";

const ContactApi = Api.injectEndpoints({
  endpoints: (builder) => ({
    // ➕ Create new media
    handleCreateContact: builder.mutation<any, any>({
      query: (payload) => ({
        url: "/contact/create",
        method: "POST",
        body: payload,
      }),
      invalidatesTags: [{ type: "Contact", id: "LIST" }],
    }),

    // 🔍 Find all media
    handleFindContact: builder.query<any, any>({
      query: ({
        page = 1,
        limit = 1000,
        search = "",
        status,
        isTrash,
      }) => ({
        url: "/contact/find",
        method: "GET",
        params: { page, limit, name: search, status, isTrash },
      }),
      providesTags: (result) =>
        result?.data
          ? [
              { type: "Contact", id: "LIST" },
              ...result.data.map((Contact: any) => ({
                type: "Contact",
                id: Contact.id,
              })),
            ]
          : [{ type: "Contact", id: "LIST" }],
    }),

    // 🔍 Find single media by slug
    handleFindSingleContact: builder.query<any, any>({
      query: (slug) => ({
        url: `/contact/find-single/${slug}`,
        method: "GET",
      }),
      providesTags: (result, error, slug) => [{ type: "Contact", id: slug }],
    }),

    // ✏️ Update media
    handleUpdateContact: builder.mutation<any, any>({
      query: ({ id, payload }) => ({
        url: `/contact/update/${id}`,
        method: "PUT",
        body: payload,
      }),
      invalidatesTags: (result, error, { id }) => [
        { type: "Contact", id },
        { type: "Contact", id: "LIST" },
      ],
    }),

    // 🔄 Update media type
    handleUpdateContactType: builder.mutation<any, any>({
      query: (data) => ({
        url: `/contact/type/${data?.id}`,
        method: "PUT",
        body: { type: data?.type },
      }),
      invalidatesTags: (result, error, data) => [
        { type: "Contact", id: data?.id },
        { type: "Contact", id: "LIST" },
      ],
    }),

    // 🔄 Update media status
    handleUpdateContactStatus: builder.mutation<any, any>({
      query: (data) => ({
        url: `/contact/update-status/${data?.id}`,
        method: "PUT",
        body: { status: data?.status },
      }),
      invalidatesTags: (result, error, data) => [
        { type: "Contact", id: data?.id },
        { type: "Contact", id: "LIST" },
      ],
    }),

    // 🗑️ Move media to trash (soft delete)
    handleUpdateContactTrash: builder.mutation<any, any>({
      query: ({ id, isTrash }) => ({
        url: `/contact/trash/${id}`,
        method: "PUT",
        body: { isTrash },
      }),
      invalidatesTags: (result, error, { id }) => [
        { type: "Contact", id },
        { type: "Contact", id: "LIST" },
      ],
    }),

    // ❌ Permanently delete media
    handleDeleteContact: builder.mutation<any, string>({
      query: (id) => ({
        url: `/contact/delete/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: (result, error, id) => [
        { type: "Contact", id },
        { type: "Contact", id: "LIST" },
      ],
    }),
  }),
  overrideExisting: false,
});

export const {
  useHandleCreateContactMutation,
  useHandleFindContactQuery,
  useHandleFindSingleContactQuery,
  useHandleUpdateContactMutation,
  useHandleUpdateContactStatusMutation,
  useHandleUpdateContactTrashMutation,
  useHandleDeleteContactMutation,
} = ContactApi;
