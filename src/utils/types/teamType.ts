export interface ITeam {
  _id: string;
  playerCount?: number;
  teamName: string;
  teamLogo: string;
}

export interface ITeamPagination {
  currentPage: number;
  totalPages: number;
  totalTeams: number;
}

export interface IAllTeams {
  totalTeams: number;
  teams: ITeam[];
  pagination: ITeamPagination;
}
