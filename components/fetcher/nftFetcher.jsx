"use client"

import { useGlobalContext } from "@/context/MainContext"
import { useEffect } from "react";
import { contractAdds } from "@/utils/contractAdds";
import jlemaabi from "@/utils/abis/jlemaabi";
import jlemaLegendary from "@/utils/abis/jlemaLegendary";
import jlemaSE from "@/utils/abis/jlemaSE";
import { ethers } from "ethers";

export default function NFTFetcher(){

    const{selected} = useGlobalContext();

    const add = [contractAdds.Jlema, contractAdds.JlemaLegendary, contractAdds.JlemaSE];
    const abi = [jlemaabi, jlemaLegendary, jlemaSE];

    async function contractSetup(){
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const signer = provider.getSigner();
    
        try {
          const contract = new ethers.Contract(add[selected], abi[selected], signer);
          setLoader(false);
    
          return contract;
        }
        catch(err){
            console.log(err);
        }
    }

    async function fetch(){
        try{

        }
        catch(err){
            console.log(err);
        }
    }

    useEffect(()=>{
        console.log(selected);
    },[selected]);

    return (
        <div>

        </div>
    )
}