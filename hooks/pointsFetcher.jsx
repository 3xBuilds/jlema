import {ethers} from "ethers";
import axios from "axios";
import { contractAdds } from "@/utils/contractAdds";
import cleanToken from "@/utils/abis/cleanToken";
import jlemaFetcher from "@/utils/abis/jlemaFetcher";
import jlemaLegendary from "@/utils/abis/jlemaLegendary";
import jlemaSE from "@/utils/abis/jlemaSE";
import nftData from "../utils/mapNfts.json"
import legendaryData from "../utils/mapLegendary.json";
import { useAccount } from "wagmi";


const add = [contractAdds.JlemaFetcher, contractAdds.JlemaLegendary, contractAdds.JlemaSE, contractAdds.CLEANToken];
const abi = [jlemaFetcher, jlemaLegendary, jlemaSE, cleanToken];

var badges = {
    "Jlema": false,
    "Legendary": false,
    "Edition": false,
    "Homies": false,
    "Fren": false,
    "XGang": false,
    "MiniWhale": false,
    "Whale": false,
    "LegendShrimp": false,
    "LegendDolphin": false,
    "LegendWhale": false,
    "XEditions": false,
    "OneofOne": false,
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
                        badges.Jlema = true;
                        //balance based
                        points = points + 1000*final.length;
    
                        //holding tier based
                        if(final.length>=5 && final.length<10){
                            badges.Fren = true;
                            points +=1000;
                        }
                        else if(final.length>=10 && final.length<20){
                            badges.Fren = true;
                            badges.XGang = true;
                            points +=2000;
                        }
                        else if(final.length>=20 && final.length<40){
                            badges.Fren = true;
                            badges.XGang = true;
                            badges.MiniWhale = true;

                            points +=4000;
                        }
                        else if(final.length>=40){
                            badges.Fren = true;
                            badges.XGang = true;
                            badges.MiniWhale = true;
                            badges.Whale = true;
                            points +=8000;
                        }
    
                        //trait based
                        final.map((tokenId)=>{
                            const attributes = nftData[tokenId].attributes[0];
                            console.log (attributes.value);
                            switch(attributes.value){
                                case "1 of 1":
                                    badges.OneofOne = true;
                                    points+=5000;
                                    break;
                                case "Snake":
                                    badges.Snake = true;
                                    points+=200;
                                    break;
                                case "Superhero":
                                    badges.Hero = true;
                                    points+=200;
                                    break;
                                case "Astronaut":
                                    badges.Space = true;
                                    points+=200;
                                    break;
                                case "Graphic Tee Peace":
                                    badges.Peace = true;
                                    points+=200;
                                    break;
                                case "Crown":
                                    badges.King = true;
                                    points+=200;
                                    break;
                                case "Penguin Hat":
                                    badges.Penguin = true;
                                    points+=200;
                                    break;
                                case "Punk hair":
                                    badges.Punker = true;
                                    points+=200;
                                    break;
                                case "Rose":
                                    badges.Romeo = true;
                                    points+=200;
                                    break;
                                case "Old School Tattoos":
                                    badges.Yakkuza = true;
                                    oldSchool++;
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
                        badges.Legendary = true;
                        //balance based
                        points += 1000*arr.length;
                        
                        //tier based
                        if(arr.length>=10 && arr.length<20){
                            badges.LegendShrimp = true;
                            points +=2000;
                        }
                        else if(arr.length>=20 && arr.length<40){
                            badges.LegendShrimp = true;
                            badges.LegendDolphin = true;
                            points +=4000;
                        }
                        else if(arr.length>=40){
                            badges.LegendShrimp = true;
                            badges.LegendDolphin = true;
                            badges.LegendWhale = true;
                            points +=8000;
                        }
    
                        //trait based
                        arr.map(async(tokenId)=>{
                            const type = legendaryData[tokenId].attributes[1].value;
                            // console.log(type);
                            

                            if(type == "Special"){
                                badges.Special = true;
                                points += 5000;
                            }
                            if(type == "Collaboration"){
                                badges.Collab = true;
                                points += 1000;
                            }
                            if(type == "Uncommon"){
                                badges.Unique = true;
                                points += 5000;
                            }
                        })
                    }

                    break;

                //special edition
                case 2:
                    const holding = specialEditionFetcher(address);

                    if(holding > 0){
                        badges.Edition = true;
                        points += holding*100;
    
                        if(holding>10){
                            badges.XEditions = true;
                            points+=2000;
                        }
                    }
                    break;
                default:
                    console.log("Nothing to show");
                    break;
            }
        }
        if(badges.Jlema == true && badges.Legendary == true && badges.Edition == true){
            badges.Homies = true;
            points += 2000;
        }
        // console.log(user?.points, points);
        if(user?.points != points){
            axios.patch(`/api/user/${user?.username}`, {points: points}).then((res)=>{console.log(res)}).catch((err)=>{console.log(err)});
        }

        return badges;
    }

    catch(err){
        console.log(err);
    }

}