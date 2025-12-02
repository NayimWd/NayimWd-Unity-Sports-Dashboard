 interface IManagerIdMini {
    name: string,
    photo?: string,
    _id: string
}

interface ITeamIdMini {
    teamName: string,
    teamLogo: string,
    _id: string
}

export interface IRegistrationData {
    managerId: IManagerIdMini,
    teamId: ITeamIdMini,
    status: 'approved' | 'pending' | 'rejected' | string, 
    _id: string
}

export interface IRegistrations {
    registration: IRegistrationData[],
    total: number
}

export type ApplicationStatus = "approved" | "pending" | "rejected";


export interface IApplicationDetails {
  _id: string;
  tournamentId: string;
  teamId: ITeamIdMini;
  managerId: IManagerIdMini;
  applicationDate: string; 
  status: ApplicationStatus;
  createdAt: string;
  updatedAt: string;
}