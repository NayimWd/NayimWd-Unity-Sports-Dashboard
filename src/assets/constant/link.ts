import { Edit, Home, Plus, Layers, Upload, FilePenLine, CalendarDays, FileText, Trophy, SquarePen, Component, Users } from "lucide-react";



export const linksAdmin = [
  {
    path: "/",
    icon: Home,
    text: "Dashboard",
    sublink: []
  },
  {
    path: "",
    icon: Users,
    text: ""
  },
  {
    path: "",
    icon: Layers,
    text: "Tournament",
    sublink: [
      {
        path: "/tournament",
        icons: FileText,
        text: "ALL Tournament"
      },
      {
        path: "/tournament/result",
        icons: Trophy,
        text: "Result"
      },
      {
        path: "/tournament/result/create",
        icons: SquarePen,
        text: "Create Result"
      },
      {
        path: "/tournament/create",
        icons: Plus,
        text: "Create Tournament"
      },
      {
        path: "/tournament/update_details/:tournamentId",
        icons: Edit,
        text: "Update Tournament",
      },
      {
        path: "/tournament/update_photo/:TournamentId",
        icons: Upload,
        text: "Update Photo",
      },
      {
        path: "/tournament/status/:tournamentId",
        icon: FilePenLine,
        text: "Update Photo"
      },
      {
        path: "/tournament/update_date/:tournamentId",
        icon: CalendarDays,
        text: "Update Date"
      },
      {
        path: "/tournament/team",
        icon: Component,
        text: "Teams"
      }
    ]
  }
];