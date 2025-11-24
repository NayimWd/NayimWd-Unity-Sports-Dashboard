import { z } from "zod";

export const createVenueSchema = z.object({
  name: z.string().min(5, "Venue name is required"),
  city: z.string().min(2, "City name is required"),
  location: z.string().min(8, "Full location is required"),
  features: z.string().refine(
    (tag) => ["indoor", "outdoor", "floodlight"].includes(tag),
    {
        message: "Select a feature"
    }
  ),
  photo: z
    .custom<File>((v) => v instanceof File && v.size > 0, {
      message: "Venue photo is required",
    })
    .refine((file) => file.size <= 2 * 1024 * 1024, {
      message: "File size must be less then 2MB",
    })
    .refine((file) => file.type.startsWith("image/"), "File Must be an image"),
});


export type createVenueType = z.infer<typeof createVenueSchema>;