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

var badges = []

async function contractSetup(selected){
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();

    try {
      const contract = new ethers.Contract(add[selected], abi[selected], signer);
      return contract;
    }
    catch(err){
        // console.log(err);
    }
}

async function fetchJlema(contract, multiplier, address){
    
    try{

        const res = await contract.tokenOfOwnerJlema(multiplier, address);
        var arr = [];
        res.map((item)=>{
            if(item != 0){
                // console.log(Number(item));
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
        // console.log(balance);
        for(let i = 0; i < balance; i++){
            let tokenId = Number(await contract.tokenOfOwnerByIndex(address, i));
            arrL[i] = tokenId;
        }

        return arrL;

    }
    catch(err){
        // console.log(err);
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
        // console.log(err);
    }
}

export default async function pointsFetcher(user){

    

    try{
        var points = 0;
        var badge = 0;
        var oldSchool = 0;
        let jlemaNfts = 0;
        let legendaryNfts = 0;
        let specialNfts = 0;


        for(let i = 0; i<3; i++){
            const contract = await contractSetup(i);

            switch(i){
                //jlema
                case 0:
                    const arr1 = await fetchJlema(contract,0, user?.wallet);
                    const arr2 = await fetchJlema(contract,1, user?.wallet);
                    const arr3 = await fetchJlema(contract,2, user?.wallet);
                    const arr4 = await fetchJlema(contract,3, user?.wallet);
                    const arr5 = await fetchJlema(contract,4, user?.wallet);

                    
                    const final = arr1.concat(arr2, arr3, arr4, arr5);

                    jlemaNfts = final?.length;
                    // // console.log(final);

                    if(final.length > 0){
                        badges[0] = "Jlema";
                        badge += 1;
                        //balance based
                        points = points + 1000*final.length;
    
                        //holding tier based
                        if(final.length>=5 && final.length<10){
                            badges[1]="Fren";
                            badge += 1;
                            points +=1000;
                        }
                        else if(final.length>=10 && final.length<20){
                            badges[1]="Fren";
                            badges[2]="XGang";
                            badge += 2;

                            points +=2000;
                        }
                        else if(final.length>=20 && final.length<40){
                            badges[1] = "Fren";
                            badges[2] = "XGang";
                            badges[3] = "MiniWhale";

                            badge += 3;
                            
                            points +=4000;
                        }
                        else if(final.length>=40){
                            badges[1] = "Fren";
                            badges[2] = "XGang";
                            badges[3] = "MiniWhale";
                            badges[4] = "Whale";
                            badge += 4;
                            points +=8000;
                        }
    
                        //trait based
                        final.map((tokenId)=>{
                            const attributes = nftData[tokenId].attributes[0];
                            // console.log (attributes.value);
                            switch(attributes.value){
                                case "1 of 1":
                                    badges[5] = "OneofOne";
                                    badge += 1;

                                    points+=5000;
                                    break;
                                case "Snake":
                                    badges[6] = "Snake";
                                    badge += 1;

                                    points+=200;
                                    break;
                                case "Superhero":
                                    badges[7] = "Hero";

                                    badge += 1;

                                    points+=200;
                                    break;
                                case "Astronaut":
                                    badges[8] = "Space";

                                    badge += 1;

                                    points+=200;
                                    break;
                                case "Graphic Tee Peace":
                                    badges[9] = "Peace";

                                    badge += 1;

                                    points+=200;
                                    break;
                                case "Crown":
                                    badges[10] = "King";

                                    badge += 1;

                                    points+=200;
                                    break;
                                case "Penguin Hat":
                                    badges[11] = "Penguin";

                                    badge += 1;

                                    points+=200;
                                    break;
                                case "Punk hair":
                                    badges[12] = "Punker";
                                    badge += 1;

                                    points+=200;
                                    break;
                                case "Rose":
                                    badges[13] = "Romeo";
                                    badge += 1;

                                    points+=200;
                                    break;
                                case "Old School Tattoos":
                                    badges[14] = "Yakkuza";
                                    badge += 1;

                                    oldSchool++;
                                    break;
                                
                                default:
                                    // console.log("ok bye");
                            }
    
                        })
    
                        if(oldSchool >=5){
                            points += 1000;
                        }
                        // console.log(points);
                    }
                    break;
                
                //legendary
                case 1:
                    const arr = await jlemaLegendaryFetcher(user?.wallet);

                    legendaryNfts = arr?.length;

                    if(arr.length > 0){
                        badge += 1;
                        badges[15] = "Legendary";
                        //balance based
                        points += 1000*arr.length;
                        
                        //tier based
                        if(arr.length>=10 && arr.length<20){
                            badge += 1;
                            badges[16] = "LegendShrimp";
                            points +=2000;
                        }
                        else if(arr.length>=20 && arr.length<40){
                            badges[16] = "LegendShrimp";
                            badges[17] = "LegendDolphin";
                            badge += 2;

                            points +=4000;
                        }
                        else if(arr.length>=40){
                            badges[16] = "LegendShrimp";
                            badges[17] = "LegendDolphin";
                            badges[18] = "LegendWhale";

                            badge += 3;

                            points +=8000;
                        }
    
                        //trait based
                        arr.map(async(tokenId)=>{
                            const type = legendaryData[tokenId].attributes[1].value;
                            // // console.log(type);
                            

                            if(type == "Special"){
                                badges[19] = "Special";

                                badge += 1;
                                points += 5000;
                            }
                            if(type == "Collaboration"){
                                badges[20] = "Collab";

                                badge += 1;
                                points += 1000;
                            }
                            if(type == "Uncommon"){
                                badges[21] = "Unique";

                                badge += 1;
                                points += 5000;
                            }
                        })
                    }

                    break;

                //special edition
                case 2:
                    const holding = await specialEditionFetcher(user?.wallet);

                    specialNfts = holding;

                    if(holding > 0){
                        badges[22] = "Edition";

                        badge += 1;

                        points += holding*100;
    
                        if(holding>10){
                            badges[23] = "XEditions";
                            badge += 1;

                            points+=2000;
                        }
                    }
                    break;
                default:
                    break;
            }
        }

        const sub1 = badges.indexOf("Jlema")
        const sub2 = badges.indexOf("Legendary")
        const sub3 = badges.indexOf("Edition")


        if(sub1>=0 && sub2>=0 && sub3>=0){
            badge += 1;
            badges[24] = "Homies";
            points += 2000;
        }

        var arr = []

        for(let i = 0; i<25; i++){
            if(badges[i]){
                arr.push(badges[i]);
            }
        }
       
        if(user?.points != points || user?.badges.length != badge || user?.jlema != jlemaNfts || user?.jlemalegendary != legendaryNfts || user?.specialEdition != specialNfts){
            axios.patch(`/api/user/${user?.username}`, { points: points, badges: arr, jlema:jlemaNfts, jlemalegendary:legendaryNfts, specialEdition:specialNfts }).then((res)=>{ console.log(res)}).catch((err)=>{console.log(err)});
            await axios.get("/api/leaderboard");
        }
        console.log("POINTS FETCHER BEING CALLED")
        return arr;
    }

    catch(err){
        console.log(err);
    }

}