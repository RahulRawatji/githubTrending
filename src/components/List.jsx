import SearchBar from "./SearchBar";
import { RiEmotionSadLine, RiArrowUpLine } from "react-icons/ri";

import ListItem from "./ListItem";
import Loader from "./Loader";
import { useStore } from "@/store/store";
import { useRef, useState } from "react";

function List() {
    const { repoData, isLoading, filteredData, filterRepoData, isFiltered, clearFilterData } = useStore(state => state);
    const [showTopScrollBtn, setShowTopScrollBtn] = useState(false);
    const listRef = useRef();
    const currData = isFiltered ? filteredData : repoData;

    function filteredTextHandler(text) {
        if(text != ''){
            filterRepoData(text);
            return;
        }
        clearFilterData();
    }

    function scrollHandler(e){
        const headingText = document.getElementById('gt-top-heading-container');
        if(e.target.scrollTop>300){   
            headingText.classList.add('slide-out-up');
            if(!showTopScrollBtn){
                setShowTopScrollBtn(true)
            }
        }else{
            headingText.classList.remove('slide-out-up');
             if(showTopScrollBtn){
                setShowTopScrollBtn(false)
            }
        }
    }

    function srollBtnClickHandler(){
        listRef.current.scrollTo({
            top: 0,
            behavior: "smooth"
        });
    }

    return <>
        <SearchBar filterText={filteredTextHandler} />
        <ul ref={listRef} onScroll={scrollHandler} className="h-[90dvh] overflow-scroll px-4 overflow-x-hidden justify-center items-center">
            {isLoading ? [...Array(10)].map((_, i) => <Loader />) : (currData.length ? currData.map((item, idx) => <ListItem
                key={item.id}
                data={item}
                isLast={currData.length - 1 == idx}
                isFirst = {idx == 0} />) : <div className="w-full h-16 flex justify-center items-center text-md bg-[#F0F0F0] rounded-sm"><RiEmotionSadLine size={28} className="mr-2"/> No Results found</div>)}
        </ul>
        {showTopScrollBtn && 
            <div role="button" onClick={srollBtnClickHandler} className="absolute bottom-[60px] right-8 bg-red-200 w-10 h-10 text-md flex items-center justify-center rounded-full">
                <RiArrowUpLine/>
            </div>}
    </>

}

export default List