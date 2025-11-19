export type ThemeType = "light" | "dark" | "system";

// api response type
export interface ApiResponse<T> {
  statusCode: number;
  data: T;
  message: string;
  success?: boolean;
  error?: string;
}

// pagination type
export interface PaginationMeta {
  totalItems: number;
  totalPages: number;
  currentPage: number;
  pageSize: number;
}

export interface PaginateData<T> {
  items: T[];
  pagination: PaginationMeta;
}

// --------------------------------------------------------------------- //
// --------------------------- USER ----------------------------------//
// -------------------------------------------------------------------- //
export interface IUser {
  _id: string;
  name: string;
  email: string;
  phoneNumber: string;
  role: string;
  photo: string;
  createdAt: string;
  updatedAt?: string;
}

export interface IUserPagination {
  totalUsers: number;
  currentPage: number;
  totalPages: number;
}

export interface IAllUsersData {
  All_users: number;
  users: IUser[];
  pagination: IUserPagination;
}

export interface IUserQueryParams {
  page?: number;
  limit?: number;
  name?: string;
  email?: string;
  role?: string;

  // sort
  sortField?: string; // exmp: "name", "email", "role" etc sorting
  sortOrder?: "asc" | "desc";
}

// tournament type
export interface Tournament {
  _id: string;
  tournamentName: string;
  photo: string;
}
// -------------------------------------------------------------------- //
// point table type
// team
export interface Team {
  _id: string;
  teamName: string;
}

export interface PointTableRow {
  _id: string;
  tournamentId: string;
  teamId: Team;
  matchPlayed: number;
  wins: number;
  losses: number;
  ties: number;
  points: number;
}

export interface PointTableData {
  pointTable: PointTableRow[];
  tournament: Tournament;
}
// ------------------------------------------------------------------- //
// --------------------------- Blogs ----------------------------------//
// ------------------------------------------------------------------- //
export interface Blog {
  _id: string;
  title: string;
  author: string;
  createdAt: string;
  tags: string;
  photo: string[];
}

export interface Blogs {
  blogs: [];
  pagination: PaginationMeta;
}

export interface BlogDetails {
  _id: string;
  content: string;
  title: string;
  author: string;
  createdAt: string;
  photo: [string];
  tags: string;
}
