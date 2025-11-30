import {  z,  } from "zod";



// for comparing dates - deadline cannot be after start date, start time should after current date, end date should later of start date or same date {for future validation}


// create tournament 
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
  
  registrationDeadline: z.date(),
  
  startDate: z.date(),
  
  endDate: z.date(),
  
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
}).strict();

export type TCreateTournament = z.infer<typeof createTournamentSchema>;

// for update tournament details
export const tournamentDetailsUpdateSchema = z.object({
  tournamentName: z.string().min(1, 'Tournament name cannot be empty').optional(),
  tournamentType: z.string().min(1, 'Tournament type cannot be empty').optional(),
  description: z.string().min(1, 'Description cannot be empty').optional(),
  format: z.number().min(1, 'Format cannot be empty').optional(),
  ballType: z.string().min(1, 'Ball type cannot be empty').optional(),
  matchOver: z.number().min(1, 'Match over field cannot be empty').optional(),
  registrationDeadline: z.string().min(1, 'Registration deadline cannot be empty').optional(),
  status: z.enum(["upcoming", "ongoing", "completed"]).optional(),
  entryFee: z.number().positive('Entry fee must be a positive number').optional(),
  champion: z.string().min(1, 'Champion prize cannot be empty').optional(),
  runnerUp: z.string().min(1, 'Runner-up prize cannot be empty').optional(),
  thirdPlace: z.string().min(1, 'Third place prize cannot be empty').optional(),
}).strict()
.refine((data)=> {
  const keys = Object.keys(data) as Array<keyof typeof data>;

  return keys.some(key => data[key] !== undefined)
}, {
  message: "At least one field must be provided",
    path: ["_form"],
});


export type TUpdateTournamentDetails = z.infer<typeof tournamentDetailsUpdateSchema>;

// update photo
export const updateTournamentPhotoSchema = z.object({
 photo: z.custom<File>((v) => v instanceof File, {
    message: "A photo file is required.",
  }),
})

export type TUpdateTournamentPhoto = z.infer<typeof updateTournamentPhotoSchema>;

// udpate date 
export const updateTournamentDateSchema = z.object({
  registrationDeadline: z.date().optional(),
  startDate: z.date().optional(),
  endDate: z.date().optional(),
})
.refine((data)=> data.registrationDeadline || data.startDate || data.endDate, {
  message: "Atleast one date is required",
  path: ["_root"]
});

export type TUpdateTournamentDate = z.infer<typeof updateTournamentDateSchema>;

// update status 
export const updateTournamentStatusSchema = z.object({
  status: z.enum(["upcoming", "ongoing", "completed"], {message: "Select from this options"})
});

export type TUpdateTournamentStatus = z.infer<typeof updateTournamentStatusSchema>;


export const createTournamentResultSchema = z.object({
  manOfTheTournament: z.string().min(2, "Enter name of the man of the match"),
  awardFor: z.string().min(2, "Enter performance category"),
}).strict();

export type TCreateTournamentResult = z.infer<typeof createTournamentResultSchema>;

