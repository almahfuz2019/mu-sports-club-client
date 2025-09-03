import Api from "@/Redux/api/baseApi";

const AchievementApi = Api.injectEndpoints({
  endpoints: (builder) => ({
    // ➕ Create new media
    handleCreateAchievement: builder.mutation<any, any>({
      query: (payload) => ({
        url: "/achievement/create",
        method: "POST",
        body: payload,
      }),
      invalidatesTags: [{ type: "Achievement", id: "LIST" }],
    }),

    // 🔍 Find all media
    handleFindAchievement: builder.query<any, any>({
      query: ({
        page = 1,
        limit = 1000,
        search = "",
        status,
        isTrash,
        type,
        year,
      }) => ({
        url: "/achievement/find",
        method: "GET",
        params: { page, limit, name: search, status, isTrash, type, year },
      }),
      providesTags: (result) =>
        result?.data
          ? [
              { type: "Achievement", id: "LIST" },
              ...result.data.map((Achievement: any) => ({
                type: "Achievement",
                id: Achievement.id,
              })),
            ]
          : [{ type: "Achievement", id: "LIST" }],
    }),

    // 🔍 Find single media by slug
    handleFindSingleAchievement: builder.query<any, any>({
      query: (slug) => ({
        url: `/achievement/find-single/${slug}`,
        method: "GET",
      }),
      providesTags: (result, error, slug) => [
        { type: "Achievement", id: slug },
      ],
    }),

    // ✏️ Update media
    handleUpdateAchievement: builder.mutation<any, any>({
      query: ({ id, payload }) => ({
        url: `/achievement/update/${id}`,
        method: "PUT",
        body: payload,
      }),
      invalidatesTags: (result, error, { id }) => [
        { type: "Achievement", id },
        { type: "Achievement", id: "LIST" },
      ],
    }),

    // 🔄 Update media type
    handleUpdateAchievementType: builder.mutation<any, any>({
      query: (data) => ({
        url: `/achievement/type/${data?.id}`,
        method: "PUT",
        body: { type: data?.type },
      }),
      invalidatesTags: (result, error, data) => [
        { type: "Achievement", id: data?.id },
        { type: "Achievement", id: "LIST" },
      ],
    }),

    // 🔄 Update media status
    handleUpdateAchievementStatus: builder.mutation<any, any>({
      query: (data) => ({
        url: `/achievement/update-status/${data?.id}`,
        method: "PUT",
        body: { status: data?.status },
      }),
      invalidatesTags: (result, error, data) => [
        { type: "Achievement", id: data?.id },
        { type: "Achievement", id: "LIST" },
      ],
    }),

    // 🗑️ Move media to trash (soft delete)
    handleUpdateAchievementTrash: builder.mutation<any, any>({
      query: ({ id, isTrash }) => ({
        url: `/achievement/trash/${id}`,
        method: "PUT",
        body: { isTrash },
      }),
      invalidatesTags: (result, error, { id }) => [
        { type: "Achievement", id },
        { type: "Achievement", id: "LIST" },
      ],
    }),

    // ❌ Permanently delete media
    handleDeleteAchievement: builder.mutation<any, string>({
      query: (id) => ({
        url: `/achievement/delete/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: (result, error, id) => [
        { type: "Achievement", id },
        { type: "Achievement", id: "LIST" },
      ],
    }),
  }),
  overrideExisting: false,
});

export const {
  useHandleCreateAchievementMutation,
  useHandleFindAchievementQuery,
  useHandleFindSingleAchievementQuery,
  useHandleUpdateAchievementMutation,
  useHandleUpdateAchievementStatusMutation,
  useHandleUpdateAchievementTrashMutation,
  useHandleDeleteAchievementMutation,
} = AchievementApi;
