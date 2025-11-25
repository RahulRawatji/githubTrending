import { useEffect, useState } from "react";
import getListItems from "../api/getListItem";
import ListItem from "./ListItem";

function List() {
    const [listData, setListData] = useState();
    const [error, setError] = useState(false);
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        const localData = JSON.parse(localStorage.getItem('gitTData')) || null;
        if (localData) {
            setListData(localData);
            setIsLoading(false);
        } else {
            fetchListData();
        }
    }, []);

    async function fetchListData() {
        const response = await getListItems();
        if (!response.error) {
            setListData(response.data.items);
            setIsLoading(false);

            localStorage.setItem('gitTData', JSON.stringify(response.data.items))
        } else {
            setError(true);
        }
    }


    return <>
        <ul className="h-[80vh] overflow-scroll px-4 overflow-x-hidden">
            {isLoading ? <p>Loading...</p> : listData.map(item => {
                console.log(item)
                return <ListItem key={item.id} data={item} />
            })}
        </ul>
    </>

}

export default List