"use client"

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
    setUpload(false); // Resetando o estado após carregar os dados
  };

  useEffect(() => {
    fetchData(); // Chama a função ao montar o componente
  }, []);

  useEffect(() => {
    if (upload) {
      fetchData(); // Chama a função quando upload muda
    }
  }, [upload]);


  return (
    <div className="border p-5 m-1 gap-5 justify-between items-center">

      {(res.length === 0) &&

        <div className=" flex flex-col justify-center items-center">
          <div className="loader w-[100px]"></div>
          <p>CARREGANDO</p>
        </div>}


      {res.map((item) => (
        <div
          className="flex border border-gray-700 m-1 p-2  bg-white/10"
          key={item.id}>
          → ID:{(item.id)} - {item.url}
        </div>))
      }

    </div>

  )
} 