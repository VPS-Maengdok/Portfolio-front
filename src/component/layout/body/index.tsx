'use client';

import ProjectList from '../projectList';
import { useEffect, useState } from 'react';
import ProjectDetails from '../projectDetails';
import { useMenu } from '@/app/clientLayout';
import Introduction from '../introduction';
import Resume from '../resume';

import './style.css';

export default function Body() {
  const [selectedProject, setSelectedProject] = useState<number | null>(null);
  const { selectedMenu } = useMenu();
  const isProjectsMenu = selectedMenu === 'projects';
  const activeProject = isProjectsMenu ? selectedProject : null;

  useEffect(() => {
    const handleMenuChange = () => setSelectedProject(null);
    window.addEventListener('menu-change', handleMenuChange);
    return () => window.removeEventListener('menu-change', handleMenuChange);
  }, []);

  return (
    <div className="body">
      {!activeProject && selectedMenu === 'me' && <Introduction />}

      {!activeProject && isProjectsMenu && (
        <ProjectList onSelectedProjectChange={setSelectedProject} />
      )}

      {selectedProject && (
        <ProjectDetails
          project={selectedProject}
          onSelectedProjectChange={setSelectedProject}
        />
      )}

      {!activeProject && selectedMenu === 'cv' && (
        <Resume onSelectedProjectChange={setSelectedProject} />
      )}
    </div>
  );
}
