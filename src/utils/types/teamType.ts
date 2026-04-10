import { IManager, IPlayer } from "./playerType";

export interface ITeam {
  _id: string;
  playerCount?: number;
  teamName: string;
  teamLogo: string;
}


export interface IMyTeam {
  _id: string;
  teamName: string;
  teamLogo: string;
  playerCount: number;
  managerId: string;
  createdAt: string;
  updatedAt: string; 
}

export interface ITeamPagination {
  currentPage: number;
  totalPages: number;
  totalTeams: number;
}

export interface IAllTeams {
  totalTeams: number;
  teams: [ITeam];
  pagination: ITeamPagination;
}

interface ITeamD {
  _id: string;
  managerId: IManager;
  playerCount: number;
  teamName: string;
  teamLogo: string;
  createdAt: string;

}

export interface ITeamDetails {
players: IPlayer[];
team: ITeamD;
}