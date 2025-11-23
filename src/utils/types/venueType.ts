export interface IVenueMini {
    name: string;
    city: string;
    photo: string;
    _id: string;
};

export interface IVenueDetails extends IVenueMini {
    location: string;
    features: string;
}

export interface IVenue {
    total: number;
    venues: IVenueMini[];
}