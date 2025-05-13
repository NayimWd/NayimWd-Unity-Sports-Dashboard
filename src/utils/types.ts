export type ThemeType = "light" | "dark" | "system";

// api response type
export interface ApiResponse<T> {
  statusCode: number;
  data: T;
  message: string;
  success: boolean;
  error?: string;
}

// tournament type
export interface Tournament {
  _id: string;
  tournamentName: string;
  photo: string;
}

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
