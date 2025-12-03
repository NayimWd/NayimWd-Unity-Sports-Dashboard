// Single team result
export interface ITournamentTeamResult {
  _id: string;
  teamName: string;
  teamLogo: string;
}

// Man of the tournament
export interface IManOfTheTournament {
  _id: string;
  name: string;
  photo: string | null;
}

// Tournament awards
export interface ITournamentAwards {
  champion: ITournamentTeamResult;
  runnerUp: ITournamentTeamResult;
  thirdPlace: ITournamentTeamResult;
}

// Tournament result details
export interface ITournamentResult {
  _id: string;
  tournamentId: string;
  result: ITournamentAwards;
  manOfTheTournament: IManOfTheTournament;
  awardFor: string;
  photo: string | null;
  createdAt: string; 
  updatedAt: string;
  __v: number;
}

// Tournament basic info
export interface ITournamentSummary {
  _id: string;
  tournamentName: string;
  photo: string;
  endDate: string; 
}

// Final response for latest tournament
export interface ILatestTournamentResponse {
  result: ITournamentResult;
  tournament: ITournamentSummary;
}
