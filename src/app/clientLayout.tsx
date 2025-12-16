'use client';

import { useState, createContext, useContext, ReactNode } from 'react';
import SidePanel from '@/component/layout/sidePanel';
import { MenuItems } from '@/types/layout/menu.type';

type MenuContextType = {
  selectedMenu: MenuItems;
  setSelectedMenu: (value: MenuItems) => void;
  resetSelection: () => void;
};

const MenuContext = createContext<MenuContextType | undefined>(undefined);

export function useMenu() {
  const context = useContext(MenuContext);
  if (!context) {
    throw new Error('useMenu must be used inside <MenuProvider>');
  }
  return context;
}

export default function ClientLayout({ children }: { children: ReactNode }) {
  const [selectedMenu, setSelectedMenu] = useState<MenuItems>('projects');
  const [, setSelectedProject] = useState<number | null>(null);

  const resetSelection = () => {
    setSelectedProject(null);
  };

  return (
    <MenuContext.Provider
      value={{ selectedMenu, setSelectedMenu, resetSelection }}
    >
      <div
        className="home"
        style={{
          display: 'grid',
          gridTemplateColumns: '1fr 2fr',
          gridTemplateRows: 'auto',
          gridTemplateAreas: '"sidePanel body"',
          height: '100vh',
        }}
      >
        <SidePanel onSelectProject={setSelectedProject} />
        {children}
      </div>
    </MenuContext.Provider>
  );
}
