"use client"
import { WalletConnectButton } from '@/components/buttons/walletConnectButton'
import React from 'react'
import { IoWalletOutline } from "react-icons/io5";

import Image from 'next/image'
import nft1 from '../../assets/nft1.png'
import arrow from '../../assets/icons/arrow.svg'
import RaffleHighlights from '@/components/raffles/RaffleHighlights'
import CurrentRaffles from '@/components/raffles/CurrentRaffles'
import Footer from '@/components/Footer'
import { useState } from 'react'
import { useAccount } from 'wagmi'
import SelectedRaffle from '@/components/raffles/SelectedRaffle'
import { WalletConnectButtonRaffle } from '@/components/buttons/walletConnectButtonRaffle'

const Raffle = () => {

    const [selectedRaffle, setSelectedRaffle] = useState(nft1);

    // Ended Raffle:0 & My Tickets:0
    const [selected, setSelected] = useState(0);
    
    const {isConnected} = useAccount();

    const goToMyTickets = () => {
        setSelected(1);
        const currentRaffles = document.getElementById('current-raffles');
        currentRaffles.scrollIntoView({ behavior: 'smooth' });
    }

  return (
    <div className="w-[97%] max-md:w-[90%] mx-auto">
        <div className="mt-24 flex flex-row items-center justify-between border-b-[1px] border-jel-gray-3 pb-2">
            <div>
                <h1 className="font-bold text-black text-2xl max-md:text-xl">Raffles</h1>
                <h2 className="font-normal text-jel-gray-4 text-base max-md:text-sm">
                    Win CLEAN tokens or your favorite Polygon NFTs. Enter the Raffle Now!
                </h2>
            </div>
            <WalletConnectButtonRaffle/>
        </div>

        
        {
            selectedRaffle!=null ? <SelectedRaffle selectedRaffle={selectedRaffle} setSelectedRaffle={setSelectedRaffle}/>
        :
        <>
            {/* No ended raffles */}
            {/* <div className="my-5 relative">
                <div className="w-full mx-auto h-96 overflow-hidden rounded-xl">
                    <Image src={raffleBanner} className="w-full h-full object-cover"/>
                </div> 
            </div> */}

            {/* Ended Raffles */}
            <RaffleHighlights goToMyTickets={goToMyTickets} setSelectedRaffle={setSelectedRaffle}/>
            <CurrentRaffles selected={selected} setSelected={setSelected}/>
            <Footer/>
        </>}

    </div>
  )
}

export default Raffle