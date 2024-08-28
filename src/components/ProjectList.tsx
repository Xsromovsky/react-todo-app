import React from 'react'
import ProjectType from './Project'
import useProjectContext from '../hooks/useProjectContext'
import Project from './Project'

type Props = {}

const ProjectList = (props: Props) => {

    const projectContext = useProjectContext();

    const renderedProjects = projectContext.projects?.map(project => <Project project={project} key={project.id}/>);
    console.log(projectContext.projects);
    

  return (
        <div className='flex flex-wrap gap-3 bg-[#231c35] m-4'>
            {renderedProjects}
        </div>
  )
}

export default ProjectList