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
    .regex(/^\d{2}-\d{2}-\d{4}$/, "Date must be in format DD-MM-YYYY")
    .refine((val) => {
      const [day, month, year] = val.split("-").map(Number);
      const date = new Date(year, month - 1, day);
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      return date >= today;
    }, "Match date cannot be in the past"),
  matchTime: z
    .string()
    .regex(/^(1[0-2]|0?[1-9])(am|pm)$/i, "Time must be in format h(am/pm)"),
  endTime: z
    .string()
    .regex(/^(1[0-2]|0?[1-9])(am|pm)$/i, "End time must be in format h(am/pm)"),
});

// reusable time refine
const withTimeValidation = <T extends z.ZodObject<any>>(schema: T) =>
  schema.refine(
    (data) => {
      const toHour = (t: string) => {
        const match = t.toLowerCase().match(/^(1[0-2]|0?[1-9])(am|pm)$/);
        if (!match) return null;
        let h = parseInt(match[1]);
        if (match[2] === "am" && h === 12) h = 0;
        if (match[2] === "pm" && h !== 12) h += 12;
        return h;
      };
      const start = toHour(data.matchTime);
      const end = toHour(data.endTime);
      if (start === null || end === null) return true;
      return end > start;
    },
    { message: "End time must be after start time", path: ["endTime"] },
  );

export const scheduleSchemaR1 = withTimeValidation(
  scheduleBaseSchema.extend({
    teamA: z.string().min(1, "Team A is required"),
    teamB: z.string().min(1, "Team B is required"),
    matchA: z.string().optional().nullable(),
    matchB: z.string().optional().nullable(),
  }),
);

export const scheduleSchemaRQ = withTimeValidation(
  scheduleBaseSchema.extend({
    teamA: z.string().optional().nullable(),
    teamB: z.string().optional().nullable(),
    matchA: z.string().min(1, "Match A is required"),
    matchB: z.string().min(1, "Match B is required"),
  }),
);



export type ScheduleR1FormData = z.infer<typeof scheduleSchemaR1>;
export type ScheduleRQFormData = z.infer<typeof scheduleSchemaRQ>;
