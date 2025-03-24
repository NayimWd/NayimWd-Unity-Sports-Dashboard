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
  NotebookPen,
  ShieldUser,
  BookType,
  UserSearch,
  School,
  FileStack,
  CalendarPlus,
  CalendarPlus2,
  CalendarRange,
  CalendarClock,
  FolderSync,
  SquareSigma,
  GalleryHorizontalEnd,
  ReceiptText,
  Puzzle,
  PenLine,
  PartyPopper,
  ChartLine,
  Newspaper,
  BookPlus,
  Notebook,
  BookText,
  BookCheck,
  Telescope,
  User2,
} from "lucide-react";

export const navLinks = {
  admin: [
    {
      path: "/",
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
          path: "/user/currentUser",
          icon: User2,
          label: "Account",
        },
        {
          path: "/users",
          icon: Users,
          label: "All Users",
        },
      ],
    },
    {
      path: "/profile",
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
          path: "/team/:tournamentId",
          icon: BookType,
          label: "Teams",
        },
        {
          path: "/team/member/:teamId",
          icon: Users,
          label: "Team Members",
        },
        {
          path: "/team/availablePlayer",
          icon: UserSearch,
          label: "Available Players",
        },
      ],
    },
    {
      path: "",
      icon: School,
      label: "Venue",
      children: [
        {
          path: "/venue/create",
          icon: Plus,
          label: "Create Venue",
        },
        {
          path: "/venue/get",
          icon: School,
          label: "All Venue",
        },
      ],
    },
    {
      path: "",
      icon: Layers,
      label: "Tournament",
      children: [
        {
          path: "/tournament",
          icon: FileText,
          label: "ALL Tournament",
        },
        {
          path: "/tournament/result/:tournamentId",
          icon: Trophy,
          label: "Result",
        },
        {
          path: "/tournament/result/create/:tournamentId",
          icon: SquarePen,
          label: "Create Result",
        },
        {
          path: "/tournament/create",
          icon: Plus,
          label: "Create Tournament",
        },
        {
          path: "/tournament/team/:tournamentId",
          icon: Component,
          label: "Teams",
        },
      ],
    },
    {
      path: "/application/:tournamentId",
      icon: FileStack,
      label: "Tournament Application",
      children: [],
    },
    {
      path: "",
      icon: CalendarDays,
      label: "Schedule",
      children: [
        {
          path: "/schedule/:tournamentId",
          icon: CalendarRange,
          label: "Schedule",
        },
        {
          path: "/schedule/firstRound/create",
          icon: CalendarPlus,
          label: "Create 1st round",
        },
        {
          path: "/schedule/qualifier/create",
          icon: CalendarPlus2,
          label: "Create qualifier round",
        },
        {
          path: "/schedule/changeTime/:scheduleId",
          icon: CalendarClock,
          label: "Change Time",
        },
        {
          path: "/schedule/changeTeam/:scheduleId",
          icon: FolderSync,
          label: "Change Team",
        },
      ],
    },
    {
      path: "",
      icon: SquareSigma,
      label: "Match",
      children: [
        {
          path: "/match/:tournamentId",
          icon: GalleryHorizontalEnd,
          label: "All Match",
        },
        {
          path: "/match/create/:tournamentId",
          icon: SquarePen,
          label: "Create Qualifire Match",
        },
        {
          path: "/match/MatchResult/:tournamentId/:matchId",
          icon: PenLine,
          label: "Create Match Result",
        },
        {
          path: "/match/matchResult/:matchId",
          icon: PartyPopper,
          label: "Match Result",
        },
      ],
    },
    {
      path: "",
      icon: Puzzle,
      label: "Innings",
      children: [
        {
          path: "/innings/create",
          icon: SquarePen,
          label: "Create Innings",
        },
        {
          path: "/innings/updateInnings/:tournamentId/:inningsId",
          icon: SquarePen,
          label: "Update Innings",
        },
        {
          path: "/innings/:tournamentId",
          icon: ReceiptText,
          label: "Get Innings",
        },
      ],
    },
    {
      path: "/pointTable",
      icon: ChartLine,
      label: "Point Table",
    },
    {
      path: "",
      icon: Newspaper,
      label: "Blog",
      children: [
        {
          path: "/blog",
          icon: Notebook,
          label: "Blogs",
        },
        {
          path: "/blog/:blogId",
          icon: BookText,
          label: "Blog Details",
        },
        {
          path: "/blog/create",
          icon: BookPlus,
          label: "Create Blog",
        },
        {
          path: "/blog/update/:blogId",
          icon: NotebookPen,
          label: "Update Blog",
        },
        {
          path: "/blog/update/:blogId",
          icon: BookCheck,
          label: "Update Details",
        },
      ],
    },
  ],
  manager: [
    {
      path: "/",
      icon: Home,
      label: "Dashboard",
      children: [],
    },
    {
      path: "/user/currentUser",
      icon: Users,
      label: "Account",
      children: [],
    },
    {
      path: "/profile",
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
          path: "/team/:userId",
          icon: Telescope,
          label: "My Team",
        },
        {
          path: "/team/:tournamentId",
          icon: BookType,
          label: "Teams",
        },
        {
          path: "/team/create",
          icon: PenLine,
          label: "Create Team",
        },
      ],
    },
    {
      path: "/venue",
      icon: School,
      label: "Venue",
      children: [],
    },
    {
      path: "",
      icon: Layers,
      label: "Tournament",
      children: [
        {
          path: "/tournament",
          icon: FileText,
          label: "ALL Tournament",
        },
        {
          path: "/tournament/result",
          icon: Trophy,
          label: "Result",
        },
      ],
    },
    {
      path: "/application/myApplication",
      icon: Layers,
      label: "My Application",
      children: []
    },
    ,
    {
      path: "/schedule/:tournamentId",
      icon: CalendarDays,
      label: "Schedule",
      children: [],
    },
    {
      path: "/match/:tournamentId",
      icon: SquareSigma,
      label: "Match",
      children: [],
    },
    {
      path: "/match/matchResult/:matchId",
      icon: PartyPopper,
      label: "Match Result",
    },
    {
      path: "/pointTable",
      icon: ChartLine,
      label: "Point Table",
    },
    {
      path: "/blog",
      icon: Newspaper,
      label: "Blogs",
      children: [],
    },
  ],
  player: [
    {
      path: "/",
      icon: Home,
      label: "Dashboard",
      children: [],
    },
    {
      path: "/user/currentUser",
      icon: Users,
      label: "Account",
      children: []
    },
    {
      path: "/profile",
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
          path: "/team/:userId",
          icon: Telescope,
          label: "My Team",
        },
        {
          path: "/team/:tournamentId",
          icon: BookType,
          label: "Teams",
        },
      ],
    },
    {
      path: "/team/member/:teamId",
      icon: Users,
      label: "Team Members",
      children: [],
    },
    {
      path: "/venue",
      icon: School,
      label: "Venues",
      children: [],
    },
    {
      path: "",
      icon: Layers,
      label: "Tournament",
      children: [
        {
          path: "/tournament",
          icon: FileText,
          label: "ALL Tournament",
        },
        {
          path: "/tournament/result",
          icon: Trophy,
          label: "Result",
        },
        {
          path: "/tournament/team",
          icon: Component,
          label: "Teams",
        },
      ],
    },
    {
      path: "/schedule/:tournamentId",
      icon: CalendarDays,
      label: "Schedule",
      children: [],
    },
    {
      path: "/match/:tournamentId",
      icon: SquareSigma,
      label: "Match",
      children: [],
    },
    {
      path: "/match/matchResult",
      icon: PartyPopper,
      label: "Match Result",
    },
    {
      path: "/pointTable",
      icon: ChartLine,
      label: "Point Table",
    },
    {
      path: "",
      icon: Newspaper,
      label: "Blogs",
      children: [],
    },
  ],
};
