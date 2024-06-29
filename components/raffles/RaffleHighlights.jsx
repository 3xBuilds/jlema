"use client"

import Image from 'next/image'
import raffleBanner from '../../assets/rafbanner.png'
import nft1 from '../../assets/nft1.png'
import arrow from '../../assets/icons/arrow.svg'
import { useState } from 'react'
import BuyTicketsModal from './BuyTicketsModal'
import defaultimage from "@/assets/defaultimage.png"
import noRaffle from "@/assets/noRaffleBanner.png"
const RaffleHighlights = ({goToMyTickets, setSelectedRaffle, activeArr}) => {

    const [showBuyModal, setShowBuyModal] = useState(false);
    const [showRaffle, setShowRaffle] = useState(0);
    const [buttonModalInfo, setButtonModalInfo] = useState({});

    return (
        <>
            <BuyTicketsModal goToMyTickets={goToMyTickets} showBuyModal={showBuyModal} setShowBuyModal={setShowBuyModal} info={buttonModalInfo} index={showRaffle}/>

            <div className="my-5 relative">
                <button onClick={()=>{if(showRaffle<activeArr.length-1){setShowRaffle(showRaffle+1)}}} className=" absolute z-30 top-1/2 right-2 translate-x-1/2 -translate-y-1/2 w-10 h-10 rounded-lg bg-jel-gray-3 hover:bg-jel-gray-2 flex items-center justify-center">
                    <Image src={arrow} className="w-2" />
                </button>
                <button onClick={()=>{if(showRaffle>0){setShowRaffle(showRaffle-1)};}} className="absolute z-30 top-1/2 left-2 -translate-x-1/2 -translate-y-1/2 w-10 h-10 rounded-lg bg-jel-gray-3 hover:bg-jel-gray-2 flex items-center justify-center">
                    <Image src={arrow} className="w-2 rotate-180" />
                </button>

            { activeArr.length > 0 ? activeArr.map((item, i)=>(
                <>
                {i == showRaffle && <div className="w-full relative sm:h-[600px] h-[840px] rounded-xl overflow-hidden">
                    <Image src={item.image == "" ? defaultimage : item.image} className="w-full h-full object-cover relative z-10" />
                    <div className="z-20 absolute w-full h-full bg-black/40 top-0 left-0 backdrop-blur-lg sm:p-16 p-8 sm:grid sm:grid-cols-2 items-center justify-center gap-0">
                        <div className="h-96 w-96 mx-auto aspect-square overflow-hidden rounded-xl ">
                            <Image src={item.image == "" ? defaultimage : item.image} className="sm:w-full sm:h-full object-cover" />
                        </div>

                        <div className="w-full">
                            <h3 className="px-3 py-1 mb-5 w-fit rounded-xl border-[1px] border-white text-white">{item.name}</h3>
                            <h2 className="mb-5 text-5xl text-white font-bold">{item.name} #{item.tokenId}</h2>
                            <div className="h-[1px] bg-white w-full"></div>
                            <h2 className="mt-5 text-white ">Ticket Price</h2>
                            <h2 className="mb-5 text-xl text-white font-bold">{item.raffleEntryCleanCost == 0 ? item.raffleEntryMaticCost : item.raffleEntryCleanCost} {item.raffleEntryCleanCost == 0 ? "MATIC" : "CLEAN"}</h2>
                            <h2 className="mt-5 text-white ">Ticket Remaining</h2>
                            <h2 className="mb-5 text-xl text-white font-bold">{item.ticketLimit-item.ticketsSold}/{item.ticketLimit}</h2>
                            <div className="h-[1px] bg-white w-full mb-5"></div>
                            <div className="flex flex-row gap-3 items-center w-full sm:justify-start justify-center">
                                <button onClick={()=>{setShowBuyModal(true);  setButtonModalInfo(item);}} className="sm:px-5 sm:py-2 px-6 py-4 rounded-xl bg-black text-white font-semibold">Buy Ticket</button>
                                <button onClick={()=>{setSelectedRaffle(item); }} className="sm:px-5 sm:py-2 px-6 py-4 rounded-xl bg-white text-black hover:bg-jel-gray-2 font-semibold">View details</button>
                            </div>
                        </div>
                    </div>
                </div>}
                </>
                )) : 
                <div className="w-full relative sm:h-[600px] h-[840px] rounded-xl overflow-hidden">
                    <Image src={noRaffle} className='object-contain w-full h-full'/>
                </div>
                }

                <div className="flex flex-row gap-2 w-fit mx-auto mt-5">
                    <div className="w-12 h-1 bg-jel-gray-4 rounded-full"></div>
                    <div className="w-12 h-1 bg-jel-gray-3 rounded-full"></div>
                    <div className="w-12 h-1 bg-jel-gray-3 rounded-full"></div>
                    <div className="w-12 h-1 bg-jel-gray-3 rounded-full"></div>
                </div>
            </div>
        </>
    )
}

export default RaffleHighlights