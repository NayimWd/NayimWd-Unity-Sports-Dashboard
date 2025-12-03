export interface ITournamentMini {
    _id: string;
    tournamentName: string;
    entryFee: string;
    tournamentType: string;
    status: string;
    photo: string;
    startDate?: string;
    endDate?: string;
};

export interface ITournaments {
    total: number,
    tournaments: ITournamentMini[],
};

// tournament details 
export interface ITournamentData {
  _id: string;
  ballType: string;
  champion: string;
  createdAt: string;
  description: string;
  endDate: string;
  photo: string;
  registrationDeadline: string;
  runnerUp: string;
  startDate: string;
  status: string;
  thirdPlace: string;
  tournamentName: string;
  tournamentType: string;
  updatedAt: string;
  entryFee: number;
  format: number;
  matchOver: number;
  seat: number;
  teamCount: number;
};

// tournament result 
export interface ITournamentTeamResult {
  _id: string;
  teamName: string;
  teamLogo: string;
}

// mom of tournament
export interface IManOfTheTournament {
  _id: string;
  name: string;
  photo: string | null;
}

// team results
export interface ITournamentAwards {
  champion: ITournamentTeamResult;
  runnerUp: ITournamentTeamResult;
  thirdPlace: ITournamentTeamResult;
}

// Core Result document
export interface ITournamentResult {
  _id: string;
  awardFor: string;                 
  tournamentId: string;           
  createdAt: string;
  updatedAt: string;
  __v: number;
  result: ITournamentAwards;       
  manOfTheTournament: IManOfTheTournament;
  photo: string | null;           
}

//  tournament summary
export interface ITournamentSummary {
  _id: string;
  tournamentName: string;
  photo: string;
}

// final response
export interface ITournamentFinalResult {
  result: ITournamentResult;
  tournament: ITournamentSummary;
}


// result summary 
export interface ITournamentGlimps {
  endDate: string,
  photo: string,
  tournamentName: string,
  _id: string
} 

export interface ILatestTournamentResult {
  tournament: ITournamentGlimps,
  result: ITournamentResult
}