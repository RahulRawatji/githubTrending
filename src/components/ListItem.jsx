import { motion, useInView } from "motion/react";
import { useRef } from "react";

function ListItem({key, data, isLast }) {
    const itemRef = useRef(null);
    const loadMoreRef = useRef();
    const isInView = useInView(itemRef, { amount: 0.6 });
    const isLastItemInView = useInView(loadMoreRef,{amount:0.1});

    if(isLastItemInView){
        console.log('LoadMOre data')
    }

    return <>
    <motion.li key={key} ref={itemRef} role="button" onClick={()=>window.open(data.html_url)} className="py-2 px-1 rounded bg-[#8FABD4] my-2 scale-y-95 hover:scale-110 cursor-pointer" id={data.id}
        animate={isInView ? { opacity: 1 } : { opacity: 0, }}
       
    >
        <span className="font-semibold font-mono">{data.name}</span>
        <p className="break-all">{data.description}</p>
        <div className="flex  justify-between px-1 mt-2 items-end">
            <div className="flex gap-2 items-end"><img src={data.owner.avatar_url} title="User Avatar" className="h-[40px] object-contain bg-gray-100 rounded-lg" />
                <span className="font-medium">{data.owner.login}</span>
            </div>
            <div className="flex mr-1">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="#EFECE3" className="size-6">
                    <path fillRule="evenodd" d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.006 5.404.434c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.434 2.082-5.005Z" clipRule="evenodd" />
                </svg>
                <span className="font-semibold" style={{color:'#EFECE3'}} >{data.stargazers_count}</span>
            </div>
        </div>
    </motion.li>
    {isLast ? <div ref={loadMoreRef}>
            {/* <button>Load More</button> */}
        </div>: null}
    </>
}

export default ListItem