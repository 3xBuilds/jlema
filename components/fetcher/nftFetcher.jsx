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
import { useAccount } from "wagmi";
import newYear from "@/assets/newYear.png";
import lunarNY from "@/assets/lunarNY.png";
import christmas from "@/assets/christmas.png"

export default function NFTFetcher({}){

    const{selected, setShowNftInfo, setBalances} = useGlobalContext();
    const{address} = useAccount();
    const[balance, setBalance] = useState([])
    const add = [contractAdds.Jlema, contractAdds.JlemaLegendary, contractAdds.JlemaSE];
    const abi = [jlemaabi, jlemaLegendary, jlemaSE];

    const [displayNFT, setDisplayNFT] = useState([]);

    var counter = 0;

    async function balanceFetchers(){
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const signer = provider.getSigner();
        try{
            for(let i = 0; i<3; i++){
                const contract = new ethers.Contract(add[i], abi[i], signer);

                if(i!=2){
                    let balance = Number(await contract.balanceOf(address));
                    setBalances(oldArray => [...oldArray, balance]);
                }
                else{
                    let balance = Number(await contract.balanceOf(address, 0)) + Number(await contract.balanceOf(address, 1)) + Number(await contract.balanceOf(address, 2));
                    setBalances(oldArray => [...oldArray, balance]);
                }
            }
        }
        catch(err){
            console.log(err)
        }
    }

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
            const contract = await contractSetup();
            const balance = Number(await contract.balanceOf(address));
            console.log(balance);
            for(let i = 0; i < balance; i++){
                let tokenId = Number(await contract.tokenOfOwnerByIndex(address, i));
                dataProvider(tokenId);
            }

        }
        catch(err){
            console.log(err);
        }
    }

    async function specialEditionFetcher(){
        try{
            const contract = await contractSetup();
            for(let i = 0; i < 3; i++){
                const balance = Number(await contract.balanceOf(address, i));
                setBalance(oldArray => [...oldArray, balance]);
            }
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
            const res = await contract.tokenOfOwnerJlema(multiplier, address);
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

            if(selected == 1){
                jlemaLegendaryFetcher();
            }
            else if(selected == 2){
                specialEditionFetcher();
            }
        }
        catch(err){
            console.log(err);
        }
    }

    useEffect(()=>{
        balanceFetchers();
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
    },[selected, address]);

    if(selected != 2)
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

    if(selected == 2)
    return (
        <div className="grid max-sm:grid-cols-1 sm:grid-cols-2 pb-20 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 items-start justify-between gap-4">
            <div className="text-center text-lg font-semibold shadow-xl shadow-black/10 hover:shadow-black/30 duration-200 rounded-xl">
                <Image className="rounded-xl" width={1080} height={1080} src={christmas}/>
                <h2 className="text-xl pt-2 font-bold">Merry Christmas 2023</h2>
                <h2 className="pt-2 pb-4">{balance[0]}x</h2>
            </div>

            <div className="text-center text-lg font-semibold shadow-xl shadow-black/10 hover:shadow-black/30 duration-200 rounded-xl">
                <Image className="rounded-xl" width={1080} height={1080} src={lunarNY}/>
                <h2 className="text-xl pt-2 font-bold">Happy Lunar New Year 2024</h2>
                <h2 className="pt-2 pb-4">{balance[1]}x</h2>
            </div>

            <div className="text-center text-lg font-semibold shadow-xl shadow-black/10 hover:shadow-black/30 duration-200 rounded-xl">
                <Image className="rounded-xl" width={1080} height={1080} src={newYear}/>
                <h2 className="text-xl pt-2 font-bold">Welcome 2024</h2>
                <h2 className="pt-2 pb-4">{balance[2]}x</h2>
            </div>

        </div>
    )
}