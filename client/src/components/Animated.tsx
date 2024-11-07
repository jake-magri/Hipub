import {  motion } from 'framer-motion';


const animations = {
  initial: { x: '100%', opacity: 0 },
  animate: { x: 0, opacity: 1 },
  exit: { x: '-100%', opacity: 0 },
  transition: { duration: 0.5 }
};

const Animated = ({children}) => {
    return (
      <motion.div variants={animations} 
      initial='initial'
      animate='animate' 
      exit='exit'
      transition={ {duration: 1}}>
        {children}
      </motion.div>
    )
  }
  
  export default Animated