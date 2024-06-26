"use client"
import React from 'react'
import { useState } from 'react'
import { RxCross2 } from "react-icons/rx";
import loader from '../../assets/icons/loading.png'
import tick from '../../assets/icons/tick.svg'
import Image from 'next/image';


const BuyTicketsModal = ({showBuyModal, setShowBuyModal, goToMyTickets}) => {

    const [number, setNumber] = useState(1);
    const [cleanCost, setCleanCost] = useState(100);
    const [maticCost, setMaticCost] = useState(2);
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);

  if(showBuyModal) return (
    <div className="fixed top-0 left-0 z-50 bg-black/40 backdrop-blur-sm w-screen h-screen flex items-center justify-center">
        {!success ? <div className="w-[400px] bg-white rounded-xl shadow-2xl p-5 relative">
            <RxCross2 onClick={()=>setShowBuyModal(false)} className="absolute cursor-pointer top-5 right-5 text-2xl text-jel-gray-4"/>
            <h2 className=" text-lg text-center text-black font-bold">Buy Tickets</h2>
            <div className="flex flex-col gap-3 mt-5 border-jel-gray-3 border rounded-lg p-4">
            <div className="">
                <h2 className="text-jel-gray-4">Ticket Price</h2>
                <h2 className="text-black font-bold text-lg">{cleanCost} CLEAN / {maticCost} MATIC</h2>
            </div>
            <div className="">
                <h2 className="text-jel-gray-4">Ticket Remaining</h2>
                <h2 className="text-black font-bold text-lg">5/100</h2>
            </div>
            </div>
            <div className="flex flex-row justify-between gap-3 mt-3 border-jel-gray-3 border rounded-lg p-4">
                <button className=" text-xl font-semibold " onClick={()=>{ number>1 && setNumber(prev=>Number(prev)-1)}}>-</button>
                <input type="number" className="text-black font-bold text-lg text-center outline-none" value={number} onChange={(e)=>{setNumber(e.target.value)}}/>
                <button className=" text-xl font-semibold " onClick={()=>{ setNumber(prev=>Number(prev)+1)}}>+</button>
            </div>
            <h2 className="text-jel-gray-4 mt-4">Total Costs</h2>
            {!loading && <button onClick={()=>{setLoading(true)}} className="bg-black text-white rounded-xl text-center mt-2 font-semibold py-3 w-full flex items-center justify-center ">{number * cleanCost} CLEAN</button>}
            {!loading && <button onClick={()=>{setLoading(true)}} className="bg-jel-gray-1 hover:bg-jel-gray-2 text-black rounded-xl text-center mt-2 font-semibold py-3 w-full flex items-center justify-center">{number * maticCost} MATIC</button>}
            {loading &&
            <button onClick={()=>{setLoading(false);setSuccess(true)}} className="bg-jel-gray-2 text-jel-gray-4 rounded-xl text-center mt-2 font-semibold py-3 w-full flex items-center justify-center">
                <Image className=" animate-spin" src={loader}/>
                <h3 className="ml-2">Loading</h3>
            </button>}

        </div>:
        <div className="w-[400px] bg-white rounded-xl shadow-2xl p-5 relative">
            <RxCross2 onClick={()=>setShowBuyModal(false)} className="absolute cursor-pointer top-5 right-5 text-2xl text-jel-gray-4"/>
            <h2 className=" text-lg text-center text-black font-bold">Ticket Purchase Successfully</h2>
            <div className=" mx-auto my-16 border-black border-[6px] rounded-full flex items-center justify-center w-24 h-24 p-2"><Image src={tick} className="w-20"/></div>
            <button onClick={()=>{setShowBuyModal(false); setSuccess(false); goToMyTickets()}} className="bg-black text-white rounded-xl text-center mt-2 font-semibold py-3 w-full flex items-center justify-center">View my ticket</button>
        </div>}
        
    </div>
  )
}

export default BuyTicketsModal