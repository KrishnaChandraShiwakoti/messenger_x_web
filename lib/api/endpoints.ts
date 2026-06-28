// centralized path definitions for API endpoints
export const API = {
  AUTH: {
    REGISTER: "/api/v1/users/register",
    LOGIN: "/api/v1/users/login",
    WHOAMI: "/api/v1/users/whoami",
    UPDATE: "/api/v1/users/update",
    UPDATE_PASSWORD: "/api/v1/users/change-password",
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
