import { Link } from "react-router-dom"
import { Settings, User } from "lucide-react"
import Buttons from "../../../component/common/Buttons"

interface teamInterface {
    team: any,
    isManager: boolean
    teamId: any
}

function Hero({ team, isManager, teamId }: teamInterface) {
    return (
        <div className="rounded-2xl border border-border bg-surface overflow-hidden">
            <div className="h-1 w-full bg-gradient-primary" />
            <div className="p-5 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div className="flex items-center gap-4">
                    <div className="relative flex-shrink-0">
                        <img
                            src={team.teamLogo}
                            alt={team.teamName}
                            className="w-14 h-14 rounded-xl object-cover border border-border"
                            loading="lazy"
                        />
                        <span className="absolute -bottom-1 -right-1 w-3 h-3 bg-green-500
                                     border-2 border-surface rounded-full" />
                    </div>
                    <div className="space-y-1.5">
                        <h1 className="text-base font-medium text-font">{team.teamName}</h1>
                        <div className="flex flex-wrap gap-2">
                            <span className="flex items-center gap-1.5 text-xs text-subtext
                                       bg-subSurface px-2.5 py-1 rounded-full">
                                <User size={11} className="text-primary" />
                                {team.playerCount} Players
                            </span>
                            {team.managerId && (
                                <span className="flex items-center gap-1.5 text-xs text-subtext
                                         bg-subSurface px-2.5 py-1 rounded-full">
                                    <Settings size={11} className="text-primary" />
                                    {team.managerId.name}
                                </span>
                            )}
                        </div>
                    </div>
                </div>

                {/* Manager CTA */}
                {isManager && (
                    <Link to={`/dashboard/team/edit/${teamId}`} className="sm:flex-shrink-0">
                        <Buttons
                            size="sm"
                            variant="primary"
                            className="w-full rounded-lg flex items-center justify-center text-center"
                            iconLeft={<Settings size={13} />}
                        >
                            Manage Team
                        </Buttons>
                    </Link>
                )}
            </div>
        </div>
    )
}

export default Hero