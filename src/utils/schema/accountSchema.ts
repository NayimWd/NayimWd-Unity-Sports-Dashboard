import { z } from "zod";


export const accountUpdateSchema = z.object({
  Name: z.string(),
  PhoneNumber: z.string()
});