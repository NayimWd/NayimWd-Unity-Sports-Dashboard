import { z } from "zod";

// Regex to enforce the DD-MM-YYYY date format
const DDMMYYYY_REGEX = /^\d{2}-\d{2}-\d{4}$/;

export const createTournamentSchema = z.object({
  tournamentName: z.string({
    required_error: "Tournament name is required",
  }).min(3, { message: "Tournament Name must be at least 3 characters." }),
  
  tournamentType: z.enum(["knockout", "series", "1v1", "points"], {
    required_error: "Invalid tournament type",
    invalid_type_error: "Invalid tournament type. Must be one of: knockout, series, 1v1, points.",
  }),
  
  description: z.string({
    required_error: "Description is required",
  })
    .min(20, { message: "Description must be at least 20 characters long" })
    .max(400, { message: "Description cannot exceed 400 characters" }),
  
  format: z.union([
    z.literal(4),
    z.literal(6),
    z.literal(8),
    z.literal(12),
    z.literal(16),
  ], {
    required_error: "Invalid format",
    invalid_type_error: "Format must be one of: 4, 6, 8, 12, or 16.",
  }),
  
  ballType: z.enum(["tape tennis", "3 star", "leather"], {
    invalid_type_error: "Invalid ball type. Must be one of: tape tennis, 3 star, or leather.",
  }).default("tape tennis"), 
  
  matchOver: z.number({
    required_error: "Match Over threshold is required",
  }).int({ message: "Match Over must be an integer." }).positive({ message: "Match Over value must be positive." }),
  
  registrationDeadline: z.string({
    required_error: "Registration deadline is required",
  }).refine((val) => DDMMYYYY_REGEX.test(val), {
    message: "Registration deadline must be in the format DD-MM-YYYY.",
  }),
  
  startDate: z.string({
    required_error: "Tournament start date is required",
  }).refine((val) => DDMMYYYY_REGEX.test(val), {
    message: "Start date must be in the format DD-MM-YYYY.",
  }),
  
  endDate: z.string({
    required_error: "Tournament end date is required",
  }).refine((val) => DDMMYYYY_REGEX.test(val), {
    message: "End date must be in the format DD-MM-YYYY.",
  }),
  
  entryFee: z.number({
    required_error: "Entry Fee is required",
  }).int({ message: "Entry Fee must be an integer." }).min(0, { message: "Entry fee cannot be negative" }),
  
  champion: z.string({
    required_error: "Champion prize is required",
  }).min(1, { message: "Champion prize cannot be empty." }),
  
  runnerUp: z.string({
    required_error: "RunnerUp prize is required",
  }).min(1, { message: "RunnerUp prize cannot be empty." }),

  thirdPlace: z.string().optional(),
  photo: z.custom<File>((v) => v instanceof File && v.size > 0, {
    message: "At least one photo is required",
  }),
});

export type TCreateTournament = z.infer<typeof createTournamentSchema>;