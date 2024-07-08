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
import nftData from "../../utils/mapNfts.json"
import nftDataLeg from "../../utils/mapLegendary.json"
import { RiLoader5Fill } from "react-icons/ri";

export default function NFTFetcher({wallet}){

    const{selected, setShowNftInfo, setBalances, user:mainUser, setOpenSettings, balances} = useGlobalContext();
    const{address} = useAccount();
    const[balance, setBalance] = useState([])
    const add = [contractAdds.Jlema, contractAdds.JlemaLegendary, contractAdds.JlemaSE];
    const abi = [jlemaabi, jlemaLegendary, jlemaSE];
    const[user, setUser] = useState(null);
    const [displayNFT, setDisplayNFT] = useState([]);
 
    var counter = 0;

    useEffect(()=>{
        setBalances([]);
        if(wallet == null){
            setUser(address)
        }
        else{
            setUser(wallet);
        }
    },[wallet])
    
    async function balanceFetchers(){
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const signer = provider.getSigner();
        try{
            let tempBalance = [];
            for(let i = 0; i<3; i++){
                const contract = new ethers.Contract(add[i], abi[i], signer);

                if(i!=2){
                    let balance = Number(await contract.balanceOf(user));
                    tempBalance[i] = balance;
                }
                else{
                    let balance = Number(await contract.balanceOf(user, 0)) + Number(await contract.balanceOf(user, 1)) + Number(await contract.balanceOf(user, 2));
                    tempBalance[i] = balance;
                }
            }
            console.log(tempBalance);
            setBalances(tempBalance);
        }
        catch(err){
            console.log(err)
        }
    }

    async function dataProvider(tokenId){
        try{

            var img;
            var data;
            var name;
            var melink;
            var openlink;
            
            if(selected == 0){
                img = "https://metadata.jlema.xyz/api/jlema/image/" + tokenId;
                data = nftData[tokenId];
                name = "Jlema"
                melink = "https://magiceden.io/collections/polygon/0x71d9943cb18d9cb3605bc63dc6ce659eb7a78ced?evmItemDetailsModal=137%7E0x71d9943cb18d9cb3605bc63dc6ce659eb7a78ced%7E"+tokenId;
                openlink = "https://opensea.io/assets/matic/0x71d9943cb18d9cb3605bc63dc6ce659eb7a78ced/" + tokenId
            }
            else if(selected == 1){
                img = "https://cf-ipfs.com/ipfs/QmTj3DP94SPwVMBousFo25dryL66mPgK8bjyGFPKT5tM5B/"+tokenId+".gif";
                data = nftDataLeg[tokenId]
                name = "Jlema Legendary"
                melink = "https://magiceden.io/collections/polygon/0xc2f53f1d1c37c543b7a6440a247e4146d2e2c468?evmItemDetailsModal=137%7E0xc2f53f1d1c37c543b7a6440a247e4146d2e2c468%7E"+tokenId
                openlink = "https://opensea.io/assets/matic/0xc2f53f1d1c37c543b7a6440a247e4146d2e2c468/" + tokenId
            }

            setDisplayNFT(oldArray => [...oldArray, {name, img, tokenId, data, melink, openlink}]);
            counter++;
            
        }
        catch(err){
            console.log(err);
            // dataProvider(tokenId);
            // if(gatewayNum < 3){
            //     gatewayNum++;
            // }
            // else{
            //     gatewayNum = 0;
            // }
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
            const balance = Number(await contract.balanceOf(user));

            for(let i = 0; i < balance; i++){
                let tokenId = Number(await contract.tokenOfOwnerByIndex(user, i));
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
                const balance = Number(await contract.balanceOf(user, i));
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
          return contract;
        }
        catch(err){
            console.log(err);
        }
    }

    async function fetchJlema(multiplier){
        try{
            const contract = await jlemaFetcherSetup();
            const res = await contract.tokenOfOwnerJlema(multiplier, user);
            res.map(async(item)=>{
                if(item != 0){
                    await dataProvider(Number(item));
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
        setDisplayNFT([])
        if(user)
        balanceFetchers();
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
    },[selected, user]);

    if(selected != 2)
    return (
        <div className="flex flex-wrap gap-2 max-sm:justify-center relative justify-start ml-1 mt-4">
            {displayNFT.length == 0 && balances[0] != 0 || balances[1] != 0 && <div className="w-full h-[30rem] gap-4 flex items-center justify-center absolute">
                <RiLoader5Fill className="text-6xl animate-spin" />
                <h3 className="font-semibold" >Fetching</h3>
            </div>}
            {displayNFT.map((nft, index) => (
                  <div onClick={()=>{setShowNftInfo(nft)}} key={index} className="rounded-xl hover:shadow-jel-nft duration-200 sm:w-[10.6rem] sm:h-[12.5rem] w-36 h-[11.8rem] cursor-pointer border-[1px] border-jel-gray-3 overflow-hidden flex flex-col">
                    <div className="h-40 w-full">
                      <Image width={1920} height={1080} src={nft.img} className="object-cover w-full h-full"/>
                    </div>
                    <div className="bg-white text-center py-2">
                      <h3 className="text-sm font-normal text-black">{`${nft.name} #`}{nft.tokenId}</h3>
                    </div>
                </div>
              ))}

        </div>
    )

    if(selected == 2)
    return (
        <div className="grid max-sm:grid-cols-1 my-4 sm:grid-cols-2 pb-20 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 items-start justify-between gap-4">
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