"use client"

import { DEL } from "@/app/api/delData/route";
import { GET } from "@/app/api/getData/route";
import { UPDATE } from "@/app/api/updateData/route";
import { useStatusStore } from "@/store/statusPost";
import { useEffect, useState } from "react";

export type Props = {
  id: number;
  url: string;
}
export const ShowData = () => {

  const [res, setRes] = useState<Props[]>([])
  const setUpload = useStatusStore((state) => state.setUpload);
  const upload = useStatusStore((state) => state.upload);
  const [dataEdit, setDataEdit] = useState<number>()
  const [newUrl, setNewUrl] = useState<string>('')

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
  const handleEdit = (item: Props) => {
    setDataEdit(item.id);
    setNewUrl(item.url)
  }

  const handleEditSave = async (item:number) => {
    await UPDATE(newUrl, item);
    fetchData()
    handleEditCancel();
  }

  const handleEditCancel = ()=>{
    setDataEdit(0);
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
          className="flex  justify-between border border-gray-700 m-1 p-2  bg-white/10"
          key={item.id}>

          {dataEdit === item.id ? (

            <input
              type="text"
              value={newUrl}
              onChange={(e) => setNewUrl(e.target.value)}
              className="text-black w-full max-w-4xl p-1 mr-3"
            />
          )
            :
            (
              <p>→ ID:{(item.id)} - {item.url}</p>
            )
          }

          <div className="flex gap-5">

            {dataEdit === item.id ? (
              <div className="flex gap-5">

                <button
                  className="text-green-500"
                  onClick={() => handleEditSave(item.id)}
                >✔ Salvar</button>

                <button
                  className="text-red-500"
                  onClick={() => handleEditCancel()}
                >❌ Cancelar</button>
              </div>
            )
              :
              (
                <div className="flex gap-5">
                  <button
                    onClick={() => handleEdit(item)}
                  >📝Editar</button>
                  <button
                    onClick={() => handleDel(item.id)}
                  >❌Excluir</button>
                </div>
              )}

          </div>
        </div>))
      }

    </div>

  )
} 