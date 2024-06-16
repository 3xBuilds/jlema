"use client";
import Image from "next/image";
// import { useRouter } from "next/navigation";

import nft1 from "@/assets/nft1.png";
import twitter from "@/assets/icons/tweet.png"
import image from "@/assets/icons/imagebadge.png";
import axios from "axios";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { IoLogoDiscord, IoLogoTwitter } from "react-icons/io5";
import { FaDiscord } from "react-icons/fa";

const Leaderboard = () => {

  const [leaderboard, setLeaderboard] = useState();
  const router = useRouter();

  const getLeaderboard = async () => {
    try{
      const res = await axios.get("/api/leaderboard");
      setLeaderboard(res.data.leaderboard);
    }
    catch(err){
      console.log(err);
    }

  }

  useEffect(()=>{
    getLeaderboard();
  }, [])

  return (
    <div className="w-[97%] max-md:w-[90%] mx-auto">
      <div className="mt-24">
        <h1 className="font-bold text-black text-2xl max-md:text-xl">Leaderboard</h1>
        <h2 className="font-normal text-jel-gray-4 text-base max-md:text-sm">
          Discover the top Jlema collectors by points owned.
        </h2>
      </div>
      <div className="w-full h-[1px] bg-jel-gray-3 my-4"></div>
      <div className="grid grid-cols-3 gap-4 h-96 max-md:hidden">
      {leaderboard?.map((holder, i)=>(

          <TopperCard holder={holder} ind = {i}/>

      ))}
      </div>
      <div className="md:hidden w-full overflow-scroll noscr">
      <div className="flex flex-row gap-5 h-96 w-[1000px]">
      {leaderboard?.map((holder, i)=>(

          <TopperCard holder={holder} ind = {i}/>

      ))}
      </div>
      </div>
      <div className="mt-10 flex flex-row justify-between items-center">
        <h1 className="font-bold text-black text-2xl">Community</h1>
        <button onClick={()=>{router.push("/leaderboard/collectors")}} className='px-6 py-2 text-black cursor-pointer bg-jel-gray-3 hover:bg-jel-gray-2 duration-200 rounded-xl'>View All</button>
      </div>
      <div className="grid grid-cols-2 gap-4 mt-5">
        <div className="grid grid-cols-10 max-md:col-span-full h-fit">

          {/* Header */}
          <div className=" col-span-1 border-b-[1px] pb-3 border-jel-gray-3 px-2 max-md:hidden"><h3 className="text-center font-normal text-sm text-jel-gray-4 ">Rank</h3></div>
          <div className=" col-span-1 border-b-[1px] pb-3 border-jel-gray-3 md:hidden"><h3 className=" font-normal text-sm text-jel-gray-4 text-left">#</h3></div>
          <div className=" col-span-5 border-b-[1px] pb-3 border-jel-gray-3 px-2"><h3 className="text-left font-normal text-sm text-jel-gray-4">Collector</h3></div>
          <div className=" col-span-1 border-b-[1px] pb-3 border-jel-gray-3 px-2 "><h3 className="text-center font-normal text-sm text-jel-gray-4 max-md:hidden">Badges</h3></div>
          <div className=" col-span-3 border-b-[1px] pb-3 border-jel-gray-3 px-2"><h3 className="text-center font-normal text-sm text-jel-gray-4 max-md:text-right">Points</h3></div>
        
          {leaderboard?.slice(0,5)?.map((holder)=>(
            <div onClick={()=>{router.push(`/profile/${holder?.username}`)}} className="col-span-10 grid grid-cols-10 hover:cursor-crosshair duration-100 hover:bg-black/10 max-md:hidden">
              <div  className="col-span-1 flex items-center justify-center max-md:justify-start"><h3 className=" font-semibold text-base text-black">{holder?.rank}</h3></div>
              <div className="col-span-5 flex flex-row justify-start items-center p-2">
                <div className="border-[1px] overflow-hidden rounded-md border-jel-gray-3 w-16 h-16 aspect-square">
                  <Image src={holder?.dp} width={300} height={300} className=" object-contain w-full h-full"/>
                </div>
                <div className="pl-2">
                  <h3 className="text-black  font-semibold text-base "> {holder?.username} </h3>
                  <h3 className=" text-jel-gray-4  font-normal text-sm flex flex-row gap-1 items-center justify-center "> <span> <Image src={twitter} className="w-4 opacity-70"/> </span> {holder?.twitter} </h3>
                </div>
              </div>
              <div className="col-span-1 flex items-center justify-center"><h3 className=" font-semibold text-base text-black max-md:hidden">{holder?.badges}</h3></div>
              <div className="col-span-3 flex items-center justify-center max-md:justify-end"><h3 className=" font-semibold text-base text-black max-md:text-right">{holder?.points}</h3></div>
            </div>
            ))}

            {leaderboard?.slice(0,10)?.map((holder)=>(
            <div onClick={()=>{router.push(`/profile/${holder?.username}`)}} className="col-span-10 grid grid-cols-10 hover:cursor-crosshair duration-100 hover:bg-black/10 md:hidden">
              <div  className="col-span-1 flex items-center justify-center max-md:justify-start"><h3 className=" font-semibold text-base text-black">{holder?.rank}</h3></div>
              <div className="col-span-5 flex flex-row justify-start items-center p-2">
                <div className="border-[1px] overflow-hidden rounded-md border-jel-gray-3 w-16 h-16 aspect-square">
                  <Image src={holder?.dp} width={300} height={300} className=" object-contain w-full h-full"/>
                </div>
                <div className="pl-2">
                  <h3 className="text-black  font-semibold text-base "> {holder?.username} </h3>
                  <h3 className=" text-jel-gray-4  font-normal text-sm flex flex-row gap-1 items-center justify-center "> <span> <Image src={twitter} className="w-4 opacity-70"/> </span> {holder?.twitter} </h3>
                </div>
              </div>
              <div className="col-span-1 flex items-center justify-center"><h3 className=" font-semibold text-base text-black max-md:hidden">{holder?.badges}</h3></div>
              <div className="col-span-3 flex items-center justify-center max-md:justify-end"><h3 className=" font-semibold text-base text-black max-md:text-right">{holder?.points}</h3></div>
            </div>
            ))}
        
        </div>
        <div className="grid grid-cols-10 h-fit max-md:hidden">

          {/* Header */}
          <div className=" col-span-1 border-b-[1px] pb-3 border-jel-gray-3 px-2"><h3 className="text-center font-normal text-sm text-jel-gray-4">Rank</h3></div>
          <div className=" col-span-5 border-b-[1px] pb-3 border-jel-gray-3 px-2"><h3 className="text-left font-normal text-sm text-jel-gray-4">Collector</h3></div>
          <div className=" col-span-1 border-b-[1px] pb-3 border-jel-gray-3 px-2"><h3 className="text-center font-normal text-sm text-jel-gray-4">Badges</h3></div>
          <div className=" col-span-3 border-b-[1px] pb-3 border-jel-gray-3 px-2"><h3 className="text-center font-normal text-sm text-jel-gray-4">Points</h3></div>
        
          {leaderboard?.slice(6,10)?.map((holder)=>(
            <div onClick={()=>{router.push(`/profile/${holder?.username}`)}} className="col-span-10 grid grid-cols-10 hover:cursor-crosshair duration-100 hover:bg-black/10">
              <div className="col-span-1 flex items-center justify-center"><h3 className=" font-semibold text-base text-black">{holder?.rank}</h3></div>
              <div className="col-span-5 flex flex-row justify-start items-center p-2">
                <div className="border-[1px] overflow-hidden rounded-md border-jel-gray-3 w-16 h-16 aspect-square">
                  <Image src={holder?.dp} width={300} height={300} className=" object-contain w-full h-full"/>
                </div>
                <div className="pl-2">
                  <h3 className="text-black  font-semibold text-base "> {holder?.username} </h3>
                  <h3 className=" text-jel-gray-4  font-normal text-sm flex flex-row gap-1 items-center justify-center "> <span> <Image src={twitter} className="w-4 opacity-70"/> </span> {holder?.twitter} </h3>
                </div>
              </div>
              <div className="col-span-1 flex items-center justify-center"><h3 className=" font-semibold text-base text-black">{holder?.badges}</h3></div>
              <div className="col-span-3 flex items-center justify-center"><h3 className=" font-semibold text-base text-black">{holder?.points}</h3></div>
            </div>
            ))}
        
        </div>
      </div>
      <div className="flex flex-row max-md:flex-col max-md:items-start max-md:justify-start max-md:px-0 items-center justify-between px-10 border-t-[1px] border-jel-gray-3 py-5 mt-10">
        <h3 className="text-sm text-black">©2024 Jlema. All Rights Reserved.</h3>
        <div className="flex flex-row items-center gap-8 max-md:mt-2">
          <IoLogoTwitter className=" text-xl"/>
          <FaDiscord className=" text-xl"/>
        </div>
      </div> 
    </div>
  );
};

