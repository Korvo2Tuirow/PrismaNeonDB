"use server"

import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const POST = async (data: string) => {  

    const req = (data).trim();
    if(req.length > 0) {
     await prisma.serverTv.createMany({
         data:{url: req}
     });  
    
     if(req.length > 0){
      
         prisma.$disconnect        
     }
    
    }     
}
 
