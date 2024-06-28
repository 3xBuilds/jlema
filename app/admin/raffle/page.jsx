"use client"
import React, { useEffect, useState } from 'react'
import { contractAdds } from '@/utils/contractAdds';
import abi from "@/utils/abis/jlemaRaffle"
import erc721abi from "@/utils/abis/erc721abi"
import { ethers } from 'ethers';
import axios from 'axios';
import { AiOutlineLoading } from "react-icons/ai";
import { useAccount } from 'wagmi';
import ActiveRaffle from '@/components/admin/activeRaffle';
import { useGlobalContext } from '@/context/MainContext';


const RaffleAdmin = () => {

    const {address} = useAccount();
    const {openModal, setOpenModal} = useGlobalContext()

    const [modalItem, setModalItem] = useState(null);
    const [selected, setSelected] = useState(0);
    const [active, setActive] = useState(0);
    const [ended, setEnded] = useState(0);

    const [contractAdd, setContractAdd] = useState("");
    const [tokenId, setTokenId] = useState(null);
    const [ticketPrice, setTicketPrice] = useState(null);
    const [tokenSelected, setTokenSelected] = useState("CLEAN")
    const [ticketAmount, setTicketAmount] = useState(null);
    const [ticketsPerWallet, setTicketsPerWallet] = useState(null);
    const [opensea, setOpensea] = useState("");

    const [loading, setLoading] = useState(false);

    const [activeRaffleInfo, setActiveRaffleInfo] = useState([])

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
      if(address.toUpperCase() == "0X0000000000000000000000000000000000000000"){
        const contract = new ethers.Contract(contractAdd, erc721abi, signer);
        return contract
      }

      else{
        const contract = new ethers.Contract(address, erc721abi, signer)
        return contract;

      }
    }
    catch(err){
      console.log(err);
    }
  }

