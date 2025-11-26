import { motion } from 'motion/react';

function Loader() {
    return <motion.p className="font-medium text-2xl font-sans"
        animate={{ opacity: [0, 1, 0], color: ["#3b3636ff", "#456845ff", "#393535ff"] }}
        transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut"
        }}
    >Loading...</motion.p>
}

export default Loader;