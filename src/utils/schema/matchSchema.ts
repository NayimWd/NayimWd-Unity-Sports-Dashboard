import {  z } from "zod";

export const MATCH_STATUSES = [
  "upcoming",
  "scheduled",
  "rescheduled",
  "in-progress",
  "completed",
  "cancelled",
] as const;

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

export const updateUmpireSchema = baseMatchSchema.omit({
  tournamentId: true,
  matchNumber: true,
});
export const updateStatusSchema = z.object({
  status: z.enum(MATCH_STATUSES, {
    errorMap: () => ({ message: "Select valid status" }),
  }),
});

export const createInningsSchema = z.object({
  teamId: z.string().min(2, "Team Id is required"),
  inningsNumber: z.union([z.literal(1), z.literal(2)], {
    errorMap: () => ({ message: "Innings number must be either 1 or 2" }),
  }),
  wicket: z
    .number()
    .int({ message: "Wicket must be a number" })
    .min(0, { message: "Wicket cannot be less than 0" })
    .max(10, { message: "Wicket cannot be more than 10" }),
  runs: z
    .number()
    .int({ message: "Run Must be number" })
    .min(0, { message: "run can not be less than 0" }),
  over: z
  .number({ invalid_type_error: "Over must be a number" })
  .min(0, { message: "Over cannot be less than 0" })
  .refine((val) => {
    const balls = Math.round((val % 1) * 10);
    return balls >= 0 && balls <= 5;
  }, "Invalid over format — balls must be between .0 and .5"),
  wide: z
    .number()
    .int({ message: "wide Must be number" })
    .min(0, { message: "wide can not be less than 0" }),
  noBalls: z
    .number()
    .int({ message: "no Balls Must be number" })
    .min(0, { message: "noBalls can not be less than 0" }),
  byes: z
    .number()
    .int({ message: "wide Must be number 0" })
    .min(0, { message: "byes can not be less than 0" }),
});


export const createMatchResultSchema = z.object({
  manOfTheMatch: z.string().min(1, "Man of the match required"),
  matchReport: z.string().min(1, "Match report required"),
})

export type CreateMatchR1FormData = z.infer<typeof createMatchR1Schema>;
export type CreateMatchRQFormData = z.infer<typeof createMatchRQSchema>;
export type UpdateUmpireFormData = z.infer<typeof updateUmpireSchema>;
export type CreateInningsFormData = z.infer<typeof createInningsSchema>;
export type CreateMatchResultData = z.infer<typeof createMatchResultSchema>
