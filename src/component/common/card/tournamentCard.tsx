import { Link } from "react-router-dom";
import Buttons from "../Buttons";
import Card from "./Card";

interface TournamentCardProps {
    _id: string;
    tournamentName: string;
    tournamentType: string;
    entryFee: string;
    status: string;
    photo: string;
    startDate: string;
    endDate: string;
}

const TournamentCard = ({ tournamentName, tournamentType, entryFee, status, photo, _id, startDate, endDate }: TournamentCardProps) => {

    return (
        <Card variant="Tournament">
            {/* Image */}
            <Card.Image src={photo} alt={`${tournamentName} image`}>
                {/* status pills */}
                <Card.Tags>
                    <Card.Tag className={`
          inline-block px-3 py-1 text-xs rounded-full capitalize
          ${status === "completed"
                            ? "bg-emerald-100 text-emerald-700"
                            : status === "ongoing"
                                ? "bg-blue-100 text-blue-700"
                                : "bg-amber-100 text-amber-700"
                        }
        `}>
                        {status}
                    </Card.Tag>
                        <div className="hidden absolute top-0 right-0 bg-black/80 px-1 text-sm rounded text-muted">
                            <p>{startDate} - {endDate}</p>
                        </div>
                </Card.Tags>
            </Card.Image>
            {/* card content */}
            <Card.Content className="py-2">
                <Card.Title>
                    {tournamentName}
                </Card.Title>
                <div className="flex justify-between text-sm text-gray-500 dark:text-gray-400 py-2">
                    <span className="capitalize">Tournament : {tournamentType}</span>
                    <span>Entry Fee : ${entryFee}</span>
                </div>
               
            </Card.Content>
            {/* card footer */}
            <Link to={`/dashboard/tournament/details/${_id}`}>
            <Buttons
                variant="outline"
                className="w-full mt-2"
            >
                View Details
            </Buttons>
            </Link>
        </Card>
    )
}

export default TournamentCard;