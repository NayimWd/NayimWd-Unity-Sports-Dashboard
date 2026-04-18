import { Link } from "react-router-dom";
import Card from "../../../component/common/card/Card";
import Buttons from "../../../component/common/Buttons";
import { Edit } from "lucide-react";

const ProfileCard = ({
    children,
    editTo,
}: {
    children: React.ReactNode;
    editTo: string;
}) => (
    <Card className="border border-border rounded-2xl p-0 overflow-hidden max-w-2xl mx-auto">
        <div className="h-1 w-full bg-gradient-primary" />
        <div className="p-6 space-y-5">
            {children}
            <div className="pt-4 border-t border-border flex justify-end">
                <Link to={editTo}>
                    <Buttons
                        size="sm"
                        variant="primary"
                        className="rounded-lg flex items-center gap-2"
                        iconLeft={<Edit size={13} />}
                    >
                         Edit Profile
                    </Buttons>
                </Link>
            </div>
        </div>
    </Card>
);
export default ProfileCard