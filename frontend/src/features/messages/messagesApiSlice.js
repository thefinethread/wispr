import { MESSAGE_URL } from "../../constants/constants";
import { apiSlice } from "../apiSlice";

export const messageApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getMessages: builder.query({
      query: ({ conversationId }) => ({
        url: `${MESSAGE_URL}`,
        params: { conversationId },
      }),
      transformResponse: (res) => res.data,
    }),
  }),
});

export const { useGetMessagesQuery } = messageApiSlice;
