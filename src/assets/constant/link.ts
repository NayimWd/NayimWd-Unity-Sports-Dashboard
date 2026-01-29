import {
  Home,
  Plus,
  Layers,
  CalendarDays,
  FileText,
  SquarePen,
  Component,
  Users,
  ShieldUser,
  BookType,
  School,
  FileStack,
  CalendarPlus,
  CalendarRange,
  SquareSigma,
  GalleryHorizontalEnd,
  ChartLine,
  Newspaper,
  BookPlus,
  Notebook,
  User2,
  Boxes,
  Settings,
  BrickWall,
  NotepadText,
  List,
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
          path: "/dashboard/myAccount",
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
          path: "/dashboard/tournament/create",
          icon: Plus,
          label: "Create Tournament",
        },
        {
          path: "/dashboard/tournament/manage",
          icon: NotepadText,
          label: "Manage",
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
          path: "/dashboard/match/manage",
          icon: List,
          label: "Match List",
        },
        {
          path: "/dashboard/match/create",
          icon: SquarePen,
          label: "Create Match",
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
          path: "/dashboard/venue/manage",
          icon: BrickWall,
          label: "Manage Venue",
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
          path: "/dashboard/blog/create",
          icon: BookPlus,
          label: "Create Blog",
        },
        {
          path: "/dashboard/blogs/manage",
          icon: Settings,
          label: "Manage Blogs",
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
          path: "/dashboard/team/manage",
          icon: Settings,
          label: "Manage Team",
        },
      ],
    },
    {
      path: "/dashboard/tournament",
      icon: Layers,
      label: "Tournament",
      children: [],
    },
    {
      path: "/dashboard/schedule",
      icon: CalendarDays,
      label: "Schedule",
      children: [],
    },
    {
      path: "/dashboard/match",
      icon: SquareSigma,
      label: "Match",
      children: [],
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