const TopperCard = ({holder, ind}) => {
  const router = useRouter();
  if(ind < 3)
    return(
        <div onClick={()=>{router.push(`/profile/${holder?.username}`)}} className="border-[1px] hover:cursor-cell border-jel-gray-3 rounded-xl flex items-end justify-center overflow-hidden relative">
          <Image src={holder?.dp} width={1000} height={1000} className=" h-full object-contain" />
          <div className="absolute bottom-0 left-0 bg-gradient-to-t from-white via-transparent to-transparent z-10 w-full h-full"></div>
          <h3 className="text-black top-4 left-5 font-semibold text-lg absolute z-20">
            #{holder.rank}
          </h3>

          <div className="absolute top-4 right-5 w-40 m flex flex-row justify-end">
            {/* holder.badges is a number map the following that many times accorign to tha number */}
            {Array(holder.badges)?.fill()?.slice(0,4)?.map((_, i) => (<>
            <div className="relative group">
              <div className="absolute opacity-0 duration-300 w-20 z-50 left-1/2 -translate-x-1/2 -top-8 flex flex-col items-center justify-center">
                <svg
                  width="10"
                  height="5"
                  viewBox="0 0 10 5"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M5 5L0 0L10 0L5 5Z" fill="white" />
                </svg>
              </div>
              <div className="w-10 h-10 -ml-2 cursor-pointer bg-white text-jel-gray-4 rounded-full shadow-jel-badge flex items-center justify-center">
                <Image src={image} className="w-4" />
              </div>
            </div>
            
            </>
          ))}
          {holder?.badges > 4 &&
            <div className="relative group">
              <div className="absolute opacity-0 duration-300 w-24 group-hover:opacity-100 z-50 left-1/2 -translate-x-1/2 -top-8 flex flex-col items-center justify-center">
                <h3 className="text-xs font-medium text-black bg-white px-2 py-1 rounded shadow-black/10 shadow-lg">
                  View More
                </h3>
                <svg
                  width="10"
                  height="5"
                  viewBox="0 0 10 5"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M5 5L0 0L10 0L5 5Z" fill="white" />
                </svg>
              </div>
              <div className="w-10 h-10 -ml-2 cursor-pointer bg-white text-jel-gray-4 rounded-full shadow-jel-badge flex items-center justify-center">
                <h3 className="font-medium text-xs">{holder.badges-4}+</h3>
              </div>
            </div>}

          </div>

          <div className="bottom-4 left-5 absolute z-20">
            <h3 className="text-black  font-bold text-xl "> {holder?.username} </h3>
            <h3 className=" text-jel-gray-4  font-medium text-base flex flex-row gap-2 items-center justify-center "> <span> <Image src={twitter} className="w-4 opacity-70"/> </span> {holder?.twitter} </h3>
          </div>

          <div className="bottom-4 right-5 absolute z-20">
            <h3 className="text-black  font-bold text-xl "> {holder?.points} </h3>
            <h3 className=" text-jel-gray-4  font-medium text-base flex flex-row gap-2 items-center justify-center "> Points </h3>
          </div>

        </div>
    )
}

export default Leaderboard;
