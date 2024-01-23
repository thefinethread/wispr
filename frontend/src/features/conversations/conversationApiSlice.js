import { CONVERSATION_URL } from "../../constants/constants";
import { apiSlice } from "../apiSlice";

export const conversationApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getConversations: builder.query({
      query: () => ({
        url: `${CONVERSATION_URL}`,
      }),
      transformResponse: (res) => res.data,
    }),
  }),
});

export const { useGetConversationsQuery } = conversationApiSlice;
