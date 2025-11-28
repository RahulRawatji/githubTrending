import { motion, useInView } from "motion/react";
import { useRef } from "react";
import { RiStarLine, RiGitForkLine, RiComputerLine } from "react-icons/ri";

import { useStore } from "@/store/store";
import { Spinner } from "@/components/ui/spinner"
import Loader from "./Loader";


function ListItem({ data, isLast }) {
    const itemRef = useRef(null);
    const spinner = useRef(null);
    const isloadMoreItemsInView = useInView(spinner, { amount: 0.9 });
    const isInView = useInView(itemRef, { amount: 0.6 });
    const { isFiltered, updatePage, isLoading } = useStore(state => state);

    const delayFun = function (){
        let timer = null;
        return function (){
            if(timer){
                clearTimeout(timer)
            }
            (function(){
                setTimeout(() => {
                    if(!isLoading){
                        updatePage();
                    }
                    if(spinner){
                        spinner.current.style.display = "flex";
                    }
                }, 4000)
            })(isLoading)
        }
    }

    const updateList = delayFun();
    if (isloadMoreItemsInView) { 
        spinner.current.style.display = "none";
        updateList();
    }

    return <>
        <motion.li ref={itemRef} 
                role="button"
                onClick={() => window.open(data?.html_url)} 
                className="py-4 px-6 rounded bg-[#F0F0F0] my-6 cursor-pointer hover:scale-98 hover:bg-[#F5EFE6] hover:border-[#896C6C] dark:bg-zinc-900 dark:hover:bg-zinc-500" 
                id={data.id}
                animate={isInView ? { opacity: 1 } : { opacity: 0, }}
        >
            <div className="flex gap-2 items-center">
                <img src={data?.owner?.avatar_url} loading="lazy" title="User Avatar" className="h-[40px] object-contain bg-gray-100 rounded-lg" />
                <span className="font-medium text-md dark:text-zinc-200">{data?.owner?.login}</span>
                <span className="font-medium text-sm dark:text-zinc-200">/ {data?.name}</span>
            </div>
            <p className="break-all mt-4 text-sm dark:text-zinc-200">{data?.description || "No Description Provided"}</p>
            <div className="flex justify-start px-1 mt-2 items-end gap-3">
                <div className="flex mr-1 justify-end">
                    <span className="text-xs text-yellow-500" dark:text-zinc-200 >{data?.stargazers_count}</span>
                    <RiStarLine className="text-yellow-500 ml-1" />
                </div>
                <div className="flex mr-1 justify-end">
                    <span className="text-xs text-blue-500">{data?.forks}</span>
                    <RiGitForkLine className="text-blue-500 ml-1" />
                </div>
                <div className="flex mr-1 justify-end">
                    <span className="text-xs text-red-300">{data?.language}</span>
                    <RiComputerLine className="text-red-300 ml-1" />
                </div>
            </div>
        </motion.li>
        {isLast && !isFiltered ? <div className="w-full flex justify-center h-12">
            {isloadMoreItemsInView ? [...Array(10)].map((_, i) => <Loader />) : <Spinner ref={spinner} className="text-xl" />}      
        </div> : null}
    </>
}

export default ListItem