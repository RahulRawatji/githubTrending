import { motion, useInView } from "motion/react";
import { useRef } from "react";

function ListItem({ data }) {
    const itemRef = useRef(null);
    const isInView = useInView(itemRef, { amount: 0.6 })

    return <motion.li ref={itemRef} className="py-2 px-1 border my-2" id={data.id}
        animate={isInView ? { opacity: 1 } : { opacity: 0, }}
    >
        <span className="font-semibold font-mono">{data.name}</span>
        <p className="break-all">{data.description}</p>
        <div className="flex  justify-between px-1 mt-2 items-end">
            <div className="flex gap-2 items-end"><img src={data.owner.avatar_url} title="User Avatar" className="h-[40px] object-contain border rounded-lg" />
                <span className="font-medium">{data.owner.login}</span>
            </div>
            <span>{data.stargazers_count}</span>
        </div>

    </motion.li>
}

export default ListItem