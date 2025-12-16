'use client';

import { useI18n } from '@/i18n/i18nContext';
import { MenuItems } from '@/types/layout/menu.type';

import './style.css';
import { TranslateFn } from '@/types/i18n/translate.type';
import { JSX } from 'react';

type MenuProps = {
  selected: MenuItems;
  onSelect: (key: MenuItems) => void;
};

const formatTitle = (
  t: TranslateFn,
  translation: string,
  index: number,
  isSelected: boolean = false,
): JSX.Element => {
  return (
    <>
      <span className={`left-bracket ${isSelected ? 'selected' : ''}`}>[</span>
      <span className="index">{index}</span>
      <span className={`right-bracket ${isSelected ? 'selected' : ''}`}>]</span>
      <span className={`sep ${isSelected ? 'selected' : ''}`}>{'=>'}</span>
      {isSelected ? (
        <>
          <span className="functionStart">{'$'}</span>
          <span className="text">{t(translation)}</span>
          <span className="functionEnd">{'();'}</span>
        </>
      ) : (
        <span className="text">{t(translation)}</span>
      )}
    </>
  );
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
          <>{formatTitle(t, 'menu.whoAmISelected', 0, true)}</>
        ) : (
          <>{formatTitle(t, 'menu.whoAmI', 0)}</>
        )}
      </h2>
      <h2
        className={props.selected === 'projects' ? 'selected' : ''}
        onClick={() => {
          props.onSelect('projects');
        }}
      >
        {props.selected === 'projects' ? (
          <>{formatTitle(t, 'menu.projectsSelected', 1, true)}</>
        ) : (
          <>{formatTitle(t, 'menu.projects', 1)}</>
        )}
      </h2>
      <h2
        className={props.selected === 'cv' ? 'selected' : ''}
        onClick={() => {
          props.onSelect('cv');
        }}
      >
        {props.selected === 'cv' ? (
          <>{formatTitle(t, 'menu.cvSelected', 2, true)}</>
        ) : (
          <>{formatTitle(t, 'menu.cv', 2)}</>
        )}
      </h2>
    </div>
  );
}
