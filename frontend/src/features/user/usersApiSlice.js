import { apiSlice } from "../apiSlice";
import { USER_URL } from "../../constants/constants";

export const usersApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    register: builder.mutation({
      query: (data) => ({
        url: `${USER_URL}/register`,
        method: "POST",
        body: data,
      }),
    }),
    login: builder.mutation({
      query: (data) => ({
        url: `${USER_URL}/login`,
        method: "POST",
        body: data,
      }),
    }),
    searchUser: builder.mutation({
      query: ({ queryTerm }) => ({
        url: `${USER_URL}/search`,
        method: "POST",
        params: { q: queryTerm },
      }),
      transformResponse: (res) => res.data,
    }),
  }),
});

export const { useRegisterMutation, useLoginMutation, useSearchUserMutation } =
  usersApiSlice;
