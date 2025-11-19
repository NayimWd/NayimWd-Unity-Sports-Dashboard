import Card from "./Card"

interface playerCardProps {
    _id: string,
    name: string,
    photo: string,
    role: string,
    isCaptain: boolean,
}

const PlayerCard = ({_id, name, photo, role, isCaptain }: playerCardProps) => {
    return (
        <Card variant="Player" size="sm" className="rounded-md p-0">
            <Card.Image
                src={photo}
                alt={name}
                className="h-32"
            >
                <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-black/80 opacity-70 group-hover:opacity-80 transition-all"></div>
            </Card.Image>
            <Card.Content className="p-3">
                <Card.Title className="text-base">{name}</Card.Title>
                <span className="text-xs text-muted">{role}</span>

                {isCaptain && (
                    <span className="inline-block mt-2 rounded-md bg-blue-500 text-white text-xs px-2 py-1">
                        Captain
                    </span>
                )}
            </Card.Content>
            
        </Card>
    )
}

export default PlayerCard