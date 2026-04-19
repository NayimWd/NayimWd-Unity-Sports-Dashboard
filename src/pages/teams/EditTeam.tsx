import { useParams, Link } from "react-router-dom";
import {
    UserPlus, UserMinus, Crown, Edit
} from "lucide-react";
import { useGoBack } from "../../hooks/useGoBack";
import { useGetTeamDetailsQuery } from "../../features/team/teamApi";
import PageLayout from "../../component/layout/PageLayout";
import BackButton from "../../utils/BackButton";

const editOptions = [
    {
        icon: UserPlus,
        label: "Add Player",
        description: "Add a new player to your squad",
        to: "add-player",
        color: "text-primary",
        bg: "bg-primary/10",
    },
    {
        icon: UserMinus,
        label: "Remove Player",
        description: "Remove a player from your squad",
        to: "remove-player",
        color: "text-toastErrorText",
        bg: "bg-toastErrorBg",
    },
    {
        icon: Crown,
        label: "Manage Captain",
        description: "Assign or remove team captain",
        to: "captain",
        color: "text-yellow-600",
        bg: "bg-yellow-50 dark:bg-yellow-900/20",
    },
    {
        icon: Edit,
        label: "Edit Team Info",
        description: "Update team name and logo",
        to: "info",
        color: "text-purple-600",
        bg: "bg-purple-50 dark:bg-purple-900/20",
    },
];

const EditTeam = () => {
    const { teamId } = useParams();
    const goBack = useGoBack();
    const { data, isLoading } = useGetTeamDetailsQuery(teamId, { skip: !teamId });
    const team = data?.team;



    return (
        <PageLayout>
            <BackButton onClick={goBack}>Go Back</BackButton>

            <div className="max-w-2xl mx-auto mt-6 space-y-6 px-2 sm:px-0">

                {/* Header */}
                {!isLoading && team && (
                    <div className="flex items-center gap-3">
                        <img
                            src={team.teamLogo}
                            alt={team.teamName}
                            className="w-10 h-10 rounded-xl object-cover border border-border"
                        />
                        <div>
                            <h1 className="text-base font-medium text-font">{team.teamName}</h1>
                            <p className="text-xs text-muted">Select an action to manage your team</p>
                        </div>
                    </div>
                )}

                {/* Options grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {editOptions.map(({ icon: Icon, label, description, to, color, bg }) => (
                        <Link
                            key={to}
                            to={`/dashboard/team/edit/${teamId}/${to}`}
                        >
                            <div className="flex items-start gap-4 p-4 rounded-xl border border-border
                              bg-surface hover:bg-subSurface hover:border-inputBorder
                              transition-colors duration-150 group cursor-pointer h-full">
                                <div className={`w-9 h-9 rounded-lg flex items-center justify-center
                                 flex-shrink-0 ${bg}`}>
                                    <Icon size={16} className={color} />
                                </div>
                                <div className="flex-1 min-w-0">
                                    <p className="text-sm font-medium text-font">{label}</p>
                                    <p className="text-xs text-muted mt-0.5">{description}</p>
                                </div>
                                <span className="text-muted opacity-0 group-hover:opacity-100
                                 transition-opacity text-xs mt-0.5">→</span>
                            </div>
                        </Link>
                    ))}
                </div>

            </div>
        </PageLayout>
    )
}

export default EditTeam