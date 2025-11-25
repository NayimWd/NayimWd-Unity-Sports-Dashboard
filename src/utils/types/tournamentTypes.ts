export interface ITournamentMini {
    _id: string;
    tournamentName: string;
    entryFee: string;
    tournamentType: string;
    status: string;
    photo: string;
};

export interface ITournaments {
    total: number,
    tournaments: ITournamentMini[],
};
