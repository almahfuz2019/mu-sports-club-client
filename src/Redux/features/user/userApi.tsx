import {
  IIProcessSignUpResponse,
  IProcessSignUpUser,
  ISignUpMutationRequest,
  ISignUpMutationResponse,
  IUpdateUserProfileRequest,
  IUpdateUserProfileResponse,
} from "./userType";
import Api from "@/Redux/api/baseApi";

const immigrationUserApi = Api.injectEndpoints({
  endpoints: (builder) => ({
    handleProcessSingUp: builder.mutation<
      IIProcessSignUpResponse,
      IProcessSignUpUser
    >({
      query: (user) => {
        return {
          url: "/user/process-signup",
          method: "POST",
          body: user,
        };
      },
    }),
    handleSingUp: builder.mutation<
      ISignUpMutationResponse,
      ISignUpMutationRequest
    >({
      query: ({ token }) => {
        return {
          url: "/user/signup",
          method: "POST",
          body: { token: token },
        };
      },
    }),

    getLoggedInUser: builder.query<any, any>({
      query: () => {
        return {
          url: "/user/logged-in-user",
          method: "GET",
        };
      },
    }),

    getAllUser: builder.query<any, any>({
      query: ({ page, limit, search, isBanned }) => {
        return {
          url: "/user/find",
          method: "GET",
          params: {
            page: page,
            limit: limit,
            search: search,
            isBanned,
          },
        };
      },
    }),

    handleUserStatus: builder.mutation<any, any>({
      query: (data) => {
        console.log({ data });
        return {
          url: `/user/update-user-role/${data?.id}`,
          method: "PUT",
          body: {
            role: data?.role,
          },
        };
      },
    }),

    handleUpdateUserProfile: builder.mutation<
      IUpdateUserProfileResponse,
      IUpdateUserProfileRequest
    >({
      query: (data) => {
        console.log("Update User Profile Data:", data);
        return {
          url: "/user/update-user-profile",
          method: "PUT",
          body: data,
        };
      },
    }),
  }),
  overrideExisting: false,
});

export const {
  useHandleProcessSingUpMutation,
  useHandleSingUpMutation,
  useGetLoggedInUserQuery,
  useGetAllUserQuery,
  useHandleUpdateUserProfileMutation,
  useHandleUserStatusMutation,
} = immigrationUserApi;
