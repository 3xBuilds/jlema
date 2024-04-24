"use client"

import { useGlobalContext } from "@/context/MainContext"
import { useEffect, useState } from "react";
import { contractAdds } from "@/utils/contractAdds";
import jlemaabi from "@/utils/abis/jlemaabi";
import jlemaLegendary from "@/utils/abis/jlemaLegendary";
import jlemaSE from "@/utils/abis/jlemaSE";
import jlemaFetcher from "@/utils/abis/jlemaFetcher";
import { ethers } from "ethers";
import axios from "axios"
import Image from "next/image";

export default function NFTFetcher(){

    const{selected} = useGlobalContext();
    const {showNftInfo, setShowNftInfo} = useGlobalContext(null);

    const add = [contractAdds.Jlema, contractAdds.JlemaLegendary, contractAdds.JlemaSE];
    const abi = [jlemaabi, jlemaLegendary, jlemaSE];

    const [displayNFT, setDisplayNFT] = useState([]);

    var counter = 0;


    async function dataProvider(tokenId){
        try{

            var img;
            
            if(selected == 0){
                img = "https://cf-ipfs.com/ipfs/bafybeiduqtzpwdc6hwwwjg3rt35twynjwsq367wo5phobkb3iogmhincge/" + tokenId + ".png";
            }
            else if(selected == 1){
                img = "https://cf-ipfs.com/ipfs/QmTj3DP94SPwVMBousFo25dryL66mPgK8bjyGFPKT5tM5B/"+tokenId+".gif"
            }

            setDisplayNFT(oldArray => [...oldArray, {img, tokenId}]);

            counter++;
            
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

    async function contractSetup(){
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const signer = provider.getSigner();
    
        try {
          const contract = new ethers.Contract(add[selected], abi[selected], signer);
        //   setLoader(false);
    
          return contract;
        }
        catch(err){
            console.log(err);
        }
    }

    async function jlemaLegendaryFetcher(){
        try{

        }
        catch(err){
            console.log(err);
        }
    }

    async function jlemaFetcherSetup(){
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const signer = provider.getSigner();
    
        try {
          const contract = new ethers.Contract(contractAdds.JlemaFetcher, jlemaFetcher, signer);
        //   setLoader(false);
    
          return contract;
        }
        catch(err){
            console.log(err);
        }
    }

    async function fetchJlema(multiplier){
        try{
            const contract = await jlemaFetcherSetup();
            const res = await contract.tokenOfOwnerJlema(multiplier);
            res.map((item)=>{
                if(item != 0){
                    console.log(Number(item));
                    dataProvider(Number(item));
                }
            })
        }
        catch(err){

        }
    }

    async function fetch(){
        try{
            const contract = await contractSetup();

            if(selected == 1){
                
            }
        }
        catch(err){
            console.log(err);
        }
    }

    useEffect(()=>{
        setDisplayNFT([])
        if(selected == 0){
            fetchJlema(0);
            fetchJlema(1);
            fetchJlema(2);
            fetchJlema(3);
            fetchJlema(4);
        }
        else{
            fetch();
        }
    },[selected]);

    return (
        <div className="grid max-sm:grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 xl:grid-cols-6 items-start justify-between gap-4">
            {displayNFT.map((nft, index) => (
                  <div onClick={()=>{setShowNftInfo({nftImage: nft.img, number: index+1})}} key={index} className="rounded-xl hover:shadow-jel-nft duration-200 cursor-pointer border-[1px] border-jel-gray-3 overflow-hidden flex flex-col">
                    <div className="h-40 w-full">
                      <Image width={1920} height={1080} src={nft.img} className="object-cover w-full h-full"/>
                    </div>
                    <div className="bg-white text-center py-2">
                      <h3 className="text-sm font-normal text-black">{"Jlema #"}{nft.tokenId}</h3>
                    </div>
                </div>
              ))}

        </div>
    )
}