async function approval(){

    try {
    setLoading(true);
    const contract = await setERC721Contract("0X0000000000000000000000000000000000000000");
    const approval = await contract?.approve(contractAdds.JlemaRaffle, tokenId);

    approval.wait().then((res)=>{
        createRaffle();

    });


    }
    catch (err) {
    console.log("Error", err)
    setLoading(false);
    

}}

    async function createRaffle(){
        try{
            if(contractAdd!="" && tokenId && ticketPrice && ticketAmount && ticketsPerWallet && opensea != ""){
                const contract = await contractSetup();

                if(tokenSelected == "CLEAN"){
                    const txn = await contract.setRaffleItem(active, contractAdd, ticketsPerWallet, opensea, tokenId, ticketAmount, ticketPrice, 0);
                    txn.wait().then((res)=>{setLoading(false); window.location.reload()} );
                }
                else{
                    const txn = await contract.setRaffleItem(active, contractAdd, ticketsPerWallet, opensea, tokenId, ticketAmount, 0, ticketPrice).then((res)=>{setLoading(false)})
                    txn.wait().then((res)=>{setLoading(false); window.location.reload()});
                }
            }
        }
        catch(err){
            setLoading(false);
            console.log(err);
        }
    }

    async function fetchActiveEnded(){
        setActiveRaffleInfo([]);
        const contract = await contractSetup();
         await contract.activeRaffles().catch((err)=>{console.log(err)});
        setActive(Number(await contract.activeRaffles()));
        setEnded(Number(await contract.endedRaffles()));
        console.log("hello");
        const active = await contract.fetchActiveRaffles();

        for(let i = 0; i<active.length; i++){
            const add = active[i][0];
            const tokenId = Number(active[i][1]);

            const totalEntrants = Number(active[i][2]);
            const ticketsSold = Number(active[i][3]);
            const ticketLimit = Number(active[i][4]);
            const walletHolding = Number(active[i][5]);
            const ticketLimitPerWallet = Number(active[i][6]);
            const raffleEntryCleanCost = Number(active[i][7]);
            const raffleEntryMaticCost = Number(active[i][8]);
            const collectionLink = active[i][9];

            const contract = await setERC721Contract(add);
            const tokenURI = await contract.tokenURI(tokenId);
            const name = await contract.name();
            // console.log(tokenURI)

            if(tokenURI[0] == "h"){
                    try{
                        const metadata = tokenURI;
    
                        const meta = await fetch(metadata , {
                            signal: AbortSignal.timeout(1000)
                          });
                        const json = await meta.json();
                        const image = json["image"];
                        const newimage = `https://cloudflare-ipfs.com/ipfs/${image.substr(7)}`
                        setActiveRaffleInfo(oldArr => [...oldArr ,{name, newimage, add, tokenId, totalEntrants, ticketsSold, ticketLimit, walletHolding, ticketLimitPerWallet, raffleEntryCleanCost, raffleEntryMaticCost, collectionLink}]);
        
                        // console.log(newimage);
                    }
                    catch(err){
                        const image = "";
                        setActiveRaffleInfo(oldArr => [...oldArr ,{name, image, add, tokenId, totalEntrants, ticketsSold, ticketLimit, walletHolding, ticketLimitPerWallet, raffleEntryCleanCost, raffleEntryMaticCost, collectionLink}]);

                    }
        

                }

                else{
                    try{
                        const metadata = `https://cloudflare-ipfs.com/ipfs/${tokenURI.substr(7)}`;
                        // console.log(metadata);
                        const meta = await fetch(metadata , {
                            signal: AbortSignal.timeout(1000)
                          });
                        // console.log(meta);
                        const json = await meta.json();
                        const image = json["image"];
                        const newimage = `https://cloudflare-ipfs.com/ipfs/${image.substr(7)}`
                        setActiveRaffleInfo(oldArr => [...oldArr ,{name, newimage, add, tokenId, totalEntrants, ticketsSold, ticketLimit, walletHolding, ticketLimitPerWallet, raffleEntryCleanCost, raffleEntryMaticCost, collectionLink}]);
        
                        // console.log(newimage);
                    }
                    catch(err){
                        const image = ""
                        setActiveRaffleInfo(oldArr => [...oldArr ,{name, image, add, tokenId, totalEntrants, ticketsSold, ticketLimit, walletHolding, ticketLimitPerWallet, raffleEntryCleanCost, raffleEntryMaticCost, collectionLink}]);

                    }
        
                }
        
        }
    }

    useEffect(()=>{
        fetchActiveEnded();
    },[])

  return (
    <div className='grid grid-cols-12 '>
        <div className=' col-span-2 border-r-[1px] border-jel-gray-3 h-screen flex flex-col gap-2 items-center justify-start pt-20 p-4'>
            <div onClick={()=>{setSelected(0)}} className={`w-full h-12 flex items-center justify-start px-5 font-medium rounded-lg ${ selected==0 ? "bg-jel-gray-1 text-black" : "text-jel-gray-4"} cursor-pointer`}>Overview</div>
            <div onClick={()=>{setSelected(1)}} className={`w-full h-12 flex items-center justify-start px-5 font-medium rounded-lg ${ selected==1 ? "bg-jel-gray-1 text-black" : "text-jel-gray-4"} cursor-pointer`}>Add new raffle</div>
        </div>


        {selected==0 ? <div className='relative col-span-10  p-10 pt-20 w-full'>
            <div className='grid grid-cols-3 gap-5 w-full'>
                <div className=' border-[1px] border-jel-gray-3 rounded-lg w-full h-24 p-5 px-10 flex flex-col items-start justify-center'>
                    <h3 className='text-sm text-jel-gray-4'>Total Raffles</h3>
                    <h3 className='text-2xl font-semibold'>{active+ended}</h3>
                </div>
                <div className=' border-[1px] border-jel-gray-3 rounded-lg w-full h-24 p-5 px-10 flex flex-col items-start justify-center'>
                    <h3 className='text-sm text-jel-gray-4'>Total Active Raffles</h3>
                    <h3 className='text-2xl font-semibold'>{active}</h3>
                </div>
                <div className=' border-[1px] border-jel-gray-3 rounded-lg w-full h-24 p-5 px-10 flex flex-col items-start justify-center'>
                    <h3 className='text-sm text-jel-gray-4'>Total Ended Raffles</h3>
                    <h3 className='text-2xl font-semibold'>{ended}</h3>
                </div>
            </div>
            <div className='p-10 text-center'>
                <div className="bg-jel-gray-2 grid border-2 text-md border-jel-gray-3 grid-flow-col grid-cols-10 py-4 rounded-t-xl text-jel-gray-4 px-6">
                    <h2 className=' text-left col-span-4'>Raffles</h2>
                    <h2 className='col-span-2'>Tickets Remaining</h2>
                    <h2 className='col-span-1'>Participants</h2>
                    <h2 className='col-span-1'>Status</h2>
                    <h2 className='col-span-2'>Actions</h2>
                </div>
                {openModal && <ActiveRaffle obj = {activeRaffleInfo[modalItem]} index={modalItem} />}
                {activeRaffleInfo.map((item, i)=>(
                    <div className=" grid grid-flow-col border-x-2 border-b-2 border-jel-gray-2 text-sm grid-cols-10 py-4 text-jel-gray-4 px-6">
                        <h2 className=' text-left col-span-4'>{item.name} #{item.tokenId}</h2>
                        <h2 className='col-span-2'>{item.ticketLimit-item.ticketsSold}/{item.ticketLimit}</h2>
                        <h2 className='col-span-1'>{item.totalEntrants}</h2>
                        <h2 className=' text-green-400 font-bold col-span-1'>Live</h2>
                        <button onClick={()=>{setOpenModal(true); setModalItem(i)}} className='col-span-2 text-indigo-700 underline'>View</button>
               
               </div>
                ))}
            </div>
        </div>:
        
        <div className=' col-span-10  p-10 pt-20 w-full'>
            
            {loading && <div className='w-screen h-screen bg-black/10 flex items-center justify-center gap-8 flex-col fixed top-0 left-0 z-50 '>
                <AiOutlineLoading className='text-6xl text-black animate-spin'/>
                Loading...
                </div>}
            <h1 className='font-bold text-black text-3xl'>New Raffle</h1>
            <div className='grid grid-cols-7 gap-5 mt-10 w-[70%]'>
                <div className=' col-span-3'>
                    <h2 className='mb-2 text-sm '>NFT contract address</h2>
                    <input onChange={(e)=>{setContractAdd(e.target.value)}} value={contractAdd} type='text' placeholder='Contract Address' className='w-full h-12 outline-black border-[1px] border-jel-gray-3 rounded-lg px-5'/>
                </div>
                <div className=' col-span-3'>
                    <h2 className='mb-2 text-sm '>Token ID</h2>
                    <input onChange={(e)=>{setTokenId(e.target.value)}} value={tokenId} type='text' placeholder='Token ID' className='w-full h-12 outline-black border-[1px] border-jel-gray-3 rounded-lg px-5'/>
                </div>
                <div className='w-full h-full flex items-end'>
                    <button className=' w-full py-3 font-medium rounded-lg bg-jel-gray-1 hover:bg-jel-gray-2'>Check</button>
                </div>

                <div className=' col-span-3'>
                    <h2 className='mb-2 text-sm '>Ticket Price</h2>
                    <input onChange={(e)=>{setTicketPrice(e.target.value)}} value={ticketPrice} type='text' placeholder='Ticket Price' className='w-full h-12 outline-black border-[1px] border-jel-gray-3 rounded-lg px-5'/>
                </div>
                <div className=' col-span-3'>
                    <h2 className='mb-2 text-sm '>Token</h2>
                    <select className='w-full h-12 font-medium outline-black border-[1px] border-jel-gray-3 rounded-lg px-5'>
                        <option onClick={()=>{setTokenSelected("CLEAN")}} value='ETH'>CLEAN</option>
                        <option onClick={()=>{setTokenSelected("MATIC")}} value='BNB'>MATIC</option>
                    </select> 
                </div>
                <div className=' col-span-3'>
                    <h2 className='mb-2 text-sm '>Amount of tickets</h2>
                    <input onChange={(e)=>{setTicketAmount(e.target.value)}} value={ticketAmount} type='text' placeholder='Amount of tickets' className='w-full h-12 outline-black border-[1px] border-jel-gray-3 rounded-lg px-5'/>
                </div>
                <div className=' col-span-3'>
                    <h2 className='mb-2 text-sm '>Tickets per wallet</h2>
                    <input onChange={(e)=>{setTicketsPerWallet(e.target.value)}} value={ticketsPerWallet} type='text' placeholder='Tickets per wallet' className='w-full h-12 outline-black border-[1px] border-jel-gray-3 rounded-lg px-5'/>
                </div>
                <div className=' col-span-6'>
                    <h2 className='mb-2 text-sm '>Opensea URL</h2>
                    <input onChange={(e)=>{setOpensea(e.target.value)}} value={opensea} type='text' placeholder='Opensea URL' className='w-full h-12 outline-black border-[1px] border-jel-gray-3 rounded-lg px-5'/>
                </div>
                {/* <div className=' col-span-6'>
                    <h2 className='mb-2 text-sm '>Raffle Image</h2>
                        <label for="dropzone-file" class="flex flex-col items-center justify-center w-40 h-40 border-2 border-jel-gray-3 border-dashed rounded-lg cursor-pointer hover:bg-jel-gray-1">
                            <div class="flex flex-col items-center justify-center pt-5 pb-6">
                                <svg class="w-8 h-8 text-jel-gray-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 16">
                                    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"/>
                                </svg>
                            </div>
                            <input id="dropzone-file" type="file" class="hidden" />
                        </label>
                </div> */}
                <div></div>
                <button onClick={approval} className=' col-span-2 w-32 py-3 font-medium text-white rounded-xl hover:-translate-y-[0.3rem] duration-200 bg-black text-nowrap'>Create raffle</button>


            </div>
        </div>
        }
    </div>
  )
}

export default RaffleAdmin
