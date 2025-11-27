import axios from "axios";

async function getListItems(pageNo = null) {
    try {
        const currDate = new Date();
        currDate.setDate(currDate.getDate() - 10);

        const date = currDate.toISOString().split("T")[0];
        const response = await axios(`https://api.github.com/search/repositories?q=created:%3e${date}&sort=stars&order=desc${pageNo ? `&page=${pageNo}` : ''}`);

        if (response.status === 200) {
            return { data: response.data };
        }
        throw response.statusText;
    } catch (error) {s
        return { error, data: [] }
    }
}


export default getListItems;