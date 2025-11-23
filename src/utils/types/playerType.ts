export interface IPlayer {
  _id: string;
  name: string;
  photo: string;
  role: string | null;
  status: "active" | "benched" | "injured";
  isCaptain: boolean;
}

export interface IManager {
  _id: string;
  name: string;
  photo: string;
  email: string;
}

// for player details response type
interface ITeamMini {
  _id: string;
  teamName: string;
  teamLogo: string;
}

interface IPlayerLocal {
  _id: string;
  name: string;
  photo: string;
  role: string;
}

interface IPlayerMini {
  isCaptain: boolean;
  status: string;
  playerId: IPlayerLocal;
  teamId: ITeamMini;
}

interface IPlayerProfile {
  _id: string;
  player_role: string;
  batingStyle: string;
  bowlingArm: string;
  bowlingStyle: string;
  DateOfBirth: string;
}

export interface IPlayerDetails {
  player: IPlayerMini;
  playerProfile: IPlayerProfile;
}
