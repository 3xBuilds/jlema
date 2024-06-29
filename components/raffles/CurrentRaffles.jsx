"use client"

import { useState, useRef } from "react"
import nft1 from "../../assets/nft1.png"
import Image from "next/image";
import trophy from '../../assets/icons/trophy.svg'
import ticket from '../../assets/icons/ticket.svg'
import arrow from '../../assets/icons/arrow.svg'
import wallet from '../../assets/icons/wallet.svg'
import { useAccount } from "wagmi";
import { WalletConnectButton } from "../buttons/walletConnectButton";

const CurrentRaffles = ({selected, setSelected, activeArr, endArr}) => {
  
  const scrollContainerRef = useRef(null);
  const {isConnected} = useAccount();

  const moveForward = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({
        left: scrollContainerRef.current.offsetWidth,
        behavior: 'smooth'
      });
    }
  }

  const moveBackward = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({
        left: -scrollContainerRef.current.offsetWidth,
        behavior: 'smooth'
      });
    }
  }

  return (
    <div id="current-raffles" className="my-10">
      <div className="flex sm:flex-row flex-col max-sm:gap-4 items-center justify-between">
        <div className=" bg-jel-gray-1 w-fit h-12 rounded-xl flex flex-row gap-2 p-1">
          <button onClick={() => { setSelected(0) }} className={`cursor-pointer rounded-lg text-base px-4 py-2 ${selected == 0 ? "bg-white font-semibold text-black shadow-jel-card" : " font-medium text-jel-gray-4"}`}>
            <h3 className="">Ended Raffles</h3>
          </button>
          <button onClick={() => { setSelected(1) }} className={`cursor-pointer rounded-lg text-base px-4 py-2 ${selected == 1 ? "bg-white font-semibold text-black shadow-jel-card" : " font-medium text-jel-gray-4"}`}>
            <h3 className="">My Tickets</h3>
          </button>
        </div>
        <h3 className="max-sm:w-full max-sm:text-left text-jel-gray-4">Showing the latest 10 raffles</h3>
      </div>

      {selected==0 ? 
        <div className="w-full relative">
          <button onClick={moveForward} className=" absolute z-40 top-1/2 right-2 translate-x-1/2 -translate-y-1/2 w-10 h-10 rounded-lg bg-jel-gray-3 hover:bg-jel-gray-2 flex items-center justify-center">
            <Image src={arrow} className="w-2" alt="Move forward" />
          </button>
          <button onClick={moveBackward} className=" absolute z-40 top-1/2 left-2 -translate-x-1/2 -translate-y-1/2 w-10 h-10 rounded-lg bg-jel-gray-3 hover:bg-jel-gray-2 flex items-center justify-center">
            <Image src={arrow} className="w-2 rotate-180" alt="Move backward" />
          </button>
          <div className="mt-5 w-full overflow-hidden">
            <div ref={scrollContainerRef} className="grid grid-rows-1 grid-flow-col gap-3 items-center noscr justify-start min-w-[2000px] w-full overflow-x-auto scrollbar-hide pr-20">
              {endArr.map((ob, index) => (
                <div key={index} onClick={() => { }} className="rounded-xl hover:shadow-jel-nft duration-200 w-64 h-fit cursor-pointer border-[1px] border-jel-gray-3 overflow-hidden flex flex-col">
                  <div className="h-64 w-full">
                    {ob.image != "" && <Image width={1920} height={1080} src={ob.image} className="object-cover w-full h-full" alt={`NFT ${index + 1}`} />}
                  </div>
                  <div className="bg-white text-start py-2 px-4">
                    <h3 className="text-sm font-normal text-black">{ob.name} #{ob.tokenId}</h3>
                  </div>
                  <div className=" bg-jel-gray-1 border-t-[1px] border-jel-gray-3 text-center py-3 flex flex-row items-center justify-between px-4">
                    <div className="flex flex-row gap-2">
                      <Image src={trophy} className="w-4" alt="Trophy" />
                      <h3 className="text-sm font-normal text-black">Winner</h3>
                    </div>
                    <h3 className="text-sm font-bold text-black">{ob.winner}</h3>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
        :
        !isConnected ?
      <div className="flex flex-col gap-3 items-center justify-center w-full text-center my-10 mb-20">
        <Image src={wallet} className="w-20"/>
        <h3 className=" text-black font-semibold">Wallet not connected yet</h3>
        <h3 className=" text-jel-gray-4">Connect your wallet to see your tickets.</h3>
        <WalletConnectButton/>
      </div>
      :
      <div className="w-full relative">
      <button onClick={moveForward} className=" absolute z-40 top-1/2 right-2 translate-x-1/2 -translate-y-1/2 w-10 h-10 rounded-lg bg-jel-gray-3 hover:bg-jel-gray-2 flex items-center justify-center">
        <Image src={arrow} className="w-2" alt="Move forward" />
      </button>
      <button onClick={moveBackward} className=" absolute z-40 top-1/2 left-2 -translate-x-1/2 -translate-y-1/2 w-10 h-10 rounded-lg bg-jel-gray-3 hover:bg-jel-gray-2 flex items-center justify-center">
        <Image src={arrow} className="w-2 rotate-180" alt="Move backward" />
      </button>
      <div className="mt-5 w-full overflow-hidden">
        <div ref={scrollContainerRef} className="grid grid-rows-1 grid-flow-col gap-3 items-center noscr justify-start min-w-[2000px] w-full overflow-x-auto scrollbar-hide pr-20">
          
          
          {activeArr.map((ob, index) => (
            <>
            {ob.walletHolding > 0 &&
            <div key={index} onClick={() => { }} className="rounded-xl hover:shadow-jel-nft duration-200 w-64 h-fit cursor-pointer border-[1px] border-jel-gray-3 overflow-hidden flex flex-col">
              <div className="h-64 w-full">
                {ob.image != "" && <Image width={1920} height={1080} src={ob.image} className="object-cover w-full h-full" alt={`NFT ${index + 1}`} />}
              </div>
              <div className="bg-white text-start py-2 px-4">
                <h3 className="text-sm font-normal text-black">{ob.name} #{ob.tokenId}</h3>
              </div>
              <div className=" border-t-[1px] border-jel-gray-3 text-center py-3 flex flex-row items-center justify-between px-4">
                <div className="flex flex-row gap-2">
                  <Image src={ticket} className="w-4" alt="Trophy" />
                  <h3 className="text-sm font-normal text-black">Tickets</h3>
                </div>
                <h3 className="text-sm font-bold text-black">{ob.walletHolding}</h3>
              </div>
            </div>}
            </>
          ))}


        </div>
      </div>
    </div>
      }
    </div>
  )
}

export default CurrentRaffles