import { Link } from "react-router-dom"
import { ITeam } from "../../../utils/types/teamType"
import Buttons from "../Buttons"
import Card from "./Card"



const TeamCard = ({ _id, teamLogo, teamName }: ITeam) => {
  return (
    <Card
      variant="Team"
      size="md"
      className="cursor-pointer overflow-hidden group transition-all"
    >
      {/* image */}
      <Card.Image src={teamLogo} alt={teamName} className="h-40">
        {/* gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-black/80 opacity-70 group-hover:opacity-80 transition-all"></div>

        {/* badge */}
        <div className="absolute top-3 right-3 px-2 py-1 text-xs font-semibold rounded-md bg-primary text-white shadow">
          Team
        </div>
      </Card.Image>

      {/* content */}
      <Card.Content className="pt-3">
        {/* team name */}
        <Card.Title className="text-font group-hover:text-primary transition-colors duration-200 line-clamp-1">
          {teamName}
        </Card.Title>

        {/* future idea */}
        {/* <div className="flex items-center gap-3 mt-1 text-xs text-subtext">
          <span>🏆 12 Wins</span>
          <span>•</span>
          <span>🥈 3 Runner-ups</span>
        </div> */}
      </Card.Content>
      <Card.Footer>
        <Link to={`/dashboard/team/details/${_id}`}>
        <Buttons className="rounded px-3" variant="primary" size="sm">View</Buttons>
        </Link>
      </Card.Footer> 
    </Card>
  )
}

export default TeamCard