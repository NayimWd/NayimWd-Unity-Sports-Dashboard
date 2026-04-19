import { z } from "zod";

const baseMatchSchema = z.object({
  tournamentId: z.string().min(1, "Tournament is required"),
  matchNumber: z
    .number({ invalid_type_error: "Match number is required" })
    .min(1),
  umpire1: z.string().min(1, "First umpire is required"),
  umpire2: z.string().min(1, "Second umpire is required"),
  umpire3: z.string().optional().nullable(),
});

export const createMatchR1Schema = baseMatchSchema.extend({
    teamA: z.string().min(1, "Team A is required"),
    teamB: z.string().min(1, "Team B is required"),
});

export const createMatchRQSchema = baseMatchSchema.extend({
  previousMatches: z.object({
    matchA: z.string().min(1, "Match A is required"),
    matchB: z.string().min(1, "Match B is required"),
  }),
});

export type CreateMatchR1FormData = z.infer<typeof createMatchR1Schema>;
export type CreateMatchRQFormData = z.infer<typeof createMatchRQSchema>;
