'use client';

import SidePanel from '@/component/layout/sidePanel';
import { MenuItems } from '@/types/layout/menu.type';
import { createContext, ReactNode, useContext, useState } from 'react';
import { useIsMobileScreen } from './hooks/useIsMobileScreen';

type MenuContextType = {
  selectedMenu: MenuItems;
  setSelectedMenu: (value: MenuItems) => void;
  resetSelection: () => void;
};

const MenuContext = createContext<MenuContextType | undefined>(undefined);

type MenuControlContextType = (value: boolean) => void;
const MenuControlContext = createContext<MenuControlContextType>(() => {
  // noop placeholder so hook consumers never throw
});

const MenuVisibilityContext = createContext<boolean>(false);

export function useMenu() {
  const context = useContext(MenuContext);
  if (!context) {
    throw new Error('useMenu must be used inside <MenuProvider>');
  }
  return context;
}

export function useMenuControl() {
  return useContext(MenuControlContext);
}

export function useMenuVisibility() {
  return useContext(MenuVisibilityContext);
}

export default function ClientLayout({ children }: { children: ReactNode }) {
  const [selectedMenu, setSelectedMenu] = useState<MenuItems>('projects');
  const [openMenu, setOpenMenu] = useState<boolean>(false);
  const [, setSelectedProject] = useState<number | null>(null);

  const resetSelection = () => {
    setSelectedProject(null);
  };

  const isMobileScreen = useIsMobileScreen();

  return (
    <MenuControlContext.Provider value={setOpenMenu}>
      <MenuVisibilityContext.Provider value={openMenu}>
        <MenuContext.Provider
          value={{ selectedMenu, setSelectedMenu, resetSelection }}
        >
          {!isMobileScreen ? (
            <div
              className="home"
              style={{
                display: 'grid',
                gridTemplateColumns: '1fr 3fr',
                gridTemplateRows: 'auto',
                gridTemplateAreas: '"sidePanel body"',
                height: '100vh',
              }}
            >
              <SidePanel onSelectProject={setSelectedProject} />
              {children}
            </div>
          ) : (
            <div
              className="home"
              style={{
                display: 'grid',
                gridTemplateColumns: '1fr',
                gridTemplateRows: 'auto',
                gridTemplateAreas: '"body"',
                height: '100vh',
              }}
            >
              <SidePanel
                onSelectProject={setSelectedProject}
                openMenu={openMenu}
              />
              {children}
            </div>
          )}
        </MenuContext.Provider>
      </MenuVisibilityContext.Provider>
    </MenuControlContext.Provider>
  );
}
