import Api from "@/Redux/api/baseApi";
import {
  IForgotPasswordRequest,
  IForgotPasswordResponse,
  IResetPasswordRequest,
  IResetPasswordResponse,
  IUpdatePasswordRequest,
  IUpdatePasswordResponse,
  loginRequest,
  loginResponse,
  logOutResponse,
} from "./authType";

const immigrationAuthApi = Api.injectEndpoints({
  endpoints: (builder) => ({
    handleLogin: builder.mutation<loginResponse, loginRequest>({
      query: (user) => {
        console.log(user);
        return {
          url: "/auth/login",
          method: "POST",
          body: user,
        };
      },
    }),

    handleLogOut: builder.mutation<logOutResponse, void>({
      query: () => {
        return {
          url: "/auth/logOut",
          method: "POST",
        };
      },
    }),

    handleForgotPassword: builder.mutation<
      IForgotPasswordResponse,
      IForgotPasswordRequest
    >({
      query: (data) => ({
        url: "/auth/forgot-password",
        method: "POST",
        body: data,
      }),
    }),

    handleResetPassword: builder.mutation<
      IResetPasswordResponse,
      IResetPasswordRequest
    >({
      query: (data) => ({
        url: "/auth/reset-password",
        method: "PUT",
        body: data,
      }),
    }),

    getCurrentUser: builder.query<loginResponse, void>({
      query: () => {
        return {
          url: `/user/logged-in-user`,
          method: "GET",
        };
      },
    }),

    handleUpdatePassword: builder.mutation<
      IUpdatePasswordResponse,
      IUpdatePasswordRequest
    >({
      query: (data) => {
        return {
          url: "/auth/update-password",
          method: "PATCH",
          body: {
            oldPassword: data?.oldPassword,
            newPassword: data?.newPassword,
            confirmPassword: data?.confirmPassword,
          },
        };
      },
    }),

    handleBanUser: builder.mutation<any, any>({
      query: (id) => {
        return {
          url: `/auth/banned/${id}`,
          method: "PATCH",
        };
      },
    }),
    handleUnBanUser: builder.mutation<any, any>({
      query: (id) => {
        return {
          url: `/auth/unbanned/${id}`,
          method: "PATCH",
        };
      },
    }),
  }),
  overrideExisting: false,
});

export const {
  useHandleLoginMutation,
  useHandleLogOutMutation,
  useHandleForgotPasswordMutation,
  useHandleResetPasswordMutation,
  useGetCurrentUserQuery,
  useHandleUpdatePasswordMutation,
  useHandleBanUserMutation,
  useHandleUnBanUserMutation,
} = immigrationAuthApi;
