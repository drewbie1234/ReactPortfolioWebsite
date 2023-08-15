import React from "react";
import styles from './ProjectCard.module.css';
import { motion } from 'framer-motion';

function ProjectCard(props) {
    return(
            <motion.div 
                className={styles.div1}
                style={{backgroundColor: `${props.backgroundColor}`}}
                initial={{ opacity: 0, x: 500}}
                animate={{ opacity: 1, x: 0 }}
                transition={{ ease: "easeOut", duration: 0.5 }}
            >
                <div 
                    className={styles.div2}
                                       
                >
                    <img className={styles.projectCardImage} src={props.ProjectImage} alt={props.ProjectName}/>
                </div>
                <div className={styles.div3}>
                    <div>Project Name: {props.ProjectName}</div>
                    <div>{props.ProjectText}</div>
                    <div>{props.ProjectLanguages}</div>
                </div>
            </motion.div>
    )
}

export default ProjectCard 