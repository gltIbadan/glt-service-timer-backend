import { PrismaClient } from "@prisma/client.ts";
import { withAccelerate } from '@prisma/extension-accelerate'
import "dotenv/config";



const prisma = new PrismaClient({
    accelerateUrl: process.env.PRISMA_DATABASE_URL!
}).$extends(withAccelerate())


export default prisma;