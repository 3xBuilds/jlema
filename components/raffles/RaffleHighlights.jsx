"use client"

import Image from 'next/image'
import nft1 from '../../assets/nft1.png'
import arrow from '../../assets/icons/arrow.svg'
import { useEffect, useState } from 'react'
import BuyTicketsModal from './BuyTicketsModal'
import defImg from "@/assets/defImg.png"
import noRaffle from "@/assets/noRaffleBanner.png"
import noRafflephone from "@/assets/raffleBanner.png"

const RaffleHighlights = ({fetchActive, goToMyTickets, setShowBuyModal, showBuyModal, showRaffle, setShowRaffle, setSelectedRaffle, activeArr, setButtonModalInfo}) => {

    useEffect(()=>{
        if(activeArr.length > 1){

            const interval = setInterval(()=>{
                if(!showBuyModal)
                goNext();
            }, 7000)
            return ()=>clearInterval(interval);
        }
    }, [activeArr, showRaffle, showBuyModal])


    const goNext = () => {
        if (showRaffle == activeArr.length - 1) {
            setShowRaffle(0);
        } else {
            setShowRaffle(prev=>prev+1)
        }
    }

    const goBack = () => {
        if (showRaffle === 0) {
            setShowRaffle(activeArr.length - 1);
        } else {
            setShowRaffle(prev=>prev-1)
        }

    }

    return (
        <>
            <div className="my-5 relative">
                {activeArr.length > 0 && <>
                    <button onClick={goNext} className=" absolute z-30 top-1/2 right-2 translate-x-1/2 -translate-y-1/2 w-10 h-10 rounded-lg bg-jel-gray-3 hover:bg-jel-gray-2 flex items-center justify-center">
                        <Image width={1080} height={1080} src={arrow} className="w-2" />
                    </button>
                    <button onClick={goBack} className="absolute z-30 top-1/2 left-2 -translate-x-1/2 -translate-y-1/2 w-10 h-10 rounded-lg bg-jel-gray-3 hover:bg-jel-gray-2 flex items-center justify-center">
                        <Image width={1080} height={1080} src={arrow} className="w-2 rotate-180" />
                    </button>
                </>}

            { activeArr.length > 0 ? activeArr.map((item, i)=>(
                <>
                {i == showRaffle && <div className="w-full relative sm:h-[600px] h-[840px] rounded-xl overflow-hidden">
                    <Image width={1080} height={1080} src={item.image == "" ? defImg : item.image} className="w-full h-full object-cover relative z-10" />
                    <div className="z-20 absolute w-full h-full bg-black/40 top-0 left-0 backdrop-blur-lg sm:p-16 p-8 sm:grid sm:grid-cols-2 items-center justify-center gap-0">
                        <div className="sm:h-96 sm:w-96 w-fit max-sm:mb-5 mx-auto aspect-square overflow-hidden rounded-xl ">
                            <Image width={1080} height={1080} src={item.image == "" ? defImg : item.image} className="sm:w-full sm:h-full rounded-xl object-cover" />
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
                                <button onClick={()=>{setShowBuyModal(true);  setButtonModalInfo(item);}} className="sm:px-5 hover:translate-y-[-1px] duration-150 sm:py-2 px-6 py-4 rounded-xl bg-black text-white font-semibold">Buy Ticket</button>
                                <button onClick={()=>{setSelectedRaffle(item); setShowRaffle(i) }} className="sm:px-5 sm:py-2 px-6 py-4 hover:translate-y-[-1px] duration-150 rounded-xl bg-white text-black hover:bg-jel-gray-2 font-semibold">View details</button>
                            </div>
                        </div>
                    </div>
                </div>}
                </>
                )) : 
                <div className="w-full relative sm:h-[600px] h-[840px] rounded-xl overflow-hidden">
                    <Image width={1080} height={1080} src={noRaffle} className='object-cover w-full h-full max-sm:hidden'/>
                    <Image width={1080} height={1080} src={noRafflephone} className='object-cover w-full h-full sm:hidden'/>
                </div>
                }

                <div className="flex flex-row gap-2 w-fit mx-auto mt-5">
                    {activeArr.map((ob,index)=>(<div className={`w-12 h-1 ${showRaffle==index ? "bg-jel-gray-4" : "bg-jel-gray-3"} rounded-full`}></div>))}
                </div>
            </div>
        </>
    )
}

export default RaffleHighlights