"use client"
import React, { useEffect } from 'react'
import { useState } from 'react'
import { RxCross2 } from "react-icons/rx";
import loader from '../../assets/icons/loading.png'
import tick from '../../assets/icons/tick.svg'
import Image from 'next/image';
import { contractAdds } from '@/utils/contractAdds';
import abi from "@/utils/abis/jlemaRaffle"
import erc20abi from "@/utils/abis/erc20abi"
import { ethers } from 'ethers';
import { useAccount } from 'wagmi';

const BuyTicketsModal = ({fetchActive, setSelectedRaffle, showBuyModal, setShowBuyModal, goToMyTickets, info, index}) => {
    const {address} = useAccount();
    const [number, setNumber] = useState(1);
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);

    useEffect(()=>{
      console.log("INFO",info, index)
    },[info, index]);

    async function setERC20() {
        const provider = new ethers.providers.Web3Provider(window.ethereum);
    
        const signer = provider.getSigner();
    
        try {
          const contract = new ethers.Contract(contractAdds.CLEANToken, erc20abi, signer);
    
          return contract;
        }
        catch (err) {
          console.log(err);
        }
      }

      async function approve(price) {
        try {
          setLoading(true)
          const contract = await setERC20();
    
          const allowance = await contract.allowance(address, contractAdds.JlemaRaffle);
          console.log(Number(allowance));
    
          if (allowance < ethers.utils.parseEther(String(price))) {
    
            const resp = await contract.approve(contractAdds.JlemaRaffle, ethers.utils.parseEther(String(price*number)));
            resp.wait().then((res) => {
              enterCleanRaffle();
            })
          }
    
          else {
            enterCleanRaffle()
          }
    
        }
    
        catch (err) {
          console.log(err);
          setLoading(false);
        }
    
      }

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

    async function enterCleanRaffle(){
        try{
            console.log(index, number);
            const contract = await contractSetup();
            const txn = await contract.enterCleanRaffle(index, number);

            txn.wait().then((res)=>{
                setLoading(false);
                setSuccess(true);
            })
        }
        catch(err){
            console.log(err);
            setLoading(false);
        }
    }

    async function enterMaticRaffle(){
        try{
            console.log(index, number);
            const contract = await contractSetup();
            const txn = await contract.enterMaticRaffle(index, number, {value: ethers.utils.parseEther(String(number*info.raffleEntryMaticCost))});

            txn.wait().then((res)=>{
                setLoading(false);
                setSuccess(true);
            })
        }
        catch(err){
            console.log(err);
            setLoading(false);
        }
    }

    async function fillMax(){
      setNumber(info.ticketLimitPerWallet - info.walletHolding);
    }

  if(showBuyModal)
     return (
    <div className="fixed top-0 left-0 z-50 bg-black/40 backdrop-blur-sm w-screen h-screen flex items-center justify-center">
        {!success ? <div className="w-[400px] bg-white rounded-xl shadow-2xl p-5 relative">
            <RxCross2 onClick={()=>setShowBuyModal(false)} className="absolute cursor-pointer top-5 right-5 text-2xl text-jel-gray-4"/>
            <h2 className=" text-lg text-center text-black font-bold">Buy Tickets</h2>
            <div className="flex flex-col gap-3 mt-5 border-jel-gray-3 border rounded-lg p-4">
            <div className='flex gap-10 w-full'>
                <div className="w-1/2">
                    <h2 className="text-jel-gray-4">Ticket Price</h2>
                    <h2 className="text-black font-bold text-lg">{info.raffleEntryCleanCost == 0 ? info.raffleEntryMaticCost : info.raffleEntryCleanCost} {info.raffleEntryCleanCost == 0 ? "MATIC" : "CLEAN"}</h2>
                </div>
                <div className="flex flex-col justify-end w-1/2">
                    <h2 className="text-jel-gray-4">You Own</h2>
                    <h2 className="text-black font-bold text-lg">{info.walletHolding}/{info.ticketLimitPerWallet}</h2>
                </div>
            </div>
            <div className="">
                <h2 className="text-jel-gray-4">Ticket Remaining</h2>
                <h2 className="text-black font-bold text-lg">{info.ticketLimit-info.ticketsSold}/{info.ticketLimit}</h2>
            </div>
            
            </div>
            <div className="flex flex-row justify-between gap-3 mt-3 border-jel-gray-3 border rounded-lg p-4">
                <button className=" text-xl font-semibold " onClick={()=>{ number>1 && setNumber(prev=>Number(prev)-1)}}>-</button>
                <input type="number" className="text-black font-bold text-lg text-center outline-none" value={number} onChange={(e)=>{setNumber(e.target.value)}}/>
                <button className=" text-xl font-semibold " onClick={()=>{if(number<info.ticketLimitPerWallet)setNumber(prev=>Number(prev)+1)}}>+</button>
            </div>
            <div className='flex w-full items-center mt-4'>
              <h2 className="text-jel-gray-4 w-1/2">Total Costs</h2>
              <div className='w-1/2 flex items-center  my-auto justify-end'>
                <button onClick={fillMax} className='px-4 font-bold'>MAX</button>
              </div>
            </div>
            {!loading && info.raffleEntryCleanCost != 0 && <button onClick={()=>{setLoading(true); approve(info.raffleEntryCleanCost)}} className="bg-black text-white rounded-xl text-center mt-2 font-semibold py-3 w-full flex items-center justify-center ">{number * info.raffleEntryCleanCost} CLEAN</button>}
            {!loading && info.raffleEntryMaticCost != 0 && <button onClick={()=>{setLoading(true); enterMaticRaffle()}} className="bg-jel-gray-1 hover:bg-jel-gray-2 text-black rounded-xl text-center mt-2 font-semibold py-3 w-full flex items-center justify-center">{number * info.raffleEntryMaticCost} MATIC</button>}
            {loading &&
            <button className="bg-jel-gray-2 text-jel-gray-4 rounded-xl text-center mt-2 font-semibold py-3 w-full flex items-center justify-center">
                <Image className=" animate-spin" src={loader}/>
                <h3 className="ml-2">Loading</h3>
            </button>}

        </div>:
        <div className="w-[400px] bg-white rounded-xl shadow-2xl p-5 relative">
            <RxCross2 onClick={()=>setShowBuyModal(false)} className="absolute cursor-pointer top-5 right-5 text-2xl text-jel-gray-4"/>
            <h2 className=" text-lg text-center text-black font-bold">Ticket Purchase Successfully</h2>
            <div className=" mx-auto my-16 border-black border-[6px] rounded-full flex items-center justify-center w-24 h-24 p-2"><Image src={tick} className="w-20"/></div>
            <button onClick={()=>{fetchActive(); setSelectedRaffle(null); setShowBuyModal(false); setSuccess(false); goToMyTickets()}} className="bg-black text-white rounded-xl text-center mt-2 font-semibold py-3 w-full flex items-center justify-center">View my ticket</button>
        </div>}
        
    </div>
  )
}

export default BuyTicketsModal