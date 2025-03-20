import { Edit, Home, Plus, Layers, Upload, FilePenLine, CalendarDays } from "lucide-react";



export const linksAdmin = [
  {
    path: "/",
    icon: Home,
    text: "Dashboard",
    sublink: []
  },
  {
    path: "/tournament",
    icon: Layers,
    text: "Tournament",
    sublink: [
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
        path: "/tournament/"
      }
    ]
  }
];