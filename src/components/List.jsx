import { useEffect, useState } from "react";
import SearchBar from "./SearchBar";

import getListItems from "../api/getListItem";
import ListItem from "./ListItem";
import Loader from "./Loader";

function List() {
    const [listData, setListData] = useState([]);
    const [error, setError] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const [pageChange, setPageChange] = useState(1);
   

    useEffect(() => {
        const localData = JSON.parse(localStorage.getItem(`gitTData`)) || null;
        if (localData && pageChange == 1) {
            setListData(localData);
            setIsLoading(false);
        } else {
            fetchListData();
        }
    }, [pageChange]);

    async function fetchListData() {
        const response = await getListItems(pageChange);
        if (!response.error) {
            const tempListData = [...listData];
            setListData(prev => [...prev, ...response.data.items]);
            setIsLoading(false);
            localStorage.setItem(`gitTData`, JSON.stringify([...tempListData, ...response.data.items]))
        } else {
            setError(true);
        }
    }

    function filteredTextHandler(text){
       if(!text.length){
            const localData = JSON.parse(localStorage.getItem(`gitTData`)) || null;  
            setListData(prev=>localData);
       }else{
        const tempData = listData.filter(item=>item.name.toLowerCase().includes(text) || item?.owner?.login.toLowerCase().includes(text) );
        setListData(prev=>tempData)
       }
        
    }

    return <>
        <SearchBar filterText={filteredTextHandler}/>
        <ul className="h-[70dvh] overflow-scroll px-4 overflow-x-hidden justify-center items-center">
            {isLoading ? [...Array(10)].map((_, i)=><Loader />) : listData.map((item, idx) => <ListItem
                key={item.id}
                data={item}
                isLast={listData.length - 1 == idx}
                loadNewPage={setPageChange} />)}
        </ul>
    </>

}

export default List