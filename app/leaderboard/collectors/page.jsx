"use client"
import Image from "next/image";
import twitter from "@/assets/icons/tweet.png"
import searchIcon from "@/assets/icons/search.svg"
import axios from "axios";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Footer from "@/components/Footer";
import defImg from "@/assets/defImg.png"
import { useAccount } from "wagmi";

const extractUsername = (input) => {
    if (!input) return '';
    // Remove URL prefix if present
    const urlRegex = /https?:\/\/(www\.)?(x\.com|twitter\.com)\//i;
    if (urlRegex.test(input)) {
      input = input.replace(urlRegex, '');
    }
    // Remove '@' prefix if present
    if (input.startsWith('@')) {
      input = input.substring(1);
    }
    return input;
  };

const Collectors = () => {

    const [leaderboard, setLeaderboard] = useState();
    const [search, setSearch] = useState();
    const router = useRouter();
    const {address, isConnected} = useAccount();
    const handleSearch = (e) => {
        setSearch(e.target.value);
    }

    const filterArray = (leaderboard, searchTerm) => {
        if (!searchTerm) {
          return leaderboard;
        }
      
        const lowercaseSearchTerm = searchTerm.toLowerCase();
        return leaderboard.filter((holder) => {
          const lowercaseWallet = holder.wallet?.toLowerCase();
          const lowercaseUsername = holder.username?.toLowerCase();
      
          return lowercaseWallet?.includes(lowercaseSearchTerm) || lowercaseUsername?.includes(lowercaseSearchTerm);
        });
      };

    const getLeaderboard = async () => {
        try{
        const res = await axios.get("/api/leaderboard");
        setLeaderboard(res.data.leaderboard);
        }
        catch(err){
        console.log(err);
        }
    }

    const filteredLeaderboard = filterArray(leaderboard, search);

    useEffect(()=>{
        getLeaderboard();
    }, [])

    useEffect(()=>{
      if(!isConnected){
        router.push("/")
      }
    },[address])

    return (
        <>
        <div className="w-[97%] max-md:w-[90%] mx-auto min-h-[76vh]">
            <div className="mt-24 flex flex-row items-center justify-between">
                <div className="">
                    <h1 className="font-bold text-black text-2xl">Collectors</h1>
                    <h2 className="font-normal text-jel-gray-4 text-base">
                        Discover the Jlema collectors.
                    </h2>
                </div>
                <div className="group relative h-12 w-96 max-md:hidden">
                    <input type="text" className="w-full h-full border-[1px] border-jel-gray-3 rounded-xl text-base font-normal text-black placeholder:text-jel-gray-4 placeholder:opacity-50 outline-black  pl-4 pr-10" placeholder="Search by username or wallet address" onChange={handleSearch} value={search}/>
                    <Image src={searchIcon} width={100} height={100} className="w-5 h-5 absolute -translate-y-1/2 top-1/2 right-4"/>
                </div>
                <Image src={searchIcon} width={100} height={100} className=" md:hidden w-5 h-5 mx-2"/>
            </div>
            <div className="w-full h-[1px] bg-jel-gray-3 my-4"></div>
            <div className=" grid grid-cols-19 max-md:hidden">

                {/* Header */}
                <div className=" col-span-1 border-b-[1px] pb-3 border-jel-gray-3 px-2"><h3 className="text-center font-normal text-sm text-jel-gray-4">Rank</h3></div>
                <div className=" col-span-5 border-b-[1px] pb-3 border-jel-gray-3 px-2"><h3 className="text-left font-normal text-sm text-jel-gray-4">Collector</h3></div>
                <div className=" col-span-2 border-b-[1px] pb-3 border-jel-gray-3 px-2"><h3 className="text-center font-normal text-sm text-jel-gray-4">Total Jlema</h3></div>
                <div className=" col-span-3 border-b-[1px] pb-3 border-jel-gray-3 px-2"><h3 className="text-center font-normal text-sm text-jel-gray-4">Total Jlema Legendary</h3></div>
                <div className=" col-span-3 border-b-[1px] pb-3 border-jel-gray-3 px-2"><h3 className="text-center font-normal text-sm text-jel-gray-4">Total Special Editions</h3></div>
                <div className=" col-span-3 border-b-[1px] pb-3 border-jel-gray-3 px-2"><h3 className="text-center font-normal text-sm text-jel-gray-4">Badges</h3></div>
                <div className=" col-span-2 border-b-[1px] pb-3 border-jel-gray-3 px-2"><h3 className="text-center font-normal text-sm text-jel-gray-4">Points</h3></div>

        </div>
              <div className=" w-full max-sm:hidden">
                  {filteredLeaderboard?.map((holder)=>(
                  <div className="w-full grid grid-cols-19 hover:bg-jel-gray-3 rounded-xl duration-200">
                  <div onClick={()=>{router.push(`/profile/${holder?.username}`)}} className=" cursor-pointer col-span-1 flex items-center justify-center"><h3 className=" font-semibold text-base text-black">{holder?.rank}</h3></div>
                  <div onClick={()=>{router.push(`/profile/${holder?.username}`)}} className=" cursor-pointer col-span-5 flex flex-row justify-start items-center p-2">
                      <div className="border-[1px] overflow-hidden rounded-md border-jel-gray-3 w-16 h-16 aspect-square">
                      <Image src={holder?.dp == null ? defImg : holder.dp} width={300} height={300} className=" object-contain w-full h-full"/>
                      </div>
                      <div className="pl-2">
                      <h3 className="text-black  font-semibold text-base "> {holder?.username} </h3>
                      <h3 className=" text-jel-gray-4  font-normal text-sm flex flex-row gap-1 items-center justify-center "> <span> <Image src={twitter} className="w-4 opacity-70"/> </span> {extractUsername(holder?.twitter)} </h3>
                      </div>
                  </div>
                  <div onClick={()=>{router.push(`/profile/${holder?.username}`)}} className=" cursor-pointer col-span-2 flex items-center justify-center"><h3 className=" font-semibold text-base text-black">{holder?.jlema || "--"}</h3></div>
                  <div onClick={()=>{router.push(`/profile/${holder?.username}`)}} className=" cursor-pointer col-span-3 flex items-center justify-center"><h3 className=" font-semibold text-base text-black">{holder?.jlemalegendary || "--"}</h3></div>
                  <div onClick={()=>{router.push(`/profile/${holder?.username}`)}} className=" cursor-pointer col-span-3 flex items-center justify-center"><h3 className=" font-semibold text-base text-black">{holder?.specialEdition || "--"}</h3></div>
                  <div onClick={()=>{router.push(`/profile/${holder?.username}`)}} className=" cursor-pointer col-span-3 flex items-center justify-center"><h3 className=" font-semibold text-base text-black">{holder?.badges.length || "--"}</h3></div>
                  <div onClick={()=>{router.push(`/profile/${holder?.username}`)}} className=" cursor-pointer col-span-2 flex items-center justify-center"><h3 className=" font-semibold text-base text-black">{holder?.points || "--"}</h3></div>
                  </div>
                  ))}
                {
                    filteredLeaderboard?.length==0 && <div className=" col-span-full flex items-center justify-center"><h3 className=" font-semibold text-lg text-jel-gray-4 opacity-60 mt-10">No results found</h3></div>
                }

              </div>
            


            {/* </div> */}

            {/* Mobile View*/}
            <div className="grid grid-cols-10 max-md:col-span-full h-fit md:hidden">
                <div className=" col-span-1 border-b-[1px] pb-3 border-jel-gray-3 px-2 max-md:hidden"><h3 className="text-center font-normal text-sm text-jel-gray-4 ">Rank</h3></div>
                <div className=" col-span-1 border-b-[1px] pb-3 border-jel-gray-3 md:hidden"><h3 className=" font-normal text-sm text-jel-gray-4 text-left">#</h3></div>
                <div className=" col-span-7 border-b-[1px] pb-3 border-jel-gray-3 px-2"><h3 className="text-left font-normal text-sm text-jel-gray-4">Collector</h3></div>
                <div className=" col-span-2 border-b-[1px] pb-3 border-jel-gray-3 px-2"><h3 className="text-center font-normal text-sm text-jel-gray-4 max-md:text-right">Points</h3></div>
            </div>

            {filteredLeaderboard?.map((holder)=>(
            <div onClick={()=>{router.push(`/profile/${holder?.username}`)}} className="col-span-10 grid grid-cols-10 hover:cursor-crosshair duration-100 hover:bg-black/10 md:hidden">
              <div  className="col-span-1 flex items-center justify-center max-md:justify-start"><h3 className=" font-semibold text-base text-black">{holder?.rank}</h3></div>
              <div className="col-span-7 flex flex-row justify-start items-center p-2">
                <div className="border-[1px] overflow-hidden rounded-md border-jel-gray-3 w-16 h-16 aspect-square">
                  <Image src={holder?.dp == null ? defImg : holder.dp} width={300} height={300} className=" object-contain w-full h-full"/>
                </div>
                <div className="pl-2">
                  <h3 className="text-black  font-semibold text-base "> {holder?.username} </h3>
                  <h3 className=" text-jel-gray-4  font-normal text-sm flex flex-row gap-1 items-center justify-center "> <span> <Image src={twitter} className="w-4 opacity-70"/> </span> {extractUsername(holder?.twitter)} </h3>
                </div>
              </div>
              <div className="col-span-2 flex items-center justify-center max-md:justify-end"><h3 className=" font-semibold text-base text-black max-md:text-right">{holder?.points || "--"}</h3></div>
            </div>
            ))}

        

        </div>
        <Footer/>
    </>
    )
}

export default Collectors