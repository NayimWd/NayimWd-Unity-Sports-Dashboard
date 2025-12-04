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

// Match summary (optional for upcoming matches)
export interface MatchSummary {
  teamA_stats: string;
  teamB_stats: string;
  margin: string;
}

// Single Match item
export interface TournamentMatch {
  _id: string;
  tournamentId: string;

  matchNumber: number;

  teamA: MatchTeam;
  teamB: MatchTeam;

  status: "upcoming" | "scheduled" | "completed" | "rescheduled" | "in-progress" | "cancelled";

  // optional match summary (only completed matches)
  matchSummary?: MatchSummary | null;

  // optional previous match links (only qualifier, eliminator, final)
  previousMatches?: PreviousMatches | null;

  createdAt: string;
  updatedAt: string;
}

// Response data structure
export interface MatchListData {
  match: TournamentMatch[];
  total: number;
}

// Top level API envelope
export interface MatchListResponse {
  statusCode: number;
  success: boolean;
  message: string;
  data: MatchListData;
}
