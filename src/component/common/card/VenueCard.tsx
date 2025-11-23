import { Link } from "react-router-dom";
import cn from "../../../utils/cn";
import { IVenueMini } from "../../../utils/types/venueType"
import Buttons from "../Buttons";
import Card from "./Card"

interface VenueCardProps {
    venue: IVenueMini;
    className?: string;
}



const VenueCard = ({ venue, className }: VenueCardProps) => {
    return (
        <Card
            variant="venue"
            className={cn(
                "cursor-pointer hover:-translate-y-1 hover:shadow-xl transition-all duration-300",
                className
            )}
        >
            {/* card image */}
            <Card.Image src={venue.photo} alt={`photo ${venue.name}`}>
                <div className="absolute inset-0 bg-black/10 group-hover:bg-black/5 transition" />
            </Card.Image>
            {/* card details */}
            <div className="flex justify-between items-center gap-5 p-4">
                <div className=" space-y-1">
                    <h3 className="text-lg font-semibold line-clamp-1">
                        {venue.name}
                    </h3>
                    <p className="text-sm text-muted line-clamp-1 flex gap-2">
                        <span className="opacity-80">{venue.city}</span>
                    </p>
                </div>
                <Link to={`/dashboard/venue/${venue._id}`}>
                    <Buttons className="rounded" size="sm" variant="primary">Details</Buttons>
                </Link>
            </div>
        </Card>
    )
};

export default VenueCard;