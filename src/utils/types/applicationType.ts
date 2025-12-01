 interface IManagerIdMini {
    name: string,
    _id: string
}

interface ITeamIdMini {
    teamName: string,
    _id: string
}

interface IRegistrationData {
    managerId: IManagerIdMini,
    teamId: ITeamIdMini,
    status: 'approved' | 'pending' | 'rejected' | string, 
    _id: string
}

export interface IRegistrations {
    registration: IRegistrationData[],
    total: number
}