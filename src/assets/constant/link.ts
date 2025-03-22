import { Edit, Home, Plus, Layers, Upload, FilePenLine, CalendarDays, FileText, Trophy, SquarePen, Component, Users, UserPen, ImagePlus, LockKeyhole, NotebookPen, FileScan, ShieldUser, User, BookType, QrCode, UserSearch, School, FileStack, CalendarPlus, CalendarPlus2, CalendarRange, CalendarClock, FolderSync, SquareSigma, GalleryHorizontalEnd, ReceiptText, Workflow, SquareGanttChart, Edit2, Puzzle, PenLine, PartyPopper, ChartLine, Newspaper, BookPlus, Notebook, BookText, BookCheck, Telescope, PencilRuler, ImageUp, UserX, ClipboardPlus, DiamondPlus, User2 } from "lucide-react";




export const navLinks = {
  admin: [
    {
      path: "/",
      icon: Home,
      label: "Dashboard",
      children: []
    },
    {
      path: "",
      icon: Users,
      label: "Users",
      children: [
        {
          path: "/user/currentUser",
          icon: User2,
          label: "Account"
        },
       {
        path: "/users",
        icon: Users,
        label: "All Users"
       },
       {
        path: "/users/updateAccount/:userId",
        icon: UserPen,
        label: "Update User"
       },
       {
        path: "/users/updatePhoto/:userId",
        icon: ImagePlus,
        label: "Update Photo"
       },
       {
        path: "/users/changePassword/:userId",
        icon: LockKeyhole,
        label: "Change Password"
       },
       {
        path: "/users/changeRole/:userId",
        icon: NotebookPen,
        label: "Change Role"
       }
      ]
    },
    {
      path: "",
      icon: ShieldUser,
      label: "Profile",
      children: [
        {
          path: "/profile:userId",
          icon: User,
          label: "Profile",
        },
        {
          path: "/profile/create/:userId",
          icon: UserPen,
          label: "Create Profile"
        }
      ]
    },
    {
      path: "",
      icon: BookType,
      label: "Team",
      children: [
        {
          path: "/team/:tournamentId",
          icon: BookType,
          label: "Teams"
        },
        {
          path: "/team/:teamId",
          icon: QrCode,
          label: "Team Details"
        },
        {
          path: "/team/member/:teamId",
          icon: Users,
          label: "Team Members"
        },
        {
          path: "/team/availablePlayer/:teamId",
          icon: UserSearch,
          label: "Available Players"
        },
        {
          path: "/team/playerDetails/:playerId",
          icon: QrCode,
          label: "Player Details"
        }
      ]
    },
    {
      path: "",
      icon: School,
      label: "Venue",
      children: [
        {
          path: "/venue/create",
          icon: Plus,
          label: "Create Venue"
        },
        {
          path: "/venue/get",
          icon: School,
          label: "All Venue"
        },
        {
          path: "/venue/details/:venueId",
          icon: QrCode,
          label: "Venue Details"
        },
        {
          path: "/venue/update/:venueId",
          icon: FilePenLine,
          label: "Update Venue"
        }
      ]
    },
    {
      path: "",
      icon: Layers,
      label: "Tournament",
      children: [
        {
          path: "/tournament",
          icons: FileText,
          label: "ALL Tournament"
        },
        {
          path: "/tournament/:tournamentId",
          icons: FileScan,
          label: "Tournament Details"
        },
        {
          path: "/tournament/result/:tournamentId",
          icons: Trophy,
          label: "Result"
        },
        {
          path: "/tournament/result/create/:tournamentId",
          icons: SquarePen,
          label: "Create Result"
        },
        {
          path: "/tournament/create",
          icons: Plus,
          label: "Create Tournament"
        },
        {
          path: "/tournament/update_details/:tournamentId",
          icons: Edit,
          label: "Update Tournament",
        },
        {
          path: "/tournament/update_photo/:tournamentId",
          icons: Upload,
          label: "Update Photo",
        },
        {
          path: "/tournament/status/:tournamentId",
          icon: FilePenLine,
          label: "Update Photo"
        },
        {
          path: "/tournament/update_date/:tournamentId",
          icon: CalendarDays,
          label: "Update Date"
        },
        {
          path: "/tournament/team/:tournamentId",
          icon: Component,
          label: "Teams"
        }
      ]
    },
    {
      path: "",
      icon: FileStack,
      label: "Tournament Application",
      children: [
        {
          path: "/application/:tournamentId",
          icon: Layers,
          label: "Get Application"
        },
        {
          path: "/application/manage/:tournamentId",
          icon: Layers,
          label: "Get Application"
        }
      ]
    },
    {
      path: "",
      icon: CalendarDays,
      label: "Schedule",
      children: [
        {
          path: "/schedule/:tournamentId",
          icon: CalendarRange,
          label: "Schedule"
        },
        {
          path: "/schedule/firstRound/create",
          icon: CalendarPlus,
          label: "Create 1st round"
        },
        {
          path: "/schedule/qualifier/create",
          icon: CalendarPlus2,
          label: "Create qualifier round"
        },
        {
          path: "/schedule/changeTime/:scheduleId",
          icon: CalendarClock,
          label: "Change Time"
        },
        {
          path: "/schedule/changeTeam/:scheduleId",
          icon: FolderSync,
          label: "Change Team"
        },

      ]
    },
    {
      path: "",
      icon: SquareSigma,
      label: "Match",
      children: [
        {
          path: "/match/:tournamentId",
          icon: GalleryHorizontalEnd,
          lebel: "All Match"
        },
        {
          path: "/match/:tournamentId/:matchId",
          icon: ReceiptText,
          label: "Match Details"
        },
        {
          path: "/match/teams/:matchId",
          icon: Workflow,
          label: "Teams Of Match"
        },
        {
          path: "/match/:teamId/:matchId/:teamId",
          icon: SquareGanttChart,
          label: "Team Squad"
        },
        {
          path: "/match/create/:tournamentId",
          icon: SquarePen,
          label: "Create Qualifire Match"
        },
        {
          path: "/match/:tournamentId/:matchId",
          icon: UserPen,
          label: "Update Umpire(R1)"
        },
        {
          path: "/match/updateTeam/:tournamentId",
          icon: Edit2,
          label: "Update Team"
        },
        {
          path: "/match/MatchResult/:tournamentId/:matchId",
          icon: PenLine,
          label: "Create Match Result"
        },
        {
          path: "/match/matchResult/:matchId",
          icon: PartyPopper,
          label: "Match Result"
        },
      ]
    },
    {
      path: "",
      icon: Puzzle,
      label: "Innings",
      children: [
        {
          path: "/innings/create",
          icon: SquarePen,
          label: "Create Innings"
        },
        {
          path: "/innings/updateInnings/:tournamentId/:inningsId",
          icon: SquarePen,
          label: "Update Innings"
        },
        {
          path: "/innings/:tournamentId",
          icon: ReceiptText,
          label: "Get Innings"
        }
      ]
    },
    {
      path: "/pointTable",
      icon: ChartLine,
      label: "Point Table"
    },
    {
      path: "",
      icon: Newspaper,
      label: "Blog",
      children: [
        {
          path: "/blog",
          icon: Notebook,
          label: "Blogs"
        },
        {
          path: "/blog/:blogId",
          icon: BookText,
          label: "Blog Details"
        },
        {
          path: "/blog/create",
          icon: BookPlus,
          label: "Create Blog"
        },
        {
          path: "/blog/update/:blogId",
          icon: NotebookPen,
          label: "Update Blog"
        },
        {
          path: "/blog/update/:blogId",
          icon: BookCheck,
          label: "Update Details"
        }
      ]
    }
  ],
  manager: [
    {
      path: "/",
      icon: Home,
      label: "Dashboard",
      children: []
    },
    {
      path: "",
      icon: Users,
      label: "Users",
      children: [
       {
         path: "/user/currentUser",
         icon: User2,
         label: "Account"
       },
       {
        path: "/users/updateAccount/:userId",
        icon: UserPen,
        label: "Update User"
       },
       {
        path: "/users/updatePhoto/:userId",
        icon: ImagePlus,
        label: "Update Photo"
       },
       {
        path: "/users/changePassword/:userId",
        icon: LockKeyhole,
        label: "Change Password"
       }
      ]
    },
    {
      path: "",
      icon: ShieldUser,
      label: "Profile",
      children: [
        {
          path: "/profile:userId",
          icon: User,
          label: "Profile",
        },
        {
          path: "/profile/create/:userId",
          icon: UserPen,
          label: "Create Profile"
        }
      ]
    },
    {
      path: "",
      icon: BookType,
      label: "Team",
      children: [
        {
          path: "/team/:userId",
          icon: Telescope,
          label: "My Team"
        },
        {
          path: "/team/:tournamentId",
          icon: BookType,
          label: "Teams"
        },
        {
          path: "/team/details/:teamId",
          icon: QrCode,
          label: "Team Details"
        },
        {
          path: "/team/create",
          icon: PenLine,
          label: "Create Team"
        },
        {
          path: "/team/add/:teamId",
          icon: ClipboardPlus,
          label: "Add Players"
        },
        {
          path: "/team/updateName/:teamId",
          icon: PencilRuler,
          label: "Update Name"
        },
        {
          path: "/team/updatePhoto/:teamId",
          icon: ImageUp,
          label: "Update Logo"
        },
        {
          path: "/team/removePlayer",
          icon: UserX,
          label: "Remove Player"
        }
      ]
    },
    {
      path: "",
      icon: Users,
      label: "Team Members",
      children: [
        {
          path: "/team/member/:teamId",
          icon: Users,
          label: "Team Members"
        },
        {
          path: "/team/availablePlayer/:teamId",
          icon: UserSearch,
          label: "Available Players"
        },
        {
          path: "/team/playerDetails/:playerId",
          icon: QrCode,
          label: "Player Details"
        },
      ]
    },
    {
      path: "",
      icon: School,
      label: "Venue",
      children: [
        {
          path: "/venue/get",
          icon: School,
          label: "All Venue"
        },
        {
          path: "/venue/details/:venueId",
          icon: QrCode,
          label: "Venue Details"
        }
      ]
    },
    {
      path: "",
      icon: Layers,
      label: "Tournament",
      children: [
        {
          path: "/tournament",
          icons: FileText,
          label: "ALL Tournament"
        },
        {
          path: "/tournament/:tournamentId",
          icons: FileScan,
          label: "Tournament Details"
        },
        {
          path: "/tournament/result/:tournamentId",
          icons: Trophy,
          label: "Result"
        },
        {
          path: "/tournament/team/:tournamentId",
          icon: Component,
          label: "Teams"
        }
      ]
    },
    {
      path: "",
      icon: FileStack,
      label: "Tournament Application",
      children: [
        {
          path: "/application/apply/:tournamentId",
          icon: FilePenLine,
          label: "Tournament Application"
        },
        {
          path: "/application/myApplication/:tournamentId",
          icon: Layers,
          label: "My Application"
        }
      ]
    },,
    {
      path: "/schedule/:tournamentId",
      icon: CalendarDays,
      label: "Schedule",
      children: []
    },
    {
      path: "",
      icon: SquareSigma,
      label: "Match",
      children: [
        {
          path: "/match/:tournamentId",
          icon: GalleryHorizontalEnd,
          lebel: "All Match"
        },
        {
          path: "/match/:tournamentId/:matchId",
          icon: ReceiptText,
          label: "Match Details"
        },
        {
          path: "/match/teams/:matchId",
          icon: Workflow,
          label: "Teams Of Match"
        },
        {
          path: "/match/:teamId/:matchId/:teamId",
          icon: SquareGanttChart,
          label: "Team Squad"
        },
        {
          path: "/match/:teamId/:matchId",
          icon: DiamondPlus,
          label: "Create Squad"
        }
      ]
    },
    {
      path: "/match/matchResult/:matchId",
      icon: PartyPopper,
      label: "Match Result"
    },
    {
      path: "/pointTable",
      icon: ChartLine,
      label: "Point Table"
    },
    {
      path: "",
      icon: Newspaper,
      label: "Blog",
      children: [
        {
          path: "/blog",
          icon: Notebook,
          label: "Blogs"
        },
        {
          path: "/blog/:blogId",
          icon: BookText,
          label: "Blog Details"
        }
      ]
    }
  ],
  
}

