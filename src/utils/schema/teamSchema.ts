import { z } from "zod";

export const getTeam = z.object({});

export const teamSearch = z.object({
  search: z.string().optional(),
  sort: z.string().optional(),
});

export type teamSearchSchema = z.infer<typeof teamSearch>;

export const updateTeamNameSchema = z.object({
  teamName: z.string().min(4, "mimimum 5 ch is required"),
});

export type updateTNameType = z.infer<typeof updateTeamNameSchema>;

export const updateTLogo = z.object({
  teamLogo: z
    .custom<File>((v) => v instanceof File && v.size > 0, {
      message: "Photo is required",
    })
    .refine((file) => file.size <= 2 * 1024 * 1024, {
      message: "File size must be less then 2MB",
    })
    .refine((file) => file.type.startsWith("image/"), "File Must be an image"),
});

export type updateTLogoType = z.infer<typeof updateTLogo>;

export const createTeamSchema = z.object({
  teamName: z.string().min(4, "mimimum 5 ch is required"),
  teamLogo: z
    .custom<File>((v) => v instanceof File && v.size > 0, {
      message: "Photo is required",
    })
    .refine((file) => file.size <= 2 * 1024 * 1024, {
      message: "File size must be less then 2MB",
    })
    .refine((file) => file.type.startsWith("image/"), "File Must be an image"),
});

export type createTeamType = z.infer<typeof createTeamSchema>