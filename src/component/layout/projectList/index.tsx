'use client';

import { useEffect, useRef, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { Project } from '@/types/api/project.type';
import { getProjects } from '@/service/api/project.api';
import Card from '@/component/ui/card';
import { normalizeProjects } from '@/app/utils/normalizer/project.normalizer';
import { useI18n } from '@/i18n/i18nContext';
import { useVisibilityObserver } from '@/app/utils/observer/visibility.observer';
import { normalizeTitle } from '@/app/utils/normalizer/title.normalizer';

import './style.css';

type ProjectListProps = {
  onSelectedProjectChange: (id: number | null) => void;
};

export default function ProjectList(props: ProjectListProps) {
  const { t } = useI18n();
  const [locale, setLocale] = useState<string | null>(() =>
    typeof window !== 'undefined' ? localStorage.getItem('locale') : null,
  );
  const [visibleProjectIds, setVisibleProjectIds] = useState<number[]>([]);
  const projectContainerRef = useRef<HTMLDivElement>(null);
  const className = 'project-list';

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const handleStorage = () => setLocale(localStorage.getItem('locale'));
    window.addEventListener('storage', handleStorage);
    window.addEventListener('locale-change', handleStorage);
    return () => {
      window.removeEventListener('storage', handleStorage);
      window.removeEventListener('locale-change', handleStorage);
    };
  }, []);

  const { data, isLoading } = useQuery<Project[]>({
    queryKey: ['projects', locale],
    queryFn: () => getProjects(locale || undefined),
    enabled: true,
  });

  useVisibilityObserver({
    containerRef: projectContainerRef,
    itemSelector: `.${className}-project-content`,
    datasetKey: 'projectId',
    setVisibleIds: setVisibleProjectIds,
    dependencies: [data],
  });

  const handleSelectedProject = (id: number) => {
    props.onSelectedProjectChange(id);
  };

  if (isLoading) {
    return (
      <div className={`${className}`}>
        <h2>{normalizeTitle(t, 'projects.title')}</h2>
        <div className={`${className}-container is-loading`}>
          <p>Project list is loading...</p>
        </div>
      </div>
    );
  }

  if (!isLoading && !data) {
    return (
      <div className={`${className}`}>
        <h2>{normalizeTitle(t, 'projects.title')}</h2>
        <div className={`${className}-container is-loading`}>
          <p>
            Sorry! The translation is probably not ready yet... Change the
            language or come back later.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className={`${className}`}>
      <h2>{normalizeTitle(t, 'projects.title')}</h2>
      <div className={`${className}-container`} ref={projectContainerRef}>
        {data.map((project: Project) => (
          <Card
            key={project.id}
            className={`${className}-project clickable`}
            normalizer={normalizeProjects(
              project,
              t,
              `${className}-project`,
              (id: number) => handleSelectedProject(id),
            )}
            visible={visibleProjectIds}
            visibleId={project.id}
            hasBackgroundImage
          />
        ))}
      </div>
    </div>
  );
}
