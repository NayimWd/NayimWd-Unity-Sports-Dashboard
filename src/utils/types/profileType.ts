// Base User
interface BaseUser {
  _id: string;
  name: string;
  photo: string;
}

// manager profile type
export interface ManagedTeam {
  _id: string;
  teamName: string;
  teamLogo: string;
}

export interface ManagerProfile {
  _id: string;
  userId: BaseUser;
  teamsManaged: ManagedTeam[];
}

// player profile type
export interface PlayerTeamInfo {
  _id: string;
  teamName: string;
  teamLogo: string;
}

export interface PlayerProfile {
  _id: string;
  userId: BaseUser;
  DateOfBirth: string;
  batingStyle: "right hand" | "left hand";
  bowlingArm: "right arm" | "left arm";
  bowlingStyle: "fast" | "spin" | "swing" | "seam";
  player_role: "batsman" | "bowler" | "all-rounder" | "wk-batsman";
  teamId: PlayerTeamInfo;
  __v: number;
}

// umpire profile type
export interface UmpireProfile {
  _id: string;
  userId: BaseUser;
  yearsOfExperience: number;
  __v: number;
}
