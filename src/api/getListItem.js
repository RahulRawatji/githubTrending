import axios from "axios";

async function getListItems(){
    try{
        const currDate = new Date();
            currDate.setDate(currDate.getDate() - 1);

const yesterday = currDate.toISOString().split("T")[0];
        const response =  await axios(`https://api.github.com/search/repositories?q=created:%3e${yesterday}&sort=stars&order=desc`);
        
        if(response.status === 200){
             return {data : response.data};
        }
        throw response.statusText;
    }catch(error){
        console.error(error);
        return {error, data:[]}
    }
}


export default getListItems;