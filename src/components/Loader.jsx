import { motion } from 'motion/react';
import { Skeleton } from "@/components/ui/skeleton"

function Loader() {
    return <motion.p className="mb-4"
    >
      <Skeleton className="h-[100px] w-full bg-zinc-200" />
     </motion.p>
}

export default Loader;