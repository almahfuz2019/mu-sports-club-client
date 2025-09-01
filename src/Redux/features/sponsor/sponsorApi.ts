import Api from "@/Redux/api/baseApi";

const SponsorApi = Api.injectEndpoints({
  endpoints: (builder) => ({
    // ➕ Create new media
    handleCreateSponsor: builder.mutation<any, any>({
      query: (payload) => ({
        url: "/sponsor/create",
        method: "POST",
        body: payload,
      }),
      invalidatesTags: [{ type: "Sponsor", id: "LIST" }],
    }),

    // 🔍 Find all media
    handleFindSponsor: builder.query<any, any>({
      query: ({
        page = 1,
        limit = 1000,
        search = "",
        status,
        isTrash,
        type,
      }) => ({
        url: "/sponsor/find",
        method: "GET",
        params: { page, limit, name: search, status, isTrash, type },
      }),
      providesTags: (result) =>
        result?.data
          ? [
              { type: "Sponsor", id: "LIST" },
              ...result.data.map((Sponsor: any) => ({
                type: "Sponsor",
                id: Sponsor.id,
              })),
            ]
          : [{ type: "Sponsor", id: "LIST" }],
    }),

    // 🔍 Find single media by slug
    handleFindSingleSponsor: builder.query<any, any>({
      query: (slug) => ({
        url: `/sponsor/find-single/${slug}`,
        method: "GET",
      }),
      providesTags: (result, error, slug) => [{ type: "Sponsor", id: slug }],
    }),

    // ✏️ Update media
    handleUpdateSponsor: builder.mutation<any, any>({
      query: ({ id, payload }) => ({
        url: `/sponsor/update/${id}`,
        method: "PUT",
        body: payload,
      }),
      invalidatesTags: (result, error, { id }) => [
        { type: "Sponsor", id },
        { type: "Sponsor", id: "LIST" },
      ],
    }),

    // 🔄 Update media type
    handleUpdateSponsorType: builder.mutation<any, any>({
      query: (data) => ({
        url: `/sponsor/type/${data?.id}`,
        method: "PUT",
        body: { type: data?.type },
      }),
      invalidatesTags: (result, error, data) => [
        { type: "Sponsor", id: data?.id },
        { type: "Sponsor", id: "LIST" },
      ],
    }),

    // 🔄 Update media status
    handleUpdateSponsorStatus: builder.mutation<any, any>({
      query: (data) => ({
        url: `/sponsor/update-status/${data?.id}`,
        method: "PUT",
        body: { status: data?.status },
      }),
      invalidatesTags: (result, error, data) => [
        { type: "Sponsor", id: data?.id },
        { type: "Sponsor", id: "LIST" },
      ],
    }),

    // 🗑️ Move media to trash (soft delete)
    handleUpdateSponsorTrash: builder.mutation<any, any>({
      query: ({ id, isTrash }) => ({
        url: `/sponsor/trash/${id}`,
        method: "PUT",
        body: { isTrash },
      }),
      invalidatesTags: (result, error, { id }) => [
        { type: "Sponsor", id },
        { type: "Sponsor", id: "LIST" },
      ],
    }),

    // ❌ Permanently delete media
    handleDeleteSponsor: builder.mutation<any, string>({
      query: (id) => ({
        url: `/sponsor/delete/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: (result, error, id) => [
        { type: "Sponsor", id },
        { type: "Sponsor", id: "LIST" },
      ],
    }),
  }),
  overrideExisting: false,
});

export const {
  useHandleCreateSponsorMutation,
  useHandleFindSponsorQuery,
  useHandleFindSingleSponsorQuery,
  useHandleUpdateSponsorMutation,
  useHandleUpdateSponsorStatusMutation,
  useHandleUpdateSponsorTrashMutation,
  useHandleDeleteSponsorMutation,
} = SponsorApi;
