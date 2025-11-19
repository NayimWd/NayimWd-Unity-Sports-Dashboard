import { z } from "zod";

export const getTeam = z.object({
    
});

export const teamSearch = z.object({
    search: z.string().optional(),
    sort: z.string().optional(),
});

export type teamSearchSchema = z.infer<typeof teamSearch>;

