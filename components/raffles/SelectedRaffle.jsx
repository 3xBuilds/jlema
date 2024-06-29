"use client"
import React, { useEffect } from 'react'
import nft1 from '../../assets/nft1.png'
import Image from 'next/image'
import back from '../../assets/icons/arrowleft.svg'
import { useState } from 'react'
import { useAccount } from 'wagmi'
import { WalletConnectButton } from '../buttons/walletConnectButton'
import defaultimage from "@/assets/defaultimage.png"
import { SiOpensea } from "react-icons/si";


const SelectedRaffle = ({selectedRaffle, setSelectedRaffle}) => {

    const {isConnected} = useAccount();

    // Participants:0 or Terms & Conditions:1
    const [selected, setSelected] = useState(0);
    const [participants, setParticipants] = useState([]);

  return (
    <div>
        <div className="my-5 relative flex sm:flex-row flex-col gap-5 w-full">
            <div className="border-jel-gray-3 sm:w-1/2 border-[1px] rounded-xl h-full overflow-hidden">
                <Image src={selectedRaffle.image == "" ? defaultimage : selectedRaffle.image} className="w-full h-full object-cover"/>
                
                <button onClick={()=>{setSelectedRaffle(null)}} className="rounded-lg bg-jel-gray-2 hover:bg-jel-gray-3 cursor-pointer absolute top-3 left-3 w-10 h-10 p-2">
                    <Image src={back} className="w-full h-full "/>
                </button>
            </div>
            <div className="sm:w-1/2">
            <div className='flex mb-5'>
                <h3 className="px-3 py-1 w-fit rounded-xl border-[1px] border-jel-gray-3 text-black">{selectedRaffle.name}</h3>
                <div className='w-full justify-end items-end flex'>
                    <a href={selectedRaffle.collectionLink} target='_blank' className='cursor-pointer rounded-xl flex p-2 w-9 items-center justify-end bg-jel-gray-3'>
                        <SiOpensea className='text-xl'/>
                    </a>
                </div>
            </div>
                <h2 className="mb-5 text-5xl text-black font-bold">{selectedRaffle.name} #{selectedRaffle.tokenId}</h2>
                <div className="grid grid-cols-2 gap-5 mt-5 border-jel-gray-3 border rounded-lg py-4">
                    
                    <div className="px-4">
                        <h2 className="text-jel-gray-4">Tickets Remaining</h2>
                        <h2 className="text-black font-bold text-2xl">{selectedRaffle.ticketLimit-selectedRaffle.ticketsSold}/{selectedRaffle.ticketLimit}</h2>
                    </div>
                    <div className="px-4">
                        <h2 className="text-jel-gray-4">Tickets Owned</h2>
                        <h2 className="text-black font-bold text-2xl">{selectedRaffle.walletHolding}/{selectedRaffle.ticketLimitPerWallet}</h2>
                    </div>
                    <div className="px-4">
                        <h2 className="text-jel-gray-4">Ticket Price</h2>
                        <h2 className="text-black font-bold text-2xl">{selectedRaffle.raffleEntryCleanCost == 0 ? selectedRaffle.raffleEntryMaticCost : selectedRaffle.raffleEntryCleanCost} {selectedRaffle.raffleEntryCleanCost == 0 ? "MATIC" : "CLEAN"}</h2>
                    </div>
                    <div></div>
                    <div className=" col-span-2 border-t-[1px] border-jel-gray-3 pt-4 px-4">
                        {isConnected ? <button onClick={()=>setShowBuyModal(true)} className=" w-full px-5 py-3 rounded-xl bg-black text-white font-semibold">Buy Ticket</button>: <WalletConnectButton/>}
                    </div>
                </div>
                <div className="my-5">
            <div className="flex flex-row items-center max-sm:w-full justify-center sm:justify-start">
                <div className=" bg-jel-gray-1 max-sm:w-full h-12 rounded-xl flex flex-row gap-2 p-1">
                <button onClick={() => { setSelected(0) }} className={`cursor-pointer rounded-lg max-sm:w-1/2 text-base px-4 py-2 ${selected == 0 ? "bg-white font-semibold text-black shadow-jel-card" : " font-medium text-jel-gray-4"}`}>
                    <h3 className="">Participants</h3>
                </button>
                <button onClick={() => { setSelected(1) }} className={`cursor-pointer rounded-lg max-sm:w-1/2 text-base px-4 py-2 ${selected == 1 ? "bg-white font-semibold text-black shadow-jel-card" : " font-medium text-jel-gray-4"}`}>
                    <h3 className="">Term & Conditions</h3>
                </button>
                </div>
            </div>
            <div className="w-full rounded-xl border-[1px] border-jel-gray-3 mt-4">
                {
                    selected==0 ?
                    <div className="flex flex-col h-32 overflow-scroll noscr">
                        <div className='grid grid-cols-2'>
                            <div className="w-full text-start px-5 border-b-[1px] h-12 border-jel-gray-3 py-2 font-semibold">Participants ({selectedRaffle.totalEntrants})</div>
                            <div className="w-full text-center border-b-[1px] h-12 border-jel-gray-3 py-2 font-semibold">Tickets Bought</div>
                        </div>
                        {
                            selectedRaffle.participants?.map((participant, index)=>(
                                <div className='grid grid-cols-2'>
                                    <div className="w-full text-start px-5 h-10 text-black py-2">{participant[0].substring(0,5)+"..."+participant[0].substring(participant[0].length-4, participant[0].length)}</div>
                                    <div className="w-full text-center px-5 h-10 text-black py-2">{Number(participant[1])}</div>
                                    {index<participants.length-1 && <div className="w-[95%] mx-auto col-span-2 bg-jel-gray-3 h-[1px]"></div>}
                                </div>
                            ))
                        }


                        
                    </div>
                    :
                    <div className="">
                        <div className="w-full text-start px-5 border-b-[1px] border-jel-gray-3 py-2 font-semibold">Term & Conditions</div>
                       <ul className=" list-disc text-jel-gray-4 py-3 px-10">
                            <li>All NFT prizes will be auto-transferred to the winner once the draw is done.</li>
                            <li>The draw countdown begins when all tickets are sold.</li>
                            <li>Raffle tickets are non-refundable, whether you win or not.</li>
                            <li>Purchasing one ticket will grant you an opportunity to win in the raffle, more tickets represent a higher probability of winning.</li>
                            <li>You can only buy 20% of total tickets.</li>
                       </ul>
                        
                    </div>
                }
            </div>
            </div>
            
        </div>
        </div>
        
    </div>
  )
}

export default SelectedRaffle