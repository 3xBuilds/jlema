"use client"
import NFTFetcher from '@/components/fetcher/nftFetcher';
import NftInfoModal from '@/components/profile/NftInfoModal';
import ProfileInfo from '@/components/profile/ProfileInfo';
import { useGlobalContext } from '@/context/MainContext';
import Image from 'next/image';
import arrowLeft from "@/assets/icons/arrowl.svg";
import arrowRight from "@/assets/icons/arrowr.svg";
import nft1 from '@/assets/nft1.png'
import nft2 from '@/assets/nft2.png'
import nft3 from '@/assets/nft3.png'
import nft4 from '@/assets/nft4.png'
import nft5 from '@/assets/nft5.png'
import nft6 from '@/assets/nft6.png'
import arrowd from '@/assets/icons/arrowd.svg'
import tick from '@/assets/icons/tick.svg'
import { useEffect, useState } from 'react';
import SettingsModal from '@/components/settings/SettingsModal';
import { useAccount } from 'wagmi';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import Highlights from '@/components/profile/Highlights';

const ProfileUser = () => {

  const {address} = useAccount();
  const [selectedSort, setSelectedSort] = useState(null);
  const [openSort, setOpenSort] = useState(false);

  const sortOptions = [
    {
      label: "ID: Ascending",
      value: "id_acc"
    },
    {
      label: "ID: Descending",
      value: "id_dec"
    },
    {
      label: "Skin: Ascending",
      value: "skin_acc"
    },
    {
      label: "Skin: Descending",
      value: "skin_dec"
    }
  ]

  const {isConnected} = useAccount();

  const{selected, setSelected} = useGlobalContext();
  const {showNftInfo, setShowNftInfo} = useGlobalContext();
  const {openSettings, user, setUser, setOpenSettings} = useGlobalContext();

  const router = useRouter();

  useEffect(()=>{
    if(!isConnected){
        router.push("/");
    }
  }, [isConnected])

  const getUser = async () => {
    try{
      const res = await axios.get(`/api/user/${address}`);
      console.log("user", res.data);
      if(res.data.user==null){
        setOpenSettings(true);
      }
      setUser(res.data.user);
    }
    catch(err){
      console.log("Error", err);
    }
  }

  useEffect(()=>{
    if(address){
      getUser();
    }
  }, [address])

  return(
    <>

    {openSettings && <SettingsModal/>}
    {showNftInfo && <NftInfoModal showNftInfo={showNftInfo} setShowNftInfo={setShowNftInfo}/>}
      <div className="flex flex-row mt-16 pt-1">
        <ProfileInfo/>
        <div className="pl-[328px] w-screen">
          <div className="px-5 py-4 flex flex-col gap-4 overflow-scroll w-full noscr">

          <Highlights/>

            <div className="w-full flex flex-row justify-between items-center">
              <div className=" bg-jel-gray-1 h-12 rounded-xl flex flex-row gap-2 p-1">
                <button onClick={()=>{setSelected(0)}} className={`cursor-pointer rounded-lg text-base px-4 py-2 ${selected ==0 ? "bg-white font-semibold text-black shadow-jel-card" : " font-medium text-jel-gray-4" }`}>
                  <h3 className="">Jlema</h3>
                </button>
                <button onClick={()=>{setSelected(1)}} className={`cursor-pointer rounded-lg text-base px-4 py-2 ${selected ==1 ? "bg-white font-semibold text-black shadow-jel-card" : " font-medium text-jel-gray-4" }`}>
                  <h3 className="">Jlema Legendary</h3>
                </button>
                <button onClick={()=>{setSelected(2)}} className={`cursor-pointer rounded-lg text-base px-4 py-2 ${selected ==2 ? "bg-white font-semibold text-black shadow-jel-card" : " font-medium text-jel-gray-4" }`}>
                  <h3 className="">Special Editions</h3>
                </button>
              </div>

              <div className="relative">
                <button onClick={()=>{setOpenSort((prev)=>!prev)}} className={`bg-white hover:border-black duration-200 cursor-pointer border-[1px] group group-focus:border-black ${openSort && " border-black "} h-12 border-jel-gray-3 rounded-xl flex flex-row gap-2 px-5 justify-between items-center`}>
                  <h3 className="text-black font-semibold">{selectedSort!=null ? selectedSort.label : "Sort By ..."}</h3>
                    <Image src={arrowd} className={`w-5 duration-300 ${openSort ? "rotate-180" : "rotate-0"}`}/>
                </button>
                {openSort && <div className="bg-white rounded-xl shadow-jel-dropdown p-4 w-52 px-4 flex flex-col absolute top-14 right-0">
                  {sortOptions.map((option)=>(<button onClick={()=>{setSelectedSort(option); setOpenSort(false)}} className="w-full grid grid-cols-12 gap-2 justify-between items-center p-2">
                    <h3 className="text-black font-medium text-left text-base text-nowrap col-span-10">{option.label}</h3>
                    <div className="col-span-2">
                      {selectedSort && option.value == selectedSort.value && <Image src={tick} className="w-5"/>}
                    </div>
                  </button>))}
                </div>}
              </div>
            </div>


            <NFTFetcher/>
            {/* <div className="grid max-sm:grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 xl:grid-cols-6 items-start justify-between gap-4">
                {nfts.map((nft, index) => (
                  <div onClick={()=>{setShowNftInfo({nftImage: nft, number: index+1})}} key={index} className="rounded-xl hover:shadow-jel-nft duration-200 cursor-pointer border-[1px] border-jel-gray-3 overflow-hidden flex flex-col">
                    <div className="h-40 w-full">
                      <Image src={nft} className="object-cover w-full h-full"/>
                    </div>
                    <div className="bg-white text-center py-2">
                      <h3 className="text-sm font-normal text-black">{"Jlema #"}{index+1}</h3>
                    </div>
                </div>
              ))}
            </div> */}
          </div>
      </div>
      </div>
    </>
  )
}

export default ProfileUser