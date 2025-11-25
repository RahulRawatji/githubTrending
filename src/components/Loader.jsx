import { motion } from 'motion/react';

function Loader() {
    return <motion.p className="font-medium text-2xl font-sans"
        animate={{ opacity: [0, 1, 0] ,  color: ["#ff0000", "#00ff00", "#ff0000"]}}
        
        transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut"
        }}
    >Loading...</motion.p>
}

export default Loader;