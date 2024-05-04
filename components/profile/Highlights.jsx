"use client"
import arrowLeft from "@/assets/icons/arrowl.svg";
import arrowRight from "@/assets/icons/arrowr.svg";
import nft1 from '@/assets/nft1.png'
import Image from 'next/image';


import { useGlobalContext } from "@/context/MainContext"
import { useEffect, useState } from "react";
import { contractAdds } from "@/utils/contractAdds";
import jlemaFetcher from "@/utils/abis/jlemaFetcher";
import { ethers } from "ethers";
import axios from "axios"
import { useAccount } from "wagmi";
import nftData from "../../utils/mapNfts.json"

const Highlights = () => {

  const {user, setShowNftInfo} = useGlobalContext();
  const [currentNft, setCurrentNft] = useState(0);

  const [displayNFT, setDisplayNFT] = useState([]);
    const {address} = useAccount();

    async function checkPointsFromContract(tokenId){
      return await nftData[tokenId];
  }

    async function dataProvider(tokenId){
      try{
          var img = "https://metadata.jlema.xyz/api/jlema/image/" + tokenId;
          const data = await checkPointsFromContract(tokenId);
          setDisplayNFT(oldArray => [...oldArray, {img, tokenId, data}]);
      }
      catch(err){
          console.log(err);
          dataProvider(uri, tokenId);
          if(gatewayNum < 3){
              gatewayNum++;
          }
          else{
              gatewayNum = 0;
          }
      }
  }

    useEffect(()=>{
      setDisplayNFT([]);
      user?.highlights?.map((nft)=>{
        if(nft!=0){
          dataProvider(nft);
        }
      })
    }, [user])

    // useEffect(()=>{
    //   console.log("currrr: ", displayNFT[currentNft]);
    // }, [displayNFT, currentNft])

    const next = () => {
      const start = 0;
      const end = displayNFT.length-1;

      if(currentNft>=end){
        setCurrentNft(start);
      }
      else{
        setCurrentNft(prev=>prev+1);
      }

    }

    const previous = () => {
      const start = 0;
      const end = displayNFT.length-1;

      if(currentNft<=start){
        setCurrentNft(end);
      }
      else{
        setCurrentNft(prev=>prev-1);
      }
    }


  if(displayNFT[currentNft]?.data)
  return (
    <div className="border-[1px] overflow-hidden border-jel-gray-3 rounded-xl w-full h-80 relative flex items-center justify-center">
        <button className="absolute top-1/2 -translate-y-1/2 left-5 flex items-center justify-center w-12 h-12 rounded-lg duration-300 hover:bg-jel-gray-2">
          <Image src={arrowLeft} onClick={previous} className=""/>
        </button>
        <button className="absolute top-1/2 -translate-y-1/2 right-5 flex items-center justify-center w-12 h-12 rounded-lg duration-300 hover:bg-jel-gray-2">
          <Image src={arrowRight} onClick={next} className=""/>
        </button>

        <div onClick={()=>{setShowNftInfo(displayNFT[currentNft])}} className=" grid grid-cols-2 w-[60%]">
        <div className="h-80">
            <Image src={displayNFT[currentNft]?.img} width={1000} height={1000} className=' h-full object-contain'/>
        </div>
         <div  className="h-full flex flex-col items-start justify-center">
            <h3 className="font-medium text-jel-gray-4 text-lg">Jlema</h3>
            <h3 className="font-semibold text-black text-5xl">#{displayNFT[currentNft]?.tokenId}</h3>
            <div className="mt-4 flex flex-row gap-2 flex-wrap">
            <h3 className="text-xs font-normal text-jel-gray-4">{displayNFT[currentNft]?.data.attributes[0]?.trait_type} <span className="font-medium text-black">{displayNFT[currentNft]?.data.attributes[0]?.value}</span></h3>
            <h3 className="text-xs font-normal text-jel-gray-4">{displayNFT[currentNft]?.data.attributes[1]?.trait_type} <span className="font-medium text-black">{displayNFT[currentNft]?.data.attributes[1]?.value}</span></h3>
            <h3 className="text-xs font-normal text-jel-gray-4">{displayNFT[currentNft]?.data.attributes[2]?.trait_type} <span className="font-medium text-black">{displayNFT[currentNft]?.data.attributes[2]?.value}</span></h3>
            <h3 className="text-xs font-normal text-jel-gray-4">{displayNFT[currentNft]?.data.attributes[3]?.trait_type} <span className="font-medium text-black">{displayNFT[currentNft]?.data.attributes[3]?.value}</span></h3>
            <h3 className="text-xs font-normal text-jel-gray-4">{displayNFT[currentNft]?.data.attributes[4]?.trait_type} <span className="font-medium text-black">{displayNFT[currentNft]?.data.attributes[4]?.value}</span></h3>
            </div>
        </div>
        </div>
    </div>
  )
  
}

export default Highlights