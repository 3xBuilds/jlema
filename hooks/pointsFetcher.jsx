import {ethers} from "ethers";
import axios from "axios";
import { contractAdds } from "@/utils/contractAdds";
import cleanToken from "@/utils/abis/cleanToken";
import jlemaFetcher from "@/utils/abis/jlemaFetcher";
import jlemaLegendary from "@/utils/abis/jlemaLegendary";
import jlemaSE from "@/utils/abis/jlemaSE";
import nftData from "../utils/mapNfts.json"
import { useAccount } from "wagmi";


const add = [contractAdds.JlemaFetcher, contractAdds.JlemaLegendary, contractAdds.JlemaSE, contractAdds.CLEANToken];
const abi = [jlemaFetcher, jlemaLegendary, jlemaSE, cleanToken];

var badges = {
    "Jlema": false,
    "Legendary": false,
    "Edition": false,
    "Homies": false,
    "Fren": false,
    "X Gang": false,
    "Mini Whale": false,
    "Whale": false,
    "Legend Shrimp": false,
    "Legend Dolphin": false,
    "Legend Whale": false,
    "X Editions": false,
    "1of1": false,
    "Snake": false,
    "Hero": false,
    "Space": false,
    "Peace": false,
    "King": false,
    "Penguin": false,
    "Punker": false,
    "Romeo": false,
    "Yakkuza": false,
    "Special": false,
    "Collab": false,
    "Unique": false,

}

async function contractSetup(selected){
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();

    try {
      const contract = new ethers.Contract(add[selected], abi[selected], signer);
      return contract;
    }
    catch(err){
        console.log(err);
    }
}

async function fetchJlema(contract, multiplier, address){

    try{

        const res = await contract.tokenOfOwnerJlema(multiplier, address);
        var arr = [];
        res.map((item)=>{
            if(item != 0){
                console.log(Number(item));
                arr.push(Number(item));
            }
        });
        return arr;
    }
    catch(err){

    }
}

async function jlemaLegendaryFetcher(address){
    try{
        const contract = await contractSetup(1);
        const balance = Number(await contract.balanceOf(address));
        var arrL = []
        console.log(balance);
        for(let i = 0; i < balance; i++){
            let tokenId = Number(await contract.tokenOfOwnerByIndex(address, i));
            arrL[i] = tokenId;
        }

        return arrL;

    }
    catch(err){
        console.log(err);
    }
}

async function specialEditionFetcher(address){
    try{
        const contract = await contractSetup(2);
        var total = 0;
        for(let i = 0; i < 3; i++){
            const balance = Number(await contract.balanceOf(address, i));
            total += balance;
        }

        return total;
    }
    catch(err){
        console.log(err);
    }
}

export default async function pointsFetcher(address, user){
    try{
        var points = 0;
        var oldSchool = 0;
        for(let i = 0; i<3; i++){
            const contract = await contractSetup(i);

            switch(i){
                //jlema
                case 0:
                    const arr1 = await fetchJlema(contract,0, address);
                    const arr2 = await fetchJlema(contract,1, address);
                    const arr3 = await fetchJlema(contract,2, address);
                    const arr4 = await fetchJlema(contract,3, address);
                    const arr5 = await fetchJlema(contract,4, address);

                    
                    const final = arr1.concat(arr2, arr3, arr4, arr5);
                    // console.log(final);

                    if(final.length > 0){

                        //balance based
                        points = points + 1000*final.length;
    
                        //holding tier based
                        if(final.length>=5 && final.length<10){
                            points +=1000;
                        }
                        else if(final.length>=10 && final.length<20){
                            points +=2000;
                        }
                        else if(final.length>=20 && final.length<40){
                            points +=4000;
                        }
                        else if(final.length>=40){
                            points +=8000;
                        }
    
                        //trait based
                        final.map((tokenId)=>{
                            const attributes = nftData[tokenId].attributes[0];
                            console.log (attributes.value);
                            switch(attributes.value){
                                case "1 of 1":
                                    points+=5000;
                                    break;
                                case "Snake":
                                    points+=200;
                                    break;
                                case "Superhero":
                                    points+=200;
                                    break;
                                case "Astronaut":
                                    points+=200;
                                    break;
                                case "Graphic Tee Peace":
                                    points+=200;
                                    break;
                                case "Crown":
                                    points+=200;
                                    break;
                                case "Penguin Hat":
                                    points+=200;
                                    break;
                                case "Punk hair":
                                    points+=200;
                                    break;
                                case "Rose":
                                    points+=200;
                                    break;
                                case "Old School Tattoos":
                                    oldSchool++;
                                    points+=200;
                                    break;
                                
                                default:
                                    console.log("ok bye");
                            }
    
                        })
    
                        if(oldSchool >=5){
                            points += 1000;
                        }
                        console.log(points);
                    }
                    break;
                
                //legendary
                case 1:
                    const arr = await jlemaLegendaryFetcher(address);

                    if(arr.length > 0){

                        //balance based
                        points += 1000*arr.length;
                        
                        //tier based
                        if(arr.length>=10 && arr.length<20){
                            points +=2000;
                        }
                        else if(arr.length>=20 && arr.length<40){
                            points +=4000;
                        }
                        else if(arr.length>=40){
                            points +=8000;
                        }
    
                        //trait based
                        arr.map(async(tokenId)=>{
                            console.log(tokenId);
                            const tokenURI = "https://metadata.jlema.xyz/config/jlema-legendary/"+tokenId+".json";
                            const meta = await axios.get(tokenURI);
                            const json = await meta.json();

                            const attributes = json["attributes"];

                            if(attributes[1].value == "Special"){
                                points += 5000;
                            }
                            else if(attributes[1].value == "Collaboration"){
                                points += 1000;
                            }
                            else if(attributes[1].value == "Uncommon"){
                                points += 5000;
                            }
                        })
                    }

                    break;

                //special edition
                case 2:
                    const holding = specialEditionFetcher(address);

                    if(holding > 0){

                        points += holding*100;
    
                        if(holding>10){
                            points+=2000;
                        }
                    }
                    break;
                default:
                    console.log("Nothing to show");
                    break;
            }
        }
        // console.log(user?.points, points);
        if(user?.points != points){
            axios.patch(`/api/user/${user?.username}`, {points: points}).then((res)=>{console.log(res)}).catch((err)=>{console.log(err)});
        }
    }

    catch(err){
        console.log(err);
    }

}