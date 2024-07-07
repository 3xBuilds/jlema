"use client"
import { WalletConnectButton } from '@/components/buttons/walletConnectButton'
import React from 'react'
import { IoWalletOutline } from "react-icons/io5";
import { contractAdds } from '@/utils/contractAdds';
import abi from "@/utils/abis/jlemaRaffle"
import erc721abi from "@/utils/abis/erc721abi"
import { ethers } from 'ethers';
import Image from 'next/image'
import nft1 from '../../assets/nft1.png'
import arrow from '../../assets/icons/arrow.svg'
import RaffleHighlights from '@/components/raffles/RaffleHighlights'
import CurrentRaffles from '@/components/raffles/CurrentRaffles'
import Footer from '@/components/Footer'
import { useState, useEffect } from 'react'
import { useAccount } from 'wagmi'
import SelectedRaffle from '@/components/raffles/SelectedRaffle'
import { WalletConnectButtonRaffle } from '@/components/buttons/walletConnectButtonRaffle'
import BuyTicketsModal from '@/components/raffles/BuyTicketsModal';

const Raffle = () => {

    const [selectedRaffle, setSelectedRaffle] = useState(null);

    // Ended Raffle:0 & My Tickets:0
    const [selected, setSelected] = useState(0);
    const [activeRaffleInfo, setActiveRaffleInfo] = useState([]);
    const [endedRaffleInfo, setEndedRaffleInfo] = useState([]);
    const [active, setActive] = useState(0);
    const [ended, setEnded] = useState(0);
    const {isConnected, address} = useAccount();
    const [connected, setConnected] = useState(true);
    const [showBuyModal, setShowBuyModal] = useState(false);
    const [buttonModalInfo, setButtonModalInfo] = useState({});
    const [showRaffle, setShowRaffle] = useState(0);

    const goToMyTickets = () => {
        setSelected(1);
        const currentRaffles = document.getElementById('current-raffles');
        currentRaffles?.scrollIntoView({ behavior: 'smooth' });
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

    async function setERC721Contract(address){
        try{
    
          const provider = new ethers.providers.Web3Provider(window.ethereum);
          const signer = provider.getSigner();
    
        //   const contract1 = new ethers.Contract(raffleAdd, raffleabi, signer);
        //   const address = await contract1?.raffleContract(number);
        //   console.log(address);
    

            const contract = new ethers.Contract(address, erc721abi, signer);
            // console.log(contract);
            return contract;
    
          
        }
        catch(err){
          console.log(err);
        }
      }

    async function fetchActive(){
      try{

        setActiveRaffleInfo([]);
        const contract = await contractSetup();
         await contract.activeRaffles().catch((err)=>{console.log(err)});
        setActive(Number(await contract.activeRaffles()));
        // console.log("hello");
        const active = await contract.fetchActiveRaffles();

        for(let i = 0; i<active.length; i++){
            const add = active[i][0];
            const tokenId = Number(active[i][1]);

            const totalEntrants = Number(active[i][2]);
            const ticketsSold = Number(active[i][3]);
            const ticketLimit = Number(active[i][4]);
            const walletHolding = Number(active[i][5]);
            const ticketLimitPerWallet = Number(active[i][6]);
            const raffleEntryCleanCost = Number(ethers.utils.formatEther(active[i][7]));
            const raffleEntryMaticCost = Number(ethers.utils.formatEther(active[i][8]));
            const collectionLink = active[i][9];
            const participants = active[i][10];

            const contract = await setERC721Contract(add);

            const name = await contract.name();
            console.log("ADDRESS",add, typeof(add));
            const image = "https://jlema-raffle-storage.s3.ap-south-1.amazonaws.com/raffles/Jlema_"+String(add).toLowerCase()+"_"+String(tokenId)
            console.log(image);
            setActiveRaffleInfo(oldArr => [...oldArr ,{name, image, add, tokenId, totalEntrants, ticketsSold, ticketLimit, walletHolding, ticketLimitPerWallet, raffleEntryCleanCost, raffleEntryMaticCost, collectionLink, participants}]);
            // console.log(tokenURI)
        
        }
      }
      catch(err){
        console.log(err);
      }
    }

    async function fetchEnded(){
      try{
        const contract = await contractSetup();
        const ended = await contract.fetchEndedRaffles();

        for(let i = 0; i<ended.length; i++){
          const add = ended[i][0];
          const tokenId = Number(ended[i][1]);
          const winner = ended[i][2];

          const contract = await setERC721Contract(add);

            const name = await contract.name();
            const image = "https://jlema-raffle-storage.s3.ap-south-1.amazonaws.com/raffles/Jlema_"+String(add).toLowerCase()+"_"+String(tokenId)

            setEndedRaffleInfo(oldArr => [...oldArr ,{name, image, tokenId, winner}]);

        }

      }
      catch(err){
        console.log(err);
      }
    }

    useEffect(()=>{
        fetchActive();
        fetchEnded();
        if(!isConnected){
          setConnected(false);
        }
    },[])

    useEffect(()=>{
      if(isConnected){
        setConnected(true);
      }
    },[isConnected])

  return (
    <div className="w-[95%] max-md:w-[90%] mx-auto">

      {<div className='w-screen h-screen flex items-center bg-black/30 justify-center fixed z-50 top-0 left-0 '>
          <div className='bg-white border-t-[1px] border-r-[1px] max-sm:w-[95%] shadow-xl shadow-black/20 border-jel-gray-2 flex flex-col justify-center items-center p-5 rounded-xl'>
              <h3 className='mb-5 font-semibold text-lg'>Please connect your wallet</h3>
              <WalletConnectButton/>
          </div>
      </div>}

        <div className="mt-24 max-md:w-full flex flex-row items-center justify-between border-b-[1px] border-jel-gray-3 pb-2">
            <div className='max-md:hidden'>
                <h1 className=" font-bold text-black text-2xl max-md:text-xl">Raffles</h1>
                <h2 className=" font-normal text-jel-gray-4 text-base max-w-[50vw]">
                    Win your favorite Polygon NFTs. Enter the Raffle Now!
                </h2>
            </div>
            
            <WalletConnectButtonRaffle/>
            
        </div>

        <BuyTicketsModal setSelectedRaffle={setSelectedRaffle} fetchActive={fetchActive} goToMyTickets={goToMyTickets} showBuyModal={showBuyModal} setShowBuyModal={setShowBuyModal} info={buttonModalInfo} index={showRaffle}/>
        
        {
            selectedRaffle!=null ? <SelectedRaffle setButtonModalInfo={setButtonModalInfo} setShowBuyModal={setShowBuyModal} selectedRaffle={selectedRaffle} setSelectedRaffle={setSelectedRaffle}/>
        :
        <>
            <RaffleHighlights showBuyModal={showBuyModal} setShowBuyModal={setShowBuyModal} showRaffle={showRaffle} setShowRaffle={setShowRaffle} setButtonModalInfo={setButtonModalInfo} fetchActive={fetchActive} goToMyTickets={goToMyTickets} setSelectedRaffle={setSelectedRaffle} activeArr={activeRaffleInfo}/>
            <CurrentRaffles selected={selected} setSelected={setSelected} activeArr={activeRaffleInfo} endArr={endedRaffleInfo}/>
            <Footer/>
        </>}

    </div>
  )
}

export default Raffle