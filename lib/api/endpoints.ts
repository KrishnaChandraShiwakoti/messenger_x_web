// centralized path definitions for API endpoints
export const API = {
  AUTH: {
    REGISTER: "/api/v1/users/register",
    LOGIN: "/api/v1/users/login",
    WHOAMI: "/api/v1/users/whoami",
    UPDATE: "/api/v1/users/update",
    UPDATE_PASSWORD: "/api/v1/users/change-password",
  },
  USERS: {
    SEARCH: "/api/v1/users/search",
  },
  CHATS: {
    LIST: "/api/v1/chats",
    DIRECT: "/api/v1/chats/direct",
    GROUP: "/api/v1/chats/group",
    BY_ID: (id: string) => `/api/v1/chats/${id}`,
  },
  MESSAGES: {
    SEND: "/api/v1/messages",
    READ: "/api/v1/messages/read",
    CALLS_HISTORY: "/api/v1/messages/calls/history",
    BY_CHAT: (chatId: string) => `/api/v1/messages/${chatId}`,
    DELETE_BY_ID: (id: string) => `/api/v1/messages/${id}`,
  },
  CONFIG: {
    ICE_SERVERS: "/api/v1/config/ice-servers",
  },
  AI: {
    CHAT: "/api/v1/ai/chat",
  },
  ADMIN: {
    USERS: {
      GET_ALL: "/api/v1/admin/users",
      GET_BY_ID: (id: string) => `/api/v1/admin/users/${id}`,
      UPDATE_BY_ID: (id: string) => `/api/v1/admin/users/${id}`,
      DELETE_BY_ID: (id: string) => `/api/v1/admin/users/${id}`,
      CREATE: "/api/v1/admin/users",
    },
  },
};
