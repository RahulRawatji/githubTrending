import { motion, useInView } from "motion/react";
import { useRef } from "react";
import { RiStarLine, RiGitForkLine, RiComputerLine } from "react-icons/ri";


function ListItem({ data, isLast, loadNewPage }) {
    const itemRef = useRef(null);
    const isInView = useInView(itemRef, { amount: 0.6 });


    return <>
        <motion.li ref={itemRef} role="button" onClick={() => window.open(data?.html_url)} className="py-4 px-6 rounded bg-[#F0F0F0] my-6 cursor-pointer hover:scale-98 hover:bg-[#F5EFE6] hover:border-[#896C6C]" id={data.id}
            animate={isInView ? { opacity: 1 } : { opacity: 0, }}
        >
            <div className="flex gap-2 items-center">
                <img src={data?.owner?.avatar_url} loading="lazy" title="User Avatar" className="h-[40px] object-contain bg-gray-100 rounded-lg" />
                <span className="font-medium text-md">{data?.owner?.login}</span>
                <span className="font-medium text-md">{data?.name}</span>
            </div>
            <p className="break-all mt-4 text-sm">{data?.description || "No Description Provided"}</p>
            <div className="flex justify-start px-1 mt-2 items-end gap-3">
                <div className="flex mr-1 justify-end">
                    <span className="text-xs text-yellow-500" >{data?.stargazers_count}</span>
                    <RiStarLine className="text-yellow-500 ml-1"/>
                </div>
                <div className="flex mr-1 justify-end">
                    <span className="text-xs text-blue-500">{data?.forks}</span>
                    <RiGitForkLine className="text-blue-500 ml-1"/>
                </div>
                <div className="flex mr-1 justify-end">
                    <span className="text-xs text-red-300">{data?.language}</span>
                    <RiComputerLine className="text-red-300 ml-1"/>
                </div>
            </div>
        </motion.li>
        {isLast ? <div>
            <button className=" text-white py-2 rounded w-full bg-gray-400" onClick={() => loadNewPage(prev => prev + 1)}>Load More</button>
        </div> : null}
    </>
}

export default ListItem