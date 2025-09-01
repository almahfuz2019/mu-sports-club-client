import Api from "@/Redux/api/baseApi";

const CommitteeApi = Api.injectEndpoints({
  endpoints: (builder) => ({
    // ➕ Create new media
    handleCreateCommittee: builder.mutation<any, any>({
      query: (payload) => ({
        url: "/committee/create",
        method: "POST",
        body: payload,
      }),
      invalidatesTags: [{ type: "Committee", id: "LIST" }],
    }),

    // 🔍 Find all media
    handleFindCommittee: builder.query<any, any>({
      query: ({
        page = 1,
        limit = 1000,
        search = "",
        status,
        isTrash,
        type,
      }) => ({
        url: "/committee/find",
        method: "GET",
        params: { page, limit, name: search, status, isTrash, type },
      }),
      providesTags: (result) =>
        result?.data
          ? [
              { type: "Committee", id: "LIST" },
              ...result.data.map((Committee: any) => ({
                type: "Committee",
                id: Committee.id,
              })),
            ]
          : [{ type: "Committee", id: "LIST" }],
    }),

    // 🔍 Find single media by slug
    handleFindSingleCommittee: builder.query<any, any>({
      query: (slug) => ({
        url: `/committee/find-single/${slug}`,
        method: "GET",
      }),
      providesTags: (result, error, slug) => [{ type: "Committee", id: slug }],
    }),

    // ✏️ Update media
    handleUpdateCommittee: builder.mutation<any, any>({
      query: ({ id, payload }) => ({
        url: `/committee/update/${id}`,
        method: "PUT",
        body: payload,
      }),
      invalidatesTags: (result, error, { id }) => [
        { type: "Committee", id },
        { type: "Committee", id: "LIST" },
      ],
    }),

    // 🔄 Update media type
    handleUpdateCommitteeType: builder.mutation<any, any>({
      query: (data) => ({
        url: `/committee/type/${data?.id}`,
        method: "PUT",
        body: { type: data?.type },
      }),
      invalidatesTags: (result, error, data) => [
        { type: "Committee", id: data?.id },
        { type: "Committee", id: "LIST" },
      ],
    }),

    // 🔄 Update media status
    handleUpdateCommitteeStatus: builder.mutation<any, any>({
      query: (data) => ({
        url: `/committee/update-status/${data?.id}`,
        method: "PUT",
        body: { status: data?.status },
      }),
      invalidatesTags: (result, error, data) => [
        { type: "Committee", id: data?.id },
        { type: "Committee", id: "LIST" },
      ],
    }),

    // 🗑️ Move media to trash (soft delete)
    handleUpdateCommitteeTrash: builder.mutation<any, any>({
      query: ({ id, isTrash }) => ({
        url: `/committee/trash/${id}`,
        method: "PUT",
        body: { isTrash },
      }),
      invalidatesTags: (result, error, { id }) => [
        { type: "Committee", id },
        { type: "Committee", id: "LIST" },
      ],
    }),

    // ❌ Permanently delete media
    handleDeleteCommittee: builder.mutation<any, string>({
      query: (id) => ({
        url: `/committee/delete/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: (result, error, id) => [
        { type: "Committee", id },
        { type: "Committee", id: "LIST" },
      ],
    }),
  }),
  overrideExisting: false,
});

export const {
  useHandleCreateCommitteeMutation,
  useHandleFindCommitteeQuery,
  useHandleFindSingleCommitteeQuery,
  useHandleUpdateCommitteeMutation,
  useHandleUpdateCommitteeStatusMutation,
  useHandleUpdateCommitteeTrashMutation,
  useHandleDeleteCommitteeMutation,
} = CommitteeApi;
