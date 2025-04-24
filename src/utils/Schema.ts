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
});

// login form schema 
export const loginSchema = z.object({
    email: z.string().email("valid emial required"),
    password: z.string().min(6, "At least 6 characters").max(12, "At most 12 characters"),
})