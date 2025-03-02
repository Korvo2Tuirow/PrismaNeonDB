"use server"

import { Props } from "@/components/ShowData";
import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient();

export const UPDATE = async (newUrl:string, id:number) => {

    const req = (newUrl).trim();
    if(req.length > 0) {
    const data = await prisma.serverTv.update({
        where:{id:  id},
        data:{url: newUrl} 
        }    
    
    );
}
}
 