import SearchBar from "./SearchBar";
import { RiEmotionSadLine } from "react-icons/ri";

import ListItem from "./ListItem";
import Loader from "./Loader";
import { useStore } from "@/store/store";

function List() {
    const { repoData, isLoading, filteredData, filterRepoData, isFiltered, clearFilterData } = useStore(state => state);
  
    const currData = isFiltered ? filteredData : repoData

    function filteredTextHandler(text) {
        if(text != ''){
            filterRepoData(text);
            return;
        }
        clearFilterData();
    }

    function listion(e){
         const headingText = document.getElementById('gt-top-heading-container');
        if(e.target.scrollTop>300){   
            headingText.classList.add('slide-out-up');
        }else{
            headingText.classList.remove('slide-out-up')
        }
    }

    return <>
        <SearchBar filterText={filteredTextHandler} />
        <ul onScroll={listion} className="h-[70dvh] overflow-scroll px-4 overflow-x-hidden justify-center items-center">
            {isLoading ? [...Array(10)].map((_, i) => <Loader />) : (currData.length ? currData.map((item, idx) => <ListItem
                key={item.id}
                data={item}
                isLast={currData.length - 1 == idx}
                isFirst = {idx == 0} />) : <div className="w-full h-16 flex justify-center items-center text-md bg-[#F0F0F0] rounded-sm"><RiEmotionSadLine size={28} className="mr-2"/> No Results found</div>)}
        </ul>
    </>

}

export default List