import { useState } from "react";
import SearchBar from "./SearchBar";
import { RiEmotionSadLine } from "react-icons/ri";

import ListItem from "./ListItem";
import Loader from "./Loader";
import { useStore } from "@/store/store";

function List() {
    const { repoData, isLoading, filteredData, filterRepoData, isFiltered, clearFilterData } = useStore(state => state);
    const [error, setError] = useState(false);

    const currData = isFiltered ? filteredData : repoData

    function filteredTextHandler(text) {
        if(text != ''){
            filterRepoData(text);
            return;
        }
        clearFilterData();
    }

    return <>
        <SearchBar filterText={filteredTextHandler} />
        <ul className="h-[70dvh] overflow-scroll px-4 overflow-x-hidden justify-center items-center">
            {isLoading ? [...Array(10)].map((_, i) => <Loader />) : (currData.length ? currData.map((item, idx) => <ListItem
                key={item.id}
                data={item}
                isLast={currData.length - 1 == idx}
                loadNewPage={""} />) : <div className="w-full h-16 flex justify-center items-center text-md bg-[#F0F0F0] rounded-sm"><RiEmotionSadLine size={28} className="mr-2"/> No Results found</div>)}
        </ul>
    </>

}

export default List