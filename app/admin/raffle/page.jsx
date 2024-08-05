"use client"
import React, { useEffect, useState } from 'react'
import { contractAdds } from '@/utils/contractAdds';
import abi from "@/utils/abis/jlemaRaffle"
import erc721abi from "@/utils/abis/erc721abi"
import Image from 'next/image';
import { ethers } from 'ethers';
import axios from 'axios';
import { AiOutlineLoading } from "react-icons/ai";
import { useAccount } from 'wagmi';
import ActiveRaffle from '@/components/admin/activeRaffle';
import { useGlobalContext } from '@/context/MainContext';


const RaffleAdmin = () => {

    const {address} = useAccount();

    useEffect(()=>{
        if(address?.toUpperCase() == "0xdb278b793ddb8670373812db721301778e40fc32".toUpperCase()){
            setAdmin(true);
        }
    },[address])

    const [admin, setAdmin] = useState(false);

    const {openModal, setOpenModal} = useGlobalContext()
    const[endedRaffleInfo, setEndedRaffleInfo] = useState([]);
    const [modalItem, setModalItem] = useState(null);
    const [selected, setSelected] = useState(0);
    const [active, setActive] = useState(0);
    const [ended, setEnded] = useState(0);
    const [tokenID, setTokenID] = useState(0);

    // const [contractAdd, setContractAdd] = useState("");
    // const [tokenId, setTokenId] = useState(null);
    const [ticketPrice, setTicketPrice] = useState(null);
    const [tokenSelected, setTokenSelected] = useState("CLEAN")
    const [ticketAmount, setTicketAmount] = useState(null);
    const [ticketsPerWallet, setTicketsPerWallet] = useState(null);
    const [opensea, setOpensea] = useState("");

    const [loading, setLoading] = useState(false);

    useEffect(()=>{
        setTokenID(Number(opensea.split("/")[6]));
        console.log("tokeeeen: ", (Number(opensea.split("/")[6])));
    },[opensea])

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

        const contractAdd = opensea.split("/")[5];
        const tokenId = Number(opensea.split("/")[6]);

        console.log(contractAdd, tokenId);

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

    async function approval(e){
        e.preventDefault();
        try {

        await handleSubmit();
            
        const tokenId = Number(opensea.split("/")[6]);

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
            if(ticketPrice && ticketAmount && ticketsPerWallet && opensea != ""){
                const contractAdd = opensea.split("/")[5];
                const tokenId = Number(opensea.split("/")[6]);

                console.log(contractAdd, tokenId);
                const contract = await contractSetup();

                if(tokenSelected == "CLEAN"){
                    const txn = await contract.setRaffleItem(active, contractAdd, ticketsPerWallet, opensea, tokenId, ticketAmount, ethers.utils.parseEther(String(ticketPrice)), 0);
                    txn.wait().then((res)=>{setLoading(false); window.location.reload()} );
                }
                else{
                    const txn = await contract.setRaffleItem(active, contractAdd, ticketsPerWallet, opensea, tokenId, ticketAmount, 0, ethers.utils.parseEther(String(ticketPrice)))
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
        try{

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
                const raffleEntryCleanCost = Number(ethers.utils.formatEther(active[i][7]));
                const raffleEntryMaticCost = Number(ethers.utils.formatEther(active[i][8]));
                const collectionLink = active[i][9];
    
                const contract = await setERC721Contract(add);

                const name = await contract.name();

                const image = "https://jlema-raffle-storage.s3.ap-south-1.amazonaws.com/raffles/Jlema_"+String(add).toLowerCase()+"_"+String(tokenId)

                setActiveRaffleInfo(oldArr => [...oldArr ,{name, image, add, tokenId, totalEntrants, ticketsSold, ticketLimit, walletHolding, ticketLimitPerWallet, raffleEntryCleanCost, raffleEntryMaticCost, collectionLink}]);
    
                
            
            }
        }

        catch(err){
            console.log(err);
        }
    }

    async function withdraw(){
        try{
            const contract = await contractSetup();
            await contract.withdraw().then((res)=>{
                console.log(res);
            })
        }
        catch(err){
            console.log(err);
        }
    }

    async function fetchEnded(){
        try{
        setEndedRaffleInfo([]);
          const contract = await contractSetup();
          const ended = await contract.fetchEndedRaffles();
          for(let i = 0; i<ended.length; i++){
            
            const add = ended[i][0];

            if(add.toUpperCase() != "0X0000000000000000000000000000000000000000"){
                const tokenId = Number(ended[i][1]);
                const winner = ended[i][2];
      
                const contract = await setERC721Contract(add);
                const image = "https://jlema-raffle-storage.s3.ap-south-1.amazonaws.com/raffles/Jlema_"+String(add).toLowerCase()+"_"+String(tokenId)

                  const name = await contract.name();
                  // console.log(tokenURI)

                  setEndedRaffleInfo(oldArr => [...oldArr ,{name, image, tokenId, winner}]);

      
            }
  
          }
  
        }
        catch(err){
          console.log(err);
        }
    }

    useEffect(()=>{
        fetchActiveEnded();
        fetchEnded();
    },[])


    // ------------------------[ File Uploading To S3 ]--------------------------

    const [file, setFile] = useState(null);
    const [uploading, setUploading] = useState(false);

    const handleFileChange = (e) => {
        setFile(e.target.files[0]);
    }

    const handleSubmit = async (e) => {
        // e.preventDefault();
        if (!file) return;
    
        setUploading(true);
        const contractAdd = opensea.split("/")[5];
        const customFileName = `Jlema_${contractAdd}_${tokenID}`;
        const customFile = new File([file], customFileName, { type: file.type });
    
        const formData = new FormData();
        formData.append("file", customFile);
    
        try {
            const response = await axios.post("/api/s3-upload", formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
    
            console.log(response?.data);
            setUploading(false);
        } catch (error) {
            console.log(error);
            setUploading(false);
        }
    };
    

    // ------------------------------------------------------------------------
    
// if(admin)
  return (
    <div className='grid grid-cols-12 '>
        <div className=' col-span-2 border-r-[1px] border-jel-gray-3 h-screen flex flex-col gap-2 items-center justify-start pt-20 p-4'>
            <div onClick={()=>{setSelected(0)}} className={`w-full h-12 flex items-center justify-start px-5 font-medium rounded-lg ${ selected==0 ? "bg-jel-gray-1 text-black" : "text-jel-gray-4"} cursor-pointer`}>Overview</div>
            <div onClick={()=>{setSelected(1)}} className={`w-full h-12 flex items-center justify-start px-5 font-medium rounded-lg ${ selected==1 ? "bg-jel-gray-1 text-black" : "text-jel-gray-4"} cursor-pointer`}>Add new raffle</div>
        </div>


        {selected==0 ? <div className='relative col-span-10  p-10 pt-20 w-full'>
            <div className='grid grid-cols-4 gap-5 w-full'>
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
                <button onClick={()=>{withdraw()}} className='bg-purple-600 rounded-xl w-full h-16 text-white text-2xl hover:-translate-y-1 duration-300 brightness-105 font-bold'>Withdraw</button>
            </div>
            <h2 className='text-jel-gray-4 font-bold text-2xl w-full text-left mt-5'>Live</h2>
            <div className='px-8 py-4 text-center '>
                <div className='border-[1px] border-jel-gray-2 rounded-2xl'>
                    <div className="bg-jel-gray-2 grid border-b-2 text-md border-jel-gray-3 grid-flow-col grid-cols-10 py-4 rounded-t-xl text-jel-gray-4 px-6">
                        <h2 className=' text-left col-span-4'>Raffles</h2>
                        <h2 className='col-span-2'>Tickets Remaining</h2>
                        <h2 className='col-span-2'>Participants</h2>

                        <h2 className='col-span-2'>Actions</h2>
                    </div>
                    {openModal && <ActiveRaffle obj = {activeRaffleInfo[modalItem]} index={modalItem} />}
                    
                    <div className='h-40 overflow-scroll'>
                    {activeRaffleInfo.map((item, i)=>(
                        <div className={`grid grid-flow-col border-b-2 border-jel-gray-2 ${i==activeRaffleInfo.length-1 && "rounded-b-2xl"} text-sm grid-cols-10 py-4 text-jel-gray-4 px-6`}>
                            <h2 className=' text-left col-span-4'>{item.name} #{item.tokenId}</h2>
                            <h2 className='col-span-2'>{item.ticketLimit-item.ticketsSold}/{item.ticketLimit}</h2>
                            <h2 className='col-span-2'>{item.totalEntrants}</h2>
                            {/* <h2 className=' text-green-400 font-bold col-span-1'>Live</h2> */}
                            <button onClick={()=>{setOpenModal(true); setModalItem(i)}} className='col-span-2 text-indigo-700 underline'>View</button>
                
                </div>
                    ))}
                    </div>
                </div>
            </div>

            <h2 className='text-jel-gray-4 font-bold text-2xl w-full text-left mt-5'>Ended</h2>
            <div className='px-8 py-4 text-center '>
                <div className='border-[1px] border-jel-gray-2 rounded-2xl'>
                    <div className="bg-jel-gray-2 grid border-b-2 text-md border-jel-gray-3 grid-flow-col grid-cols-2 py-4 rounded-t-xl text-jel-gray-4 px-6">
                        <h2 className=' text-left'>Raffles</h2>
                        <h2 className=''>Winners</h2>
                        
                    </div>
                    {openModal && <ActiveRaffle obj = {activeRaffleInfo[modalItem]} index={modalItem} />}
                    
                    <div className='h-40 overflow-scroll'>
                    {endedRaffleInfo.map((item, i)=>(
                        <div className={`grid grid-flow-col border-b-2 border-jel-gray-2 ${i==activeRaffleInfo.length-1 && "rounded-b-2xl"} text-sm grid-cols-2 py-4 text-jel-gray-4 px-6`}>
                            <h2 className=' text-left'>{item.name} #{item.tokenId}</h2>
                            <h2 className='text-sm text-center font-bold'>{item.winner}</h2>
                </div>
                    ))}
                    </div>
                </div>
            </div>
        </div>:
        
        <div className=' col-span-10  p-10 pt-20 w-full'>
            
            {loading && <div className='w-screen h-screen bg-black/20 flex items-center justify-center gap-8 flex-col fixed top-0 left-0 z-50 '>
                <AiOutlineLoading className='text-6xl text-black animate-spin'/>
                Please don't change the screen
                </div>}
            <h1 className='font-bold text-black text-3xl'>New Raffle</h1>
            <form onSubmit={handleSubmit} className='grid grid-cols-7 gap-5 mt-10 w-[70%]'>
                {/* <div className=' col-span-3'>
                    <h2 className='mb-2 text-sm '>NFT contract address</h2>
                    <input onChange={(e)=>{setContractAdd(e.target.value)}} value={contractAdd} type='text' placeholder='Contract Address' className='w-full h-12 outline-black border-[1px] border-jel-gray-3 rounded-lg px-5'/>
                </div>
                <div className=' col-span-3'>
                    <h2 className='mb-2 text-sm '>Token ID</h2>
                    <input onChange={(e)=>{setTokenId(e.target.value)}} value={tokenId} type='text' placeholder='Token ID' className='w-full h-12 outline-black border-[1px] border-jel-gray-3 rounded-lg px-5'/>
                </div> */}
                {/* <div className='w-full h-full flex items-end'>
                    <button className=' w-full py-3 font-medium rounded-lg bg-jel-gray-1 hover:bg-jel-gray-2'>Check</button>
                </div> */}

                <div className=' col-span-3'>
                    <h2 className='mb-2 text-sm '>Ticket Price</h2>
                    <input onChange={(e)=>{setTicketPrice(e.target.value)}} value={ticketPrice} type='text' placeholder='Ticket Price' className='w-full h-12 outline-black border-[1px] border-jel-gray-3 rounded-lg px-5'/>
                </div>
                <div className=' col-span-3'>
                    <h2 className='mb-2 text-sm '>Token</h2>
                    <select onChange={(e)=>{setTokenSelected(e.target.value)}} className='w-full h-12 font-medium outline-black border-[1px] border-jel-gray-3 rounded-lg px-5'>
                        <option value='CLEAN'>CLEAN</option>
                        <option value='MATIC'>MATIC</option>
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
                <div className=' col-span-6'>
                    <h2 className='mb-2 text-sm '>Raffle Image</h2>

                    <div>
                        <label for="dropzone-file" class="flex flex-col items-center justify-center w-40 h-40 border-2 border-jel-gray-3 border-dashed rounded-lg cursor-pointer hover:bg-jel-gray-1">
                            <div class="flex flex-col items-center h-full w-full p-2 overflow-hidden justify-center rounded-lg">
                                {!file ? <svg class="w-8 h-8 text-jel-gray-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 16">
                                    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"/>
                                </svg>:
                                <Image className='w-ful h-full object-cover rounded-md hover:scale-110 hover:opacity-30 duration-300' width={1000} height={1000} src={!file ? "" : (file instanceof File ? URL.createObjectURL(file) : file)}/>}
                            </div>
                            <input id="dropzone-file" type="file" accept='image/*' onChange={handleFileChange} class="hidden" />
                        </label>
                        {/* <button onClick={handleSubmit} disabled={uploading} className=' col-span-2 w-32 py-2 font-medium text-black rounded-xl hover:-translate-y-[0.3rem] duration-200 bg-jel-gray-3 hover:bg-jel-gray-2 text-nowrap mt-2'>{uploading ? "Uploading..." : "Upload"}</button> */}
                    </div>

                </div>
                <div></div>
                
                <button onClick={approval} className=' col-span-2 w-32 py-3 font-medium text-white rounded-xl hover:-translate-y-[0.3rem] duration-200 bg-black text-nowrap'>Create raffle</button>


            </form>
        </div>
        }
    </div>
  )

}

export default RaffleAdmin
