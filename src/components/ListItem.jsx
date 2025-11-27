import { motion, useInView } from "motion/react";
import { useRef } from "react";

function ListItem({ data, isLast, loadNewPage }) {
    const itemRef = useRef(null);
    const isInView = useInView(itemRef, { amount: 0.6 });


    return <>
        <motion.li ref={itemRef} role="button" onClick={() => window.open(data?.html_url)} className="py-4 px-6 rounded bg-[#F0F0F0] my-6 cursor-pointer" id={data.id}
            animate={isInView ? { opacity: 1 } : { opacity: 0, }}
        >
            <div className="flex gap-2 items-center">
                <img src={data?.owner?.avatar_url} loading="lazy" title="User Avatar" className="h-[40px] object-contain bg-gray-100 rounded-lg" />
                <span className="font-medium text-md">{data?.owner?.login}</span>
                <span className="font-medium text-md">{data?.name}</span>
            </div>
            <p className="break-all mt-4 text-sm">{data?.description || "No Description Provided"}</p>
            <div className="flex  justify-between px-1 mt-2 items-end">
                <div className="flex mr-1">
                    <svg
                        className="w-6 h-6 text-yellow-300"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                    <span className="font-semibold text-md text-yellow-300" >{data?.stargazers_count}</span>
                </div>
                <div>

                </div>
            </div>
        </motion.li>
        {isLast ? <div>
            <button className=" text-white py-2 rounded w-full bg-gray-400" onClick={() => loadNewPage(prev => prev + 1)}>Load More</button>
        </div> : null}
    </>
}

export default ListItem