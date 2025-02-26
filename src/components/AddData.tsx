"use client"

import { POST } from "@/app/api/addData/route";
import { useState } from "react";

export const AddData = () => {
    const [getData, setGetData] = useState<string>('');

    const handleSubmit = async () => {
        await POST(getData)
        setGetData("");
    }

    return (
        <div className="flex flex-col border p-5 m-1 gap-5 justify-between items-center">
            <h1>Adicionar dados</h1>
            <input type="text"
                className="text-black flex  p-1   w-full max-w-[500px] "
                placeholder="Digite seu dado aqui"
                value={getData}
                onChange={(e) => setGetData(e.target.value)}
            />
            <button className="border p-2 rounded-md bg-blue-600"
                onClick={handleSubmit}
            >Enviar</button>
        </div>
    )

}

