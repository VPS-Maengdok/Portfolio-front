'use client';

import { useMenu, useMenuControl, useMenuVisibility } from '@/app/clientLayout';
import { useIsMobileScreen } from '@/app/hooks/useIsMobileScreen';
import Icon, { IconName } from '@/component/ui/icon';
import { useEffect, useState } from 'react';
import Introduction from '../introduction';
import ProjectDetails from '../projectDetails';
import ProjectList from '../projectList';
import Resume from '../resume';
import './style.css';

export default function Body() {
  const [selectedProject, setSelectedProject] = useState<number | null>(null);
  const { selectedMenu } = useMenu();
  const isProjectsMenu = selectedMenu === 'projects';
  const hasSelectedProject = selectedProject !== null;

  useEffect(() => {
    const handleMenuChange = () => setSelectedProject(null);
    window.addEventListener('menu-change', handleMenuChange);
    return () => window.removeEventListener('menu-change', handleMenuChange);
  }, []);

  const isMobileScreen = useIsMobileScreen();

  const setOpenMenu = useMenuControl();
  const isMenuOpen = useMenuVisibility();
  const handleOnClick = () => {
    setOpenMenu(true);
  };

  const handleOverlayClick = () => setOpenMenu(false);

  return (
    <div className="body">
      {isMenuOpen && isMobileScreen && (
        <div className="body-overlay" onClick={handleOverlayClick} />
      )}
      {isMobileScreen && (
        <>
          <Icon
            name={`MenuIcon` as IconName}
            className="icon hamburger-menu"
            size={30}
            fill="#e1ca99"
            onClick={() => handleOnClick()}
          />
        </>
      )}
      {!hasSelectedProject && selectedMenu === 'me' && <Introduction />}

      {!hasSelectedProject && isProjectsMenu && (
        <ProjectList onSelectedProjectChange={setSelectedProject} />
      )}

      {!hasSelectedProject && selectedMenu === 'cv' && (
        <Resume onSelectedProjectChange={setSelectedProject} />
      )}

      {hasSelectedProject && selectedProject !== null && (
        <ProjectDetails
          project={selectedProject}
          onSelectedProjectChange={setSelectedProject}
        />
      )}
    </div>
  );
}
