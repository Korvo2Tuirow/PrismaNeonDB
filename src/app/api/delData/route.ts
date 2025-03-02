"use server"

import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient();

export const DEL = async (id:number) => {
    
    await prisma.serverTv.delete({
        where:{id:id}}
    );

    
}
 