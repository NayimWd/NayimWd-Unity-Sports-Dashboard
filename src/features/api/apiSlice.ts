import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQueryWithAuth } from "./baseQueryWithReauth";

export const apiSlice = createApi({
  reducerPath: "api",
  baseQuery: baseQueryWithAuth,
  tagTypes: ["AuthUser", "User", "UserList", "PointTable", "Blog", "Team", "Player", "teamPlayer", "Venue", "Tournament", "Registration", "Match", "Summary", "LatestResult", "Umpire", "MyTeam", "PlayerList", "LatestTournament", "ApprovedTeam", "TeamSummary", "availableProfile", "PlayerProfile", "managerProfile", "umpireProfile"],
  endpoints: () => ({}),
});
