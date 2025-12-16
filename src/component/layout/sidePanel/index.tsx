'use client';

import Menu from '@/component/layout/menu';
import Footer from '../footer';
import { useI18n } from '@/i18n/i18nContext';
import { useMenu } from '@/app/clientLayout';
import { MenuItems } from '@/types/layout/menu.type';

import './style.css';

type SidePanelProps = {
  onSelectProject: (id: number | null) => void;
};

export default function SidePanel(props: SidePanelProps) {
  const { t, tList } = useI18n();
  const { selectedMenu, setSelectedMenu, resetSelection } = useMenu();

  const handleSelectMenu = (key: MenuItems) => {
    resetSelection();
    props.onSelectProject(null);
    setSelectedMenu(key);
    if (typeof window !== 'undefined') {
      window.dispatchEvent(new Event('menu-change'));
    }
  };

  return (
    <div className="sidePanel">
      <div className="informations">
        <h1>Maengdok</h1>
        <h2>
          Axel Baldocchi{' '}
          <sup className="pronunciation">
            <span>/[</span>
            {t('header.pronounciation')}
            <span>]/</span>
          </sup>
        </h2>
        <div className="titles">
          {tList('header.title').map((paragraph: string, index: number) => (
            <span key={index}>{paragraph}</span>
          ))}
        </div>
      </div>

      <Menu selected={selectedMenu} onSelect={handleSelectMenu} />
      <Footer />
    </div>
  );
}
