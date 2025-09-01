import Api from "@/Redux/api/baseApi";

const AllCommitteeApi = Api.injectEndpoints({
  endpoints: (builder) => ({
    // ➕ Create new media
    handleCreateAllCommittee: builder.mutation<any, any>({
      query: (payload) => ({
        url: "/all-committee/create",
        method: "POST",
        body: payload,
      }),
      invalidatesTags: [{ type: "AllCommittee", id: "LIST" }],
    }),

    // 🔍 Find all media
    handleFindAllCommittee: builder.query<any, any>({
      query: ({
        page = 1,
        limit = 1000,
        search = "",
        status,
        isTrash,
        type,
      }) => ({
        url: "/all-committee/find",
        method: "GET",
        params: { page, limit, name: search, status, isTrash, type },
      }),
      providesTags: (result) =>
        result?.data
          ? [
              { type: "AllCommittee", id: "LIST" },
              ...result.data.map((AllCommittee: any) => ({
                type: "AllCommittee",
                id: AllCommittee.id,
              })),
            ]
          : [{ type: "AllCommittee", id: "LIST" }],
    }),

    // 🔍 Find single media by slug
    handleFindSingleAllCommittee: builder.query<any, any>({
      query: (slug) => ({
        url: `/all-committee/find-single/${slug}`,
        method: "GET",
      }),
      providesTags: (result, error, slug) => [{ type: "AllCommittee", id: slug }],
    }),

    // ✏️ Update media
    handleUpdateAllCommittee: builder.mutation<any, any>({
      query: ({ id, payload }) => ({
        url: `/all-committee/update/${id}`,
        method: "PUT",
        body: payload,
      }),
      invalidatesTags: (result, error, { id }) => [
        { type: "AllCommittee", id },
        { type: "AllCommittee", id: "LIST" },
      ],
    }),

    // 🔄 Update media type
    handleUpdateAllCommitteeType: builder.mutation<any, any>({
      query: (data) => ({
        url: `/all-committee/type/${data?.id}`,
        method: "PUT",
        body: { type: data?.type },
      }),
      invalidatesTags: (result, error, data) => [
        { type: "AllCommittee", id: data?.id },
        { type: "AllCommittee", id: "LIST" },
      ],
    }),

    // 🔄 Update media status
    handleUpdateAllCommitteeStatus: builder.mutation<any, any>({
      query: (data) => ({
        url: `/all-committee/update-status/${data?.id}`,
        method: "PUT",
        body: { status: data?.status },
      }),
      invalidatesTags: (result, error, data) => [
        { type: "AllCommittee", id: data?.id },
        { type: "AllCommittee", id: "LIST" },
      ],
    }),

    // 🗑️ Move media to trash (soft delete)
    handleUpdateAllCommitteeTrash: builder.mutation<any, any>({
      query: ({ id, isTrash }) => ({
        url: `/all-committee/trash/${id}`,
        method: "PUT",
        body: { isTrash },
      }),
      invalidatesTags: (result, error, { id }) => [
        { type: "AllCommittee", id },
        { type: "AllCommittee", id: "LIST" },
      ],
    }),

    // ❌ Permanently delete media
    handleDeleteAllCommittee: builder.mutation<any, string>({
      query: (id) => ({
        url: `/all-committee/delete/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: (result, error, id) => [
        { type: "AllCommittee", id },
        { type: "AllCommittee", id: "LIST" },
      ],
    }),
  }),
  overrideExisting: false,
});

export const {
  useHandleCreateAllCommitteeMutation,
  useHandleFindAllCommitteeQuery,
  useHandleFindSingleAllCommitteeQuery,
  useHandleUpdateAllCommitteeMutation,
  useHandleUpdateAllCommitteeStatusMutation,
  useHandleUpdateAllCommitteeTrashMutation,
  useHandleDeleteAllCommitteeMutation,
} = AllCommitteeApi;
