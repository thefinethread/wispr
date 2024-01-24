import { MESSAGE_URL } from "../../constants/constants";
import { apiSlice } from "../apiSlice";

export const messageApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getMessages: builder.query({
      query: ({ conversationId }) => ({
        url: `${MESSAGE_URL}`,
        params: { conversationId },
      }),
      providesTags: ["Message"],
      transformResponse: (res) => res.data,
    }),

    sendMessage: builder.mutation({
      query: (data) => ({
        url: `${MESSAGE_URL}`,
        body: data,
        method: "POST",
      }),
      invalidatesTags: ["Message"],
      transformResponse: (res) => res.data,
    }),
  }),
});

export const { useGetMessagesQuery, useSendMessageMutation } = messageApiSlice;
