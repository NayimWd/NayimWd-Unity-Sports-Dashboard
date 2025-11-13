import { z } from "zod";
// -------------------------- //
// create
// ------------------------- //
// player
export const PlayerProfileSchema = z.object({
  player_role: z.string().min(1, "Player role is required"),
  batingStyle: z.string().min(1, "Batting style is required"),
  bowlingArm: z.string().min(1, "Bowling arm is required"),
  bowlingStyle: z.string().min(1, "Bowling style is required"),
  DateOfBirth: z
    .string()
    .regex(/^\d{2}-\d{2}-\d{4}$/, "Invalid date format (expected DD-MM-YYYY)"),
});

export type PlayerProfileFormData = z.infer<typeof PlayerProfileSchema>;

// manager
export const ManagerProfileSchema = z.object({
  teamId: z.string().min(1, "Team ID is required"),
});

export type ManagerProfileFormdata = z.infer<typeof ManagerProfileSchema>;

// umpire
export const UmpireProfileSchema = z.object({
  experience: z.string().min(1, "Minimum 1 Year experience is required").max(2),
});

export type UmpireProfileFormSchema = z.infer<typeof UmpireProfileSchema>;

// -------------------------- //
// update
// ------------------------- //
// player
export const updatePlayerProfileSchema = z
  .object({
    player_role: z.string().optional(),
    batingStyle: z.string().optional(),
    bowlingArm: z.string().optional(),
    bowlingStyle: z.string().optional(),
    DateOfBirth: z
      .string()
      .regex(/^\d{2}-\d{2}-\d{4}$/, "Invalid date format (DD-MM-YYYY)")
      .optional(),
  })
  .refine((data) => Object.keys(data).length > 0, {
    message: "At least one field is required to update",
  });


  export type UpdatePlayerProfileFormData = z.infer<typeof updatePlayerProfileSchema>;

  