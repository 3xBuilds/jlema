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
    const {isConnected} = useAccount();

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

            const image = "https://jlema-raffle-storage.s3.ap-south-1.amazonaws.com/raffles/Jlema_"+add+"_"+tokenId
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
            const tokenURI = await contract.tokenURI(tokenId);
            const name = await contract.name();
            // console.log(tokenURI)

            if(tokenURI[0] == "h"){
                    try{
                        const metadata = tokenURI;
    
                        const meta = await fetch(metadata , {
                            signal: AbortSignal.timeout(2000)
                          });

                          console.log(meta);
                        const json = await meta.json();
                        const newimage = json["image"];
                        const image = `https://cloudflare-ipfs.com/ipfs/${newimage.substr(7)}`
                        setEndedRaffleInfo(oldArr => [...oldArr ,{name, image, tokenId, winner}]);
        
                        // console.log(newimage);
                    }
                    catch(err){
                        const image = "";
                        setEndedRaffleInfo(oldArr => [...oldArr ,{name, image, tokenId, winner}]);

                    }
        

                }

                else{
                    try{
                        const metadata = `https://cloudflare-ipfs.com/ipfs/${tokenURI.substr(7)}`;
                        // console.log(metadata);
                        const meta = await fetch(metadata , {
                            signal: AbortSignal.timeout(2000)
                          });
                        // console.log(meta);
                        const json = await meta.json();
                        const newimage = json["image"];
                        const image = `https://cloudflare-ipfs.com/ipfs/${newimage.substr(7)}`
                        setEndedRaffleInfo(oldArr => [...oldArr ,{name, image, tokenId, winner}]);
        
                        // console.log(newimage);
                    }
                    catch(err){
                        const image = ""
                        setEndedRaffleInfo(oldArr => [...oldArr ,{name, image, tokenId, winner}]);

                    }
        
                }

        }

      }
      catch(err){
        console.log(err);
      }
    }

    useEffect(()=>{
        fetchActive();
        fetchEnded();
    },[])

  return (
    <div className="w-[95%] max-md:w-[90%] mx-auto">
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
            <RaffleHighlights setShowBuyModal={setShowBuyModal} showRaffle={showRaffle} setShowRaffle={setShowRaffle} setButtonModalInfo={setButtonModalInfo} fetchActive={fetchActive} goToMyTickets={goToMyTickets} setSelectedRaffle={setSelectedRaffle} activeArr={activeRaffleInfo}/>
            <CurrentRaffles selected={selected} setSelected={setSelected} activeArr={activeRaffleInfo} endArr={endedRaffleInfo}/>
            <Footer/>
        </>}

    </div>
  )
}

export default Raffle