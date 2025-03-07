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
  const [search, setSearch] = useState<string>('')


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

    // Filtra os itens localmente no array
    const filteredResults = res.filter((item) =>
        item.url.toLowerCase().includes(search.toLowerCase()) // Case insensitive
    );

  return (
    <div className="border px-5 m-1 h-full  justify-between items-center">

      {(res.length === 0) &&
        <div className=" flex flex-col justify-center items-center p-5">
          <div className="loader w-[100px]"></div>
          <p>BUSCANDO...</p>
        </div>
      }

      {(res.length > 0) &&

      <div className="flex gap-5 py-2 mt-3 items-center">
        <p>Buscar</p>
        <input 
        type="text"  
        className="w-full p-1 text-black"
        value={search}
        onChange={(e)=>setSearch(e.target.value)}
        />     
       
      </div>
      }

      {filteredResults.map((item) => (
        
        <div
          className="flex  flex-col gap-3 justify-between border border-gray-700 my-5 p-2  bg-white/10"
          key={item.id}>

          {dataEdit === item.id ? (

            <input
              type="text"
              value={newUrl}
              onChange={(e) => setNewUrl(e.target.value)}
              className="text-black w-full  p-1 "
            />
          )
            :
            (
              <>
              <p>→ ID:{(item.id)} - {item.url}</p>
              <hr />
              </>
            )
          }

          <div>

            {dataEdit === item.id ? (
              <div className="flex gap-5 mt-2">

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