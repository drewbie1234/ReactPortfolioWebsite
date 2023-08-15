import React from "react";
import styles from './ProjectCard.module.css';
import { motion } from 'framer-motion';


const HeroPortolio = (props) => {
    return (
    <section className={styles.projectSection}>
        <motion.div
            initial={{ opacity: 0, y: -100}}
            animate={{ opacity: 1, y: 0 }}
            transition={{ ease: "easeOut",  duration: 0.75 }}
        >
        <h1 className={styles.portfolioTitle}>Portolio</h1>
        </motion.div>
        {props.cards}
    </section>
    )
}
export default HeroPortolio; 