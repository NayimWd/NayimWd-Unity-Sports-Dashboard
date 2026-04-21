import { Plus, Users } from "lucide-react";
import Card from "../../../component/common/card/Card";
import { Link } from "react-router-dom";
import Buttons from "../../../component/common/Buttons";

const EmptyProfile = ({
    role,
}: {
    role: "manager" | "player" | "umpire";
}) => {
    const config = {
        manager: {
            message: "Create a team to generate your manager profile.",
            cta: "Create Team",
            to: "/dashboard/team/create",
        },
        player: {
            message: "You haven't set up your player profile yet.",
            cta: "Create Profile",
            to: "/dashboard/profile/create",
        },
        umpire: {
            message: "You haven't set up your umpire profile yet.",
            cta: "Create Profile",
            to: "/dashboard/profile/create",
        },
    };

    const { message, cta, to } = config[role];

    return (
        <Card className="border border-border rounded-2xl p-0 overflow-hidden max-w-md mx-auto">
            <div className="h-1 w-full bg-gradient-primary" />
            <div className="p-10 flex flex-col items-center text-center gap-3">
                <div className="w-12 h-12 rounded-xl bg-subSurface flex items-center justify-center">
                    <Users size={20} className="text-muted" />
                </div>
                <div>
                    <p className="text-sm font-medium text-font">No profile found</p>
                    <p className="text-xs text-muted mt-1">{message}</p>
                </div>
                <Link to={to}>
                    <Buttons
                        size="sm"
                        variant="primary"
                        className="rounded-lg mt-1 flex items-center gap-2"
                        iconLeft={<Plus size={13} />}
                    >
                         {cta}
                    </Buttons>
                </Link>
            </div>
        </Card>
    );
};

export default EmptyProfile;