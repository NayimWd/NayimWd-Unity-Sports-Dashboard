import Card from "./Card"
import Buttons from "../Buttons"
import Badge from "../../ui/Badge"
import { Link } from "react-router-dom"

interface playerCardProps {
    _id: string,
    name: string,
    photo: string,
    role: string,
    isCaptain: boolean,
}

const PlayerCard = ({ _id, name, photo, role, isCaptain }: playerCardProps) => {
    return (
        <Card variant="Player" size="sm" className="rounded-md p-0">
            <Card.Image
                src={photo}
                alt={name}
                className="h-32"
            >
                <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-black/80 opacity-70 group-hover:opacity-80 transition-all"></div>
                <Card.Tags>
                    <Card.Tag>

                        {

                            isCaptain ? <Badge className="" variant="info" size="sm">Captain</Badge>

                                :
                                ""}
                    </Card.Tag>
                </Card.Tags>
            </Card.Image>
            <Card.Content className="p-3">
                <div className="w-full flex justify-between items-center">
                    <Card.Title className="text-base">{name}</Card.Title>
                    <Link to={`/dashboard/players/details/${_id}`}>
                    <Buttons className="rounded" size="sm">view</Buttons>
                    </Link>
                </div>
                <span className="text-xs text-muted">{role}</span>

            </Card.Content>

        </Card>
    )
}

export default PlayerCard;