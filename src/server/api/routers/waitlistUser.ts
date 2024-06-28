import {
    createTRPCRouter,
    publicProcedure,
} from "~/server/api/trpc";

import { createWaitlistUserInputSchema } from "../schemas/waitlistUser";

export const waitlistUserRouter = createTRPCRouter({
    create: publicProcedure
        .input(createWaitlistUserInputSchema)
        .mutation(async ({ input, ctx }) => {
            return await ctx.services({ ctx }).waitlistUser.create(input);
        })
});
