'use client';

import { useIsMobileScreen } from '@/app/hooks/useIsMobileScreen';
import { normalizeHeader } from '@/app/utils/normalizer/cvHeader.normalizer';
import { normalizeEducation } from '@/app/utils/normalizer/education.normalizer';
import { normalizeExperience } from '@/app/utils/normalizer/experience.normalizer';
import { normalizeProject } from '@/app/utils/normalizer/project.normalizer';
import { normalizeSkills } from '@/app/utils/normalizer/skill.normalizer';
import { normalizeTechnologies } from '@/app/utils/normalizer/technology.normalizer';
import {
  normalizeSubtitle,
  normalizeTitle,
} from '@/app/utils/normalizer/title.normalizer';
import { useVisibilityObservers } from '@/app/utils/observer/visibility.observer';
import Card from '@/component/ui/card';
import Icon, { IconName } from '@/component/ui/icon';
import { useI18n } from '@/i18n/i18nContext';
import { getFirstCurriculum, getPDFBlob } from '@/service/api/curriculum.api';
import { Curriculum } from '@/types/api/curriculum.type';
import { Education } from '@/types/api/education.type';
import { Experience } from '@/types/api/experience.type';
import { Project } from '@/types/api/project.type';
import { useQuery } from '@tanstack/react-query';
import { useEffect, useMemo, useRef, useState } from 'react';
import './style.css';

type ResumeProps = {
  onSelectedProjectChange: (id: number | null) => void;
};

