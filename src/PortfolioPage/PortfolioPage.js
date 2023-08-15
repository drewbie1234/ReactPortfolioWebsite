import React from "react";
import HeroPortfolio from "./HeroPortfolio";
import {projects} from './Projects'
import ProjectCard from "./ProjectCard";




function PortfolioPage() {
    const ProjectCards = projects.map((project, index) => (
        <ProjectCard
            key={index}
            ProjectName={project.projectName}
            ProjectImage={project.projectImage}
            ProjectText={project.projectText}
            ProjectLanguages={project.projectLanguages}
            backgroundColor={project.backgroundColor}
        />
    ));

    return (
        <>
            <HeroPortfolio cards={ProjectCards} />
        </>
    );
    
};

export default PortfolioPage