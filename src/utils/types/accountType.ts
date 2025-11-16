import { z } from "zod";

export interface IAccountUpdateDetails {
    name: string;
    phoneNumber: string;
} 

export const filterUserSchema = z.object({
  name: z.string().optional(),
  email: z.string().optional(),
  role: z.string().optional(),
  sortField: z.string().optional(),
  sortOrder: z.string().optional(),
});

export type FilterUserType = z.infer<typeof filterUserSchema>;