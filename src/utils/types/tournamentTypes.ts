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
}