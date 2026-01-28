// Team info
export interface MatchTeam {
  _id: string;
  teamName: string;
  teamLogo: string;
}

// Previous matches (for qualifier rounds)
export interface PreviousMatches {
  matchA?: string | null;
  matchB?: string | null;
}

// winner
interface IWinner {
  _id: string;
  teamName: string;
}

// Match summary (optional for upcoming matches)
export interface MatchSummary {
  teamA_stats: string;
  teamB_stats: string;
  margin: string;
  matchDate: string;
  matchTime: string;
  winner?: IWinner;
  report?: string
}

// Single Match item
export interface TournamentMatch {
  _id: string;
  tournamentId: string;

  matchNumber: number;

  teamA: MatchTeam;
  teamB: MatchTeam;

  status:
    | "upcoming"
    | "scheduled"
    | "completed"
    | "rescheduled"
    | "in-progress"
    | "cancelled";

  // optional match summary (only completed matches)
  matchSummary?: MatchSummary | null;

  // optional previous match links (only qualifier, eliminator, final)
  previousMatches?: PreviousMatches | null;

  createdAt?: string;
  updatedAt?: string;
}

// Response data structure
export interface MatchListData {
  match: TournamentMatch[];
  total: number;
}

// ----------- match details types --------------//
export interface ITeamMini {
  _id: string;
  teamName: string;
  teamLogo: string;
}

export interface IPersonMini {
  _id: string;
  name: string;
  photo?: string | null;
}

export interface IVenueMini {
  _id: string;
  name: string;
  location: string;
}

export type MatchStatus =
  | "scheduled"
  | "upcoming"
  | "in-progress"
  | "completed"
  | "cancelled"
  | "rescheduled";

export interface IPreviousMatches {
  matchA?: number | null;
  matchB?: number | null;
}

export interface IUmpires {
  firstUmpire?: IPersonMini | null;
  secondUmpire?: IPersonMini | null;
  thirdUmpire?: IPersonMini | null;
}

export interface IMatch {
  _id: string;
  tournamentId: string;
  matchNumber: number;

  teamA?: ITeamMini;
  teamB?: ITeamMini;

  previousMatches?: IPreviousMatches | null;
  umpires?: IUmpires | null;

  status: MatchStatus;

  createdAt?: string;
  updatedAt?: string;
}

export interface IMatchInfo {
  _id: string;
  matchNumber: number;

  matchDate?: string | null;
  matchTime?: string | null;
  round?: string | null;

  venueId?: IVenueMini | null;

  status: MatchStatus;

  createdAt?: string;
  updatedAt?: string;
}

export interface IMatchResult {
  teamA_stats?: string | null;
  teamB_stats?: string | null;

  winner?: ITeamMini | null;
  method?: string | null;
  report?: string | null;
  margin?: string | null;

  manOftheMatch?: IPersonMini | null;
}

export interface IMatchDetailsResponse {
  match: IMatch;
  matchInfo: IMatchInfo | null;
  MatchResult: IMatchResult | null;
}
