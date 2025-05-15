import {
  Home,
  Plus,
  Layers,
  CalendarDays,
  FileText,
  Trophy,
  SquarePen,
  Component,
  Users,
  ShieldUser,
  BookType,
  School,
  FileStack,
  CalendarPlus,
  CalendarPlus2,
  CalendarRange,
  SquareSigma,
  GalleryHorizontalEnd,
  PenLine,
  ChartLine,
  Newspaper,
  BookPlus,
  Notebook,

  // Telescope,
  User2,
  Boxes,
} from "lucide-react";

export const navLinks = {
  admin: [
    {
      path: "/dashboard",
      icon: Home,
      label: "Dashboard",
      children: [],
    },
    {
      path: "",
      icon: Users,
      label: "Users",
      children: [
        {
          path: "/dashboard/account",
          icon: User2,
          label: "Account",
        },
        {
          path: "/dashboard/users",
          icon: Users,
          label: "All Users",
        },
      ],
    },
    {
      path: "/dashboard/profile",
      icon: ShieldUser,
      label: "Profile",
      children: [],
    },
    {
      path: "/dashboard/team",
      icon: BookType,
      label: "Team",
      children: [],
    },
    {
      path: "",
      icon: Layers,
      label: "Tournament",
      children: [
        {
          path: "/dashboard/tournament",
          icon: FileText,
          label: "ALL Tournament",
        },
        {
          path: "/dashboard/currentTournament",
          icon: Component,
          label: "Running Tournament",
        },
        {
          path: "/dashboard/tournament/create",
          icon: Plus,
          label: "Create Tournament",
        },
        {
          path: "/dashboard/tournamentResult",
          icon: Trophy,
          label: "Tournament Result",
        },
      ],
    },
    {
      path: "/dashboard/application",
      icon: FileStack,
      label: "Applications",
      children: [],
    },
    {
      path: "",
      icon: CalendarDays,
      label: "Schedule",
      children: [
        {
          path: "/dashboard/schedule",
          icon: CalendarRange,
          label: "Schedule",
        },
        {
          path: "/dashboard/schedule/firstRound/create",
          icon: CalendarPlus,
          label: "Create 1st round",
        },
        {
          path: "/dashboard/schedule/qualifier/create",
          icon: CalendarPlus2,
          label: "Create qualifier round",
        },
      ],
    },
    {
      path: "",
      icon: SquareSigma,
      label: "Match",
      children: [
        {
          path: "/dashboard/match",
          icon: GalleryHorizontalEnd,
          label: "All Match",
        },
        {
          path: "/match/create",
          icon: SquarePen,
          label: "Create Qualifire Match",
        },
        {
          path: "/innings/create",
          icon: SquarePen,
          label: "Create Innings",
        },
      ],
    },
    {
      path: "/dashboard/pointTable",
      icon: ChartLine,
      label: "Point Table",
    },
    {
      path: "",
      icon: School,
      label: "Venue",
      children: [
        {
          path: "/dashboard/venue",
          icon: School,
          label: "All Venue",
        },
        {
          path: "/dashboard/venue/create",
          icon: Plus,
          label: "Create Venue",
        },
      ],
    },
    {
      path: "",
      icon: Newspaper,
      label: "Blog",
      children: [
        {
          path: "/dashboard/blogs",
          icon: Notebook,
          label: "Blogs",
        },
        {
          path: "/blog/create",
          icon: BookPlus,
          label: "Create Blog",
        },
      ],
    },
  ],
  manager: [
    {
      path: "/dashboard",
      icon: Home,
      label: "Dashboard",
      children: [],
    },
    {
      path: "/dashboard/account",
      icon: Users,
      label: "Account",
      children: [],
    },
    {
      path: "/dashboard/profile",
      icon: ShieldUser,
      label: "Profile",
      children: [],
    },
    {
      path: "",
      icon: BookType,
      label: "Team",
      children: [
        {
          path: "/dashboard/teams",
          icon: Boxes,
          label: "Teams",
        },
        {
          path: "/dashboard/team/myTeam",
          icon: Users,
          label: "My Team",
        },
        {
          path: "/dashboard/team/create",
          icon: PenLine,
          label: "Create Team",
        },
      ],
    },
    {
      path: "",
      icon: Layers,
      label: "Tournament",
      children: [
        {
          path: "/dashboard/tournament",
          icon: FileText,
          label: "ALL Tournament",
        },
        {
          path: "/dashboard/currentTournament",
          icon: Component,
          label: "Running Tournament",
        },
        {
          path: "/dashboard/tournamentResult",
          icon: Trophy,
          label: "Tournament Result",
        },
      ],
    },
    {
      path: "/dashboard/schedule",
      icon: CalendarDays,
      label: "Schedule",
      children: [],
    },
    {
      path: "",
      icon: SquareSigma,
      label: "Match",
      children: [
        {
          path: "/dashboard/match",
          icon: GalleryHorizontalEnd,
          label: "All Match",
        },
      ],
    },
    {
      path: "/dashboard/pointTable",
      icon: ChartLine,
      label: "Point Table",
    },
    {
      path: "/dashboard/venue",
      icon: School,
      label: "Venue",
      children: [],
    },
    {
      path: "/dashboard/blog",
      icon: Newspaper,
      label: "Blog",
      children: [],
    },
  ],
  player: [
    {
      path: "/dashboard",
      icon: Home,
      label: "Dashboard",
      children: [],
    },
    {
      path: "/dashboard/account",
      icon: Users,
      label: "Account",
      children: [],
    },
    {
      path: "/dashboard/profile",
      icon: ShieldUser,
      label: "Profile",
      children: [],
    },
    {
      path: "",
      icon: BookType,
      label: "Team",
      children: [
        {
          path: "/dashboard/teams",
          icon: Boxes,
          label: "Teams",
        },
        {
          path: "/dashboard/team/myTeam",
          icon: Users,
          label: "My Team",
        },
      ],
    },
    {
      path: "",
      icon: Layers,
      label: "Tournament",
      children: [
        {
          path: "/dashboard/tournament",
          icon: FileText,
          label: "ALL Tournament",
        },
        {
          path: "/dashboard/currentTournament",
          icon: Component,
          label: "Running Tournament",
        },
        {
          path: "/dashboard/tournamentResult",
          icon: Trophy,
          label: "Tournament Result",
        },
      ],
    },
    {
      path: "/dashboard/schedule",
      icon: CalendarDays,
      label: "Schedule",
      children: [],
    },
    {
      path: "",
      icon: SquareSigma,
      label: "Match",
      children: [
        {
          path: "/dashboard/match",
          icon: GalleryHorizontalEnd,
          label: "All Match",
        },
      ],
    },
    {
      path: "/dashboard/pointTable",
      icon: ChartLine,
      label: "Point Table",
    },
    {
      path: "/dashboard/venue",
      icon: School,
      label: "Venue",
      children: [],
    },
    {
      path: "/dashboard/blog",
      icon: Newspaper,
      label: "Blog",
      children: [],
    },
  ],
};
