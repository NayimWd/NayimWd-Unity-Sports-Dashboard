import { CheckCircle2, XCircle, Clock } from "lucide-react";

export const statusConfig = {
    pending: {
        icon: Clock,
        label: "Application Pending",
        desc: "Your application is under review.",
        bg: "bg-yellow-500/10",
        border: "border-yellow-500/20",
        color: "text-yellow-600",
        dot: "bg-yellow-500",
    },
    approved: {
        icon: CheckCircle2,
        label: "Application Approved",
        desc: "Congratulations! Your team has been accepted.",
        bg: "bg-green-500/10",
        border: "border-green-500/20",
        color: "text-green-600",
        dot: "bg-green-500",
    },
    rejected: {
        icon: XCircle,
        label: "Application Rejected",
        desc: "Your application was not accepted this time.",
        bg: "bg-toastErrorBg",
        border: "border-toastErrorText/20",
        color: "text-toastErrorText",
        dot: "bg-toastErrorText",
    },
    withdrawn: {
        icon: XCircle,
        label: "Withdrawn",
        desc: "You have withdrawn your application.",
        bg: "bg-subSurface",
        border: "border-border",
        color: "text-muted",
        dot: "bg-muted",
    },
} as const;

