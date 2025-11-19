export interface IPlayer {
  _id: string;
  name: string;
  photo: string;
  role: string | null;
  status: "active" | "benched" | "injured";
  isCaptain: boolean;
}


export interface IManager {
    _id: string,
    name: string,
    photo: string,
    email: string,
}



