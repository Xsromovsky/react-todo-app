import React, { useEffect } from 'react'
import SideBar from '../components/SideBar'
import HeaderComponent from '../components/HeaderComponent'
import ProjectList from '../components/ProjectList'
import useProjectContext from '../hooks/useProjectContext'
import DialogModal from '../components/DialogModal'
import { Dialog } from '@radix-ui/themes'
import TodoEdit from '../components/TodoEdit'
import ProjectCreate from '../components/ProjectCreate'

type Props = {}

const ProjectPage = (props: Props) => {
  const projectContext = useProjectContext()

  const handleCreate = (label:string) => {
    projectContext.newProject(label);
  };
  
  useEffect(()=>{
    projectContext.getAllProjects();
  },[])

  return (
    <div className='flex h-screen bg-[#231c35] '>
        <SideBar/>
        <div className='w-full flex flex-col'>
            <HeaderComponent title='Projects'>
              <DialogModal>
                <DialogModal.Button className='bg-[#484564] p-2 mb-2 rounded-full hover:bg-[#5b5271'>
                  new project
                </DialogModal.Button>
                <DialogModal.Content title='New Project'>
                  <ProjectCreate onCreate={handleCreate} title='New Project'/>
                </DialogModal.Content>
              </DialogModal>
            </HeaderComponent>
            <div className='flex-1 overflow-auto flex justify-center'>
              <ProjectList/>
            </div>
        </div>
        
    </div>
  )
}

export default ProjectPage