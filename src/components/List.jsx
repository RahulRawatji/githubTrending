import { useEffect, useState } from "react";
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
            setListData(prev => [...prev, ...response.data.items]);
            setIsLoading(false);

            localStorage.setItem(`gitTData`, JSON.stringify([...listData, ...response.data.items]))
        } else {
            setError(true);
        }
    }

    return <>
        <ul className="h-[80dvh] overflow-scroll px-4 overflow-x-hidden justify-center items-center md:px-[25%]">
            {isLoading ? <Loader /> : listData.map((item, idx) => <ListItem
                key={item.id}
                data={item}
                isLast={listData.length - 1 == idx}
                loadNewPage={setPageChange} />)}
        </ul>
    </>

}

export default List