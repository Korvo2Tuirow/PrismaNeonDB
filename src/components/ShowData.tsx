"use client"

import { GET } from "@/app/api/getData/route";
import { useEffect, useState } from "react";

type Props = {
  id: number;
  url: string;
}
export const ShowData = ( ) => {

  const [res, setRes] = useState<Props[]>([])
 
  const update = () => {
    useEffect(() => {
      const Data = async () => {
        const data = await GET();
        setRes(data);
      }
      Data();       

    }, []);
  }

  update()  

  return (
    <div className="border p-5 m-1 gap-5 justify-between items-center">
      
      {res.map((item) => (
        <div
          className="flex border border-gray-700 m-1 p-2  bg-white/10"
          key={item.id}>
          ID:{(item.id)} - {item.url}
        </div>))
      }
    </div>
  )
} 