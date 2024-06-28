import { type z } from "zod";
import { type TRPCContext } from "../trpc";
import { type createWaitlistUserInputSchema } from "../schemas/waitlistUser";
import { waitlistUsers } from "~/server/db/schema";
import { TRPCError } from "@trpc/server";

type WaitlistUserServiceContructor = {
    ctx: TRPCContext
}

type CreateWaitlistUserInput = z.infer<typeof createWaitlistUserInputSchema>

class WaitlistUserService {
    ctx: TRPCContext

    constructor({ ctx }: WaitlistUserServiceContructor) {
        this.ctx = ctx;
    }

    async create(input: CreateWaitlistUserInput) {
        const { name, email } = input;

        const [waitlistUser] = await this.ctx.db.insert(waitlistUsers).values({
            name,
            email
        }).returning();

        if (!waitlistUser) {
            throw new TRPCError({
                code: "CONFLICT",
                message: 'Fail on add a user to the waitlist, try again',
            });
        }

        return waitlistUser;
    }
}

export default WaitlistUserService;