export default function Resume(props: ResumeProps) {
  const { t, tList } = useI18n();
  const [visibleHeaderIds, setVisibleHeaderIds] = useState<number[]>([]);
  const [visibleExperienceIds, setVisibleExperienceIds] = useState<number[]>(
    [],
  );
  const [visibleEducationIds, setVisibleEducationIds] = useState<number[]>([]);
  const [visibleProjectIds, setVisibleProjectIds] = useState<number[]>([]);
  const [visibleTechnologyIds, setVisibleTechnologyIds] = useState<number[]>(
    [],
  );
  const [visibleSkillIds, setVisibleSkillIds] = useState<number[]>([]);
  const headerContainerRef = useRef<HTMLDivElement>(null);
  const experienceContainerRef = useRef<HTMLDivElement>(null);
  const educationContainerRef = useRef<HTMLDivElement>(null);
  const projectContainerRef = useRef<HTMLDivElement>(null);
  const technologyContainerRef = useRef<HTMLDivElement>(null);
  const skillContainerRef = useRef<HTMLDivElement>(null);
  const [locale, setLocale] = useState<string | null>(() =>
    typeof window !== 'undefined' ? localStorage.getItem('locale') : null,
  );
  const className = 'resume';
  const isMobileScreen = useIsMobileScreen();

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

  const { data, isLoading } = useQuery<Curriculum>({
    queryKey: [`curriculum`, locale],
    queryFn: () => getFirstCurriculum(locale || undefined),
    enabled: true,
  });

  const visibilityConfigs = useMemo(() => {
    if (!data) {
      return [];
    }

    return [
      {
        containerRef: headerContainerRef,
        itemSelector: `.${className}-header-content`,
        datasetKey: 'headerId',
        setVisibleIds: setVisibleHeaderIds,
        dependencies: [data],
      },
      {
        containerRef: experienceContainerRef,
        itemSelector: `.${className}-experience-content`,
        datasetKey: 'experienceId',
        setVisibleIds: setVisibleExperienceIds,
        dependencies: [data?.experience?.length],
      },
      {
        containerRef: educationContainerRef,
        itemSelector: `.${className}-education-content`,
        datasetKey: 'educationId',
        setVisibleIds: setVisibleEducationIds,
        dependencies: [data?.education?.length],
      },
      {
        containerRef: projectContainerRef,
        itemSelector: `.${className}-project-content`,
        datasetKey: 'projectId',
        setVisibleIds: setVisibleProjectIds,
        dependencies: [data?.project?.length],
      },
      {
        containerRef: technologyContainerRef,
        itemSelector: `.${className}-technology-content`,
        datasetKey: 'technologyId',
        setVisibleIds: setVisibleTechnologyIds,
        dependencies: [data?.technology?.length],
      },
      {
        containerRef: skillContainerRef,
        itemSelector: `.${className}-skill-content`,
        datasetKey: 'skillId',
        setVisibleIds: setVisibleSkillIds,
        dependencies: [data?.skill?.length],
      },
    ];
  }, [data]);

  useVisibilityObservers(visibilityConfigs);

  if (isLoading) {
    return (
      <div className={`${className}`}>
        <h2>{normalizeTitle(t, 'resume.title')}</h2>
        <div className={`${className}-container is-loading`}>
          <p>{t('resume.loading')}</p>
        </div>
      </div>
    );
  }

  if (!data) {
    return (
      <div className={`${className}`}>
        <h2>{normalizeTitle(t, 'resume.title')}</h2>
        <div className={`${className}-container is-loading`}>
          <p>{t('resume.empty')}</p>
        </div>
      </div>
    );
  }

  const handleSelectedProject = (id: number) => {
    props.onSelectedProjectChange(id);
  };

  const handlePDF = async () => {
    if (!data) {
      return;
    }

    const newTab = window.open('', '_blank');
    if (!newTab) {
      return;
    }

    if (newTab.document.body) {
      newTab.document.body.textContent = `${t('resume.pdfPreparation')}`;
    }

    try {
      const blob = await getPDFBlob(data.id, locale ?? 'fr', 'inline');
      const url = URL.createObjectURL(blob);
      newTab.location.href = url;
      setTimeout(() => URL.revokeObjectURL(url), 60_000);
    } catch (error) {
      console.error(error);
      newTab.close();
    }
  };

  return (
    <div className={`${className}`}>
      <div className={`${className}-title`}>
        <h2>{normalizeTitle(t, 'resume.title')}</h2>
        <Icon
          name={`DownloadIcon` as IconName}
          className={`icon ${className}-download`}
          fill="#e1ca99"
          size={30}
          onClick={() => handlePDF()}
        />
      </div>

      <div className={`${className}-container`}>
        <div>
          <div className={`${className}-header`} ref={headerContainerRef}>
            <Card
              className={`${className}-header`}
              normalizer={normalizeHeader(
                data,
                t,
                tList,
                `${className}-header`,
              )}
              visible={visibleHeaderIds}
              visibleId={1}
            />
          </div>

          <div
            className={`${className}-experience`}
            ref={experienceContainerRef}
          >
            <h4>
              {normalizeSubtitle(
                t,
                isMobileScreen ? 'resume.mobileTitle' : 'resume.title',
                isMobileScreen
                  ? 'resume.experience.mobileTitle'
                  : 'resume.experience.title',
              )}
            </h4>
            {data.experience &&
              data.experience.map((experience: Experience) => (
                <Card
                  key={experience.id}
                  className={`${className}-experience`}
                  normalizer={normalizeExperience(
                    experience,
                    t,
                    `${className}-experience`,
                    isMobileScreen,
                  )}
                  visible={visibleExperienceIds}
                  visibleId={experience.id}
                />
              ))}
          </div>

          <div className={`${className}-education`} ref={educationContainerRef}>
            <h4>
              {normalizeSubtitle(
                t,
                isMobileScreen ? 'resume.mobileTitle' : 'resume.title',
                'resume.education.title',
              )}
            </h4>
            {data.education &&
              data.education.map((education: Education) => (
                <Card
                  key={education.id}
                  className={`${className}-education`}
                  normalizer={normalizeEducation(
                    education,
                    `${className}-education`,
                    isMobileScreen,
                  )}
                  visible={visibleEducationIds}
                  visibleId={education.id}
                />
              ))}
          </div>

          <div className={`${className}-project`} ref={projectContainerRef}>
            <h4>
              {normalizeSubtitle(
                t,
                isMobileScreen ? 'resume.mobileTitle' : 'resume.title',
                'resume.project.title',
              )}
            </h4>
            {data.project &&
              data.project.map((project: Project) => (
                <Card
                  key={project.id}
                  className={`${className}-project clickable`}
                  normalizer={normalizeProject(
                    project,
                    t,
                    `${className}-project`,
                    (id: number) => handleSelectedProject(id),
                    isMobileScreen,
                  )}
                  visible={visibleProjectIds}
                  visibleId={project.id}
                />
              ))}
          </div>

          <div
            className={`${className}-technology`}
            ref={technologyContainerRef}
          >
            <h4>
              {normalizeSubtitle(
                t,
                isMobileScreen ? 'resume.mobileTitle' : 'resume.title',
                'resume.technology.title',
              )}
            </h4>
            <Card
              className={`${className}-technology`}
              normalizer={normalizeTechnologies(
                data.technology ?? [],
                `${className}-technology`,
              )}
              visible={visibleTechnologyIds}
            />
          </div>

          <div className={`${className}-skill`} ref={skillContainerRef}>
            <h4>
              {normalizeSubtitle(
                t,
                isMobileScreen ? 'resume.mobileTitle' : 'resume.title',
                'resume.skill.title',
              )}
            </h4>
            <Card
              className={`${className}-skill`}
              normalizer={normalizeSkills(
                data.skill ?? [],
                `${className}-skill`,
              )}
              visible={visibleSkillIds}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
