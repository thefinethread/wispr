import { createSlice } from "@reduxjs/toolkit";

const currentUser = JSON.parse(localStorage.getItem("currentUser"));

const initialState = {
  typing: [],
  conversations: [],
};

const conversationSlice = createSlice({
  name: "conversationReducer",
  initialState,
  reducers: {
    startTyping: (state, action) => {
      if (
        !state.typing.find((el) => el.senderId === action.payload?.senderId)
      ) {
        state.typing = [...state.typing, action.payload];
      }
    },
    stopTyping: (state, action) => {
      state.typing = state.typing.filter(
        (el) => el?.senderId !== action.payload,
      );
    },
    getAllConversations: (state, action) => {
      const data = action.payload?.map((conversation) => {
        const otherUser = conversation.members?.filter(
          (member) => member?._id !== currentUser?._id,
        )?.[0];

        return {
          _id: conversation._id,
          lastMessage: conversation.messages?.[0]?.text || "",
          lastMessageTime: conversation.messages?.[0]?.createdAt || "",
          otherUserId: otherUser?._id,
          otherUserName: otherUser?.username,
          otherUserProfilePic: otherUser?.profilePhoto,
        };
      });

      state.conversations = data;
    },
    updateConversationList: (state, action) => {
      const index = state.conversations.findIndex(
        (c) => c?._id === action.payload?.conversationId,
      );
      if (index !== -1) {
        const conversation = state.conversations[index];
        // remove the conversation from its index
        state.conversations.splice(index, 1);
        // move the conversation to top
        // updated the last message of the conversation
        state.conversations.unshift({
          ...conversation,
          lastMessage: action.payload.text,
          lastMessageTime: action.payload.createdAt,
        });
      }
    },
    updateConversationDetail: (state, action) => {
      const { _id, ...rest } = action.payload;

      const index = state.conversations.findIndex(
        (el) => el.otherUserId === _id,
      );

      const fieldsMapping = {
        username: "otherUserName",
        profilePhoto: "otherUserProfilePic",
      };

      if (index !== -1) {
        const conversation = { ...state.conversations[index] };

        Object.keys(rest).forEach((key) => {
          const stateFieldName = fieldsMapping[key];

          if (stateFieldName) conversation[stateFieldName] = rest[key];
        });

        state.conversations.splice(index, 1, conversation);
      }
    },
  },
});

export default conversationSlice;

export const {
  startTyping,
  stopTyping,
  getAllConversations,
  updateConversationList,
  updateConversationDetail,
} = conversationSlice.actions;
