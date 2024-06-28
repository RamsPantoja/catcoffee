import { type TRPCContext } from "../trpc"
import WaitlistUserService from "./waitlistUser"

export type ServicesContext = {
    waitlistUser: WaitlistUserService
}

export type ServicesConfig = {
    ctx: TRPCContext
}

const Services = ({ ctx }: ServicesConfig): ServicesContext => {
    return {
        waitlistUser: new WaitlistUserService({ ctx })
    }
}

export default Services;