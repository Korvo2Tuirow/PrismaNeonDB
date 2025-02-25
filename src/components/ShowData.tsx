"use client"
import { GET } from "@/app/api/getData/route";
import { useEffect, useState } from "react";

type Props = {
  id: number;
  url: string;
}
export const ShowData = () => {

    const [res, setRes] = useState<Props[]>([])

  useEffect(() => {
    const showData = async () => {
      const data = await GET();
      setRes(data);
    }
    showData();
    
  }, []);

  return (
    <div>
      {res.map((item) => (
        <div 
        className="flex border border-gray-700 m-1 p-2 shadow-sm shadow-slate-800" 
        key={item.id}>
          ID:{(item.id)} - {item.url}
        </div>))
      }
    </div>
  )
} 