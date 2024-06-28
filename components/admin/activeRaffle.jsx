"use client"

import Image from "next/image"
import { FaArrowLeft } from "react-icons/fa";
import { useGlobalContext } from "@/context/MainContext";
import { contractAdds } from '@/utils/contractAdds';
import abi from "@/utils/abis/jlemaRaffle"
import { AiOutlineLoading } from "react-icons/ai";
import { useState } from "react";
import { ethers } from "ethers";

export default function ActiveRaffle({obj, index}){
    console.log(index, obj);
    const {openModal, setOpenModal} = useGlobalContext();
    const [loading, setLoading] = useState(false);


    async function contractSetup(){
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const signer = provider.getSigner();
    
        try {
          const contract = new ethers.Contract(contractAdds.JlemaRaffle, abi, signer);
    
          return contract;
        }
        catch(err){
            console.log(err);
        }
    }

    async function deleteRaffle(index){
        try{
            setLoading(true);
            const contract = await contractSetup();
            const txn = await contract.deleteRaffle(index);

            txn.wait().then((res)=>{
                console.log(res);
                setLoading(false);
                window.location.reload();
            })
        }
        catch(err){
            console.log(err);
            setLoading(false);
        }
    }

    return(
        <div className="w-full h-full absolute text-left bg-white top-0 left-0">
        {loading && <div className='w-screen h-screen bg-black/10 flex items-center justify-center gap-8 flex-col fixed top-0 left-0 z-50 '>
                <AiOutlineLoading className='text-6xl text-black animate-spin'/>
                Loading...
                </div>}
        <div className=' col-span-10  p-10 pt-20 w-full'>
            <div className="flex gap-4 items-center ">
                <button onClick={()=>{setOpenModal(false)}} className="bg-jel-gray-2 p-4 rounded-xl hover:bg-jel-gray-3 duration-150"><FaArrowLeft/></button>
                <h1 className='font-bold text-left text-black text-3xl'>{obj.name} #{obj.tokenId}</h1>
            </div>
            <div className='grid grid-cols-7 gap-5 mt-10 w-[70%]'>
                <div className=' col-span-3'>
                    <h2 className='mb-2 text-sm '>NFT contract address</h2>
                    <div className='w-full py-3 overflow-scroll noscr bg-white outline-black border-[1px] border-jel-gray-3 rounded-lg px-5'>{obj.add}</div>
                </div>
                <div className=' col-span-3'>
                    <h2 className='mb-2 text-sm '>Token ID</h2>
                    <div className='w-full py-3 overflow-scroll noscr bg-white outline-black border-[1px] border-jel-gray-3 rounded-lg px-5'>{obj.tokenId}</div>
                </div>
                {/* <div className='w-full h-full flex items-end'>
                    <button className=' w-full py-3 font-medium rounded-lg bg-jel-gray-1 hover:bg-jel-gray-2'>Check</button>
                </div> */}

                <div className=' col-span-3'>
                    <h2 className='mb-2 text-sm '>Ticket Price</h2>
                    <div className='w-full py-3 overflow-scroll noscr bg-white outline-black border-[1px] border-jel-gray-3 rounded-lg px-5'>{obj.raffleEntryCleanCost == 0 ? obj.raffleEntryMaticCost : obj.raffleEntryCleanCost}</div>
                </div>
                <div className=' col-span-3'>
                    <h2 className='mb-2 text-sm '>Token</h2>
                    
                    <div className='w-full py-3 overflow-scroll noscr bg-white outline-black border-[1px] border-jel-gray-3 rounded-lg px-5'>{obj.raffleEntryCleanCost == 0 ? "MATIC" : "CLEAN"}</div>

                </div>
                <div className=' col-span-3'>
                    <h2 className='mb-2 text-sm '>Amount of tickets</h2>
                    <input value={obj.ticketLimit} type='text' placeholder='Amount of tickets' className='w-full h-12 outline-black border-[1px] border-jel-gray-3 rounded-lg px-5'/>
                </div>
                <div className=' col-span-3'>
                    <h2 className='mb-2 text-sm '>Tickets per wallet</h2>
                    <input value={obj.ticketLimitPerWallet} type='text' placeholder='Tickets per wallet' className='w-full h-12 outline-black border-[1px] border-jel-gray-3 rounded-lg px-5'/>
                </div>
                <div className=' col-span-6'>
                    <h2 className='mb-2 text-sm '>Opensea URL</h2>
                    <input value={obj.collectionLink} type='text' placeholder='Opensea URL' className='w-full h-12 outline-black border-[1px] border-jel-gray-3 rounded-lg px-5'/>
                </div>
                <div className='col-span-6 border-[1px] h-44 w-44 rounded-xl border-jel-gray-2'>
                    {obj.image != "" && <Image src={obj.image} className="h-44 w-44 rounded-xl" />}
                </div>

                <div>
                </div>

                <div className="flex gap-5">
                    <button className=' col-span-2 w-32 py-3 px-3 font-medium text-white rounded-xl hover:-translate-y-[0.3rem] duration-200 bg-black text-nowrap'>Declare Winner</button>
                    <button onClick={()=>{deleteRaffle(index)}} className=' col-span-2 w-32 py-3 px-3 font-medium text-white rounded-xl hover:-translate-y-[0.3rem] duration-200 bg-red-500 text-nowrap'>Delete Raffle</button>
                </div>


            </div>
        </div>
        </div>
    )
}