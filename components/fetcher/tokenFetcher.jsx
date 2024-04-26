"use client"
import { ethers } from "ethers"
import { contractAdds } from "@/utils/contractAdds"
import cleanToken from "@/utils/abis/cleanToken"
import { useEffect, useState } from "react";
import { useAccount } from "wagmi";

export default function TokenFetcher({wallet}){

    const add = contractAdds.CLEANToken;
    const abi = cleanToken;

    const{address} = useAccount();

    const[balance, setBalance] = useState(0);

    const[user, setUser] = useState(null);

    useEffect(()=>{
        if(wallet == null){
            setUser(address)
        }
        else{
            setUser(wallet);
        }
    },[wallet])

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
            const bal = ethers.utils.formatEther(String(await contract.balanceOf(user)));

            setBalance(Number(bal).toFixed(0));
        }
        catch(err){
            console.log(err);
        }
    }

    useEffect(()=>{
        getBalance();
    },[user])

    return(
        <h1 className="text-sm">
            {balance}
        </h1>
    )
}