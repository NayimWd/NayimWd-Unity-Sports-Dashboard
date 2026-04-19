import { z } from "zod";

const scheduleBaseSchema = z.object({
  tournamentId: z.string().min(1, "Tournament is required"),
  venueId: z.string().min(1, "Venue is required"),
  round: z.string().min(1, "Round is required"),
  matchNumber: z
    .number({ invalid_type_error: "Match number is required" })
    .min(1),
  matchDate: z
    .string()
    .regex(/^\d{2}-\d{2}-\d{4}$/, "Date must be in format DD-MM-YYYY"),
  matchTime: z
    .string()
    .regex(/^(1[0-2]|0?[1-9])(am|pm)$/i, "Time must be in format h(am/pm)"),
});

export const scheduleSchemaR1 = scheduleBaseSchema.extend({
  teamA: z.string().min(1, "Team A is required"),
  teamB: z.string().min(1, "Team B is required"),
  matchA: z.string().optional().nullable(),
  matchB: z.string().optional().nullable(),
});

export const scheduleSchemaRQ = scheduleBaseSchema.extend({
  teamA: z.string().optional().nullable(),
  teamB: z.string().optional().nullable(),
  matchA: z.string().min(1, "Match A is required"),
  matchB: z.string().min(1, "Match B is required"),
});

export type ScheduleR1FormData = z.infer<typeof scheduleSchemaR1>;
export type ScheduleRQFormData = z.infer<typeof scheduleSchemaRQ>;
