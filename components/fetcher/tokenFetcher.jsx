"use client"
import { ethers } from "ethers"
import { contractAdds } from "@/utils/contractAdds"
import cleanToken from "@/utils/abis/cleanToken"
import { useEffect, useState } from "react";
import { useAccount } from "wagmi";

export default function TokenFetcher(){

    const add = contractAdds.CLEANToken;
    const abi = cleanToken;

    const{address} = useAccount();

    const[balance, setBalance] = useState(0);

    async function contractSetup(){
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const signer = provider.getSigner();
    
        try {
          const contract = new ethers.Contract(add, abi, signer);
        //   setLoader(false);
    
          return contract;
        }
        catch(err){
            console.log(err);
        }
    }

    async function getBalance(){
        try{
            const contract = await contractSetup();
            setBalance(ethers.formatEther(String(await contract.balanceOf(address))));
        }
        catch(err){

        }
    }

    useEffect(()=>{
        getBalance();
    },[])

    return(
        <h1 className="text-sm">
            {balance}
        </h1>
    )
}