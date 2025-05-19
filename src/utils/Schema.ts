import z from "zod";

// registration form schema
export const registrationSchema = z.object({
  name: z
    .string()
    .min(3, "Name is required")
    .refine((val) => val !== "", {
      message: "Name is required",
    }),
  email: z.string().email("Invalid email"),
  password: z.string().min(6, "At least 6 characters"),
  role: z
    .string()
    .refine((val) => ["player", "manager", "umpire"].includes(val), {
      message: "Please select a role",
    }),
  photo: z
    .custom<File>((v) => v instanceof File && v.size > 0, {
      message: "Photo is required",
    })
    .refine((file) => file.size <= 1 * 1024 * 1024, {
      message: "File size must be less then 2MB",
    })
    .refine(file => file.type.startsWith("image/"), "File Must be an image"),
});

// login form schema
export const loginSchema = z.object({
  email: z.string().email("valid emial required"),
  password: z
    .string()
    .min(6, "At least 6 characters")
    .max(12, "At most 12 characters"),
});

// date picker schema


// blog schema
export const blogSchema = z.object({
  title: z.string().min(10).max(250),
  description: z.string().min(50).max(600)
})