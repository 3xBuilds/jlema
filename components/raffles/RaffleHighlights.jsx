"use client"

import Image from 'next/image'
import raffleBanner from '../../assets/rafbanner.png'
import nft1 from '../../assets/nft1.png'
import arrow from '../../assets/icons/arrow.svg'
import { useState } from 'react'
import BuyTicketsModal from './BuyTicketsModal'

const RaffleHighlights = ({goToMyTickets, setSelectedRaffle}) => {

    const [showBuyModal, setShowBuyModal] = useState(false);

    return (
        <>
            <BuyTicketsModal goToMyTickets={goToMyTickets} showBuyModal={showBuyModal} setShowBuyModal={setShowBuyModal}/>
            <div className="my-5 relative">
                <button className=" absolute z-30 top-1/2 right-2 translate-x-1/2 -translate-y-1/2 w-10 h-10 rounded-lg bg-jel-gray-3 hover:bg-jel-gray-2 flex items-center justify-center">
                    <Image src={arrow} className="w-2" />
                </button>
                <button className=" absolute z-30 top-1/2 left-2 -translate-x-1/2 -translate-y-1/2 w-10 h-10 rounded-lg bg-jel-gray-3 hover:bg-jel-gray-2 flex items-center justify-center">
                    <Image src={arrow} className="w-2 rotate-180" />
                </button>

                <div className="w-full relative h-[600px] rounded-xl overflow-hidden">


                    <Image src={nft1} className="w-full h-full object-cover relative z-10" />
                    <div className="z-20 absolute w-full h-full bg-black/40 top-0 left-0 backdrop-blur-lg p-16 grid grid-cols-2 items-center justify-center gap-0">
                        <div className="h-full mx-auto aspect-square overflow-hidden rounded-xl ">
                            <Image src={nft1} className="w-full h-full object-cover" />
                        </div>

                        <div className="w-full">
                            <h3 className="px-3 py-1 mb-5 w-fit rounded-xl border-[1px] border-white text-white">Jlema</h3>
                            <h2 className="mb-5 text-5xl text-white font-bold">Jlema #2</h2>
                            <div className="h-[1px] bg-white w-full"></div>
                            <h2 className="mt-5 text-white ">Ticket Price</h2>
                            <h2 className="mb-5 text-xl text-white font-bold">100 CLEAN / 2 MATIC</h2>
                            <h2 className="mt-5 text-white ">Ticket Remaining</h2>
                            <h2 className="mb-5 text-xl text-white font-bold">5/100</h2>
                            <div className="h-[1px] bg-white w-full mb-5"></div>
                            <div className="flex flex-row gap-3">
                                <button onClick={()=>setShowBuyModal(true)} className="px-5 py-2 rounded-xl bg-black text-white font-semibold">Buy Ticket</button>
                                <button onClick={()=>{setSelectedRaffle(nft1)}} className="px-5 py-2 rounded-xl bg-white text-black hover:bg-jel-gray-2 font-semibold">View details</button>
                            </div>
                        </div>
                    </div>
                </div>

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