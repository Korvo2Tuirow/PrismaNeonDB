"use client"

import { DEL } from "@/app/api/delData/route";
import { GET } from "@/app/api/getData/route";
import { useStatusStore } from "@/store/statusPost";
import { useEffect, useState } from "react";

type Props = {
  id: number;
  url: string;
}
export const ShowData = () => {

  const [res, setRes] = useState<Props[]>([])
  const setUpload = useStatusStore((state) => state.setUpload);
  const upload = useStatusStore((state) => state.upload);

  const fetchData = async () => {
    const data = await GET();
    setRes(data);
    setUpload(false);
  };

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    if (upload) {
      fetchData();
    }
  }, [upload]);

  const handleDel = async (id: number) => {
    await DEL(id);
    fetchData()
  }

  return (
    <div className="border p-5 m-1 gap-5 justify-between items-center">

      {(res.length === 0) &&
        <div className=" flex justify-center items-center">
          <div className="loader w-[100px]"></div>         
        </div>
      }

      {res.map((item) => (
        <div
          className="flex justify-between border border-gray-700 m-1 p-2  bg-white/10"
          key={item.id}>
          <p>→ ID:{(item.id)} - {item.url}</p>
          <button
            value={item.id}
            onClick={() => handleDel(item.id)}
          >❌</button>
        </div>))
      }

    </div>

  )
} 