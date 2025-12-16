'use client';

import { useI18n } from '@/i18n/i18nContext';
import { MenuItems } from '@/types/layout/menu.type';

import './style.css';

type MenuProps = {
  selected: MenuItems;
  onSelect: (key: MenuItems) => void;
};

export default function Menu(props: MenuProps) {
  const { t } = useI18n();

  return (
    <div className="menu">
      <h2
        className={props.selected === 'me' ? 'selected' : ''}
        onClick={() => {
          props.onSelect('me');
        }}
      >
        {props.selected === 'me' ? (
          <>
            01 - <span>{'$'}</span>
            {t('menu.whoAmISelected')}
            <span>{'();'}</span>
          </>
        ) : (
          `01 - ${t('menu.whoAmI')}`
        )}
      </h2>
      <h2
        className={props.selected === 'projects' ? 'selected' : ''}
        onClick={() => {
          props.onSelect('projects');
        }}
      >
        {props.selected === 'projects' ? (
          <>
            02 - <span>{'$'}</span>
            {t('menu.projectsSelected')}
            <span>{'();'}</span>
          </>
        ) : (
          `02 - ${t('menu.projects')}`
        )}
      </h2>
      <h2
        className={props.selected === 'cv' ? 'selected' : ''}
        onClick={() => {
          props.onSelect('cv');
        }}
      >
        {props.selected === 'cv' ? (
          <>
            03 - <span>{'$'}</span>
            {t('menu.cvSelected')}
            <span>{'();'}</span>
          </>
        ) : (
          `03 - ${t('menu.cv')}`
        )}
      </h2>
    </div>
  );
}
