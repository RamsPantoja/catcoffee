import { z } from "zod";

export const createWaitlistUserInputSchema = z.object({
    name: z.string().min(1),
    email: z.string().email()
});