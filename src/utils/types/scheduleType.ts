interface Team {
  _id: string;
  teamName: string;
  teamLogo: string;
}

interface Venue {
  _id: string;
  name: string;
}

interface PreviousMatchRef {
  _id: string;
  matchNumber: number;
}

interface PreviousMatches {
  matchA: PreviousMatchRef | null;
  matchB: PreviousMatchRef | null;
}

interface ScheduleTeams {
  teamA: Team | null;
  teamB: Team | null;
}

type MatchStatus =
  | "scheduled"
  | "rescheduled"
  | "in-progress"
  | "completed"
  | "cancelled";

export interface MatchSchedule {
  _id: string;

  matchId: string;
  matchNumber: number;
  round: string;

  matchDate: string;
  matchTime: string;

  status: MatchStatus;

  tournamentId: string;

  teams: ScheduleTeams;

  previousMatches: PreviousMatches;

  venueId?: Venue;
}

export interface ScheduleListPayload {
  schedules: MatchSchedule[];
  total: number;
}