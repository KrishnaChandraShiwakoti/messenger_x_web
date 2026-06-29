interface User {
  _id: string;
  fullName?: string;
  firstName?: string;
  lastName?: string;
  email: string;
  phoneNumber?: string;
  role: "admin" | "user";
  status?: "active" | "inactive";
  createdAt?: string;
  imageUrl?: string;
}

interface Pagination {
  page: number;
  limit: number;
  totalPages: number;
  total: number;
}

interface UserTableProps {
  data: User[];
  pagination: Pagination;
  search: string;
}
