'use client';

import { getProject } from '@/service/api/project.api';
import { normalizeTranslations } from '@/app/utils/normalizer/translation.normalizer';
import { Link, LinkI18n } from '@/types/api/link.type';
import { Project } from '@/types/api/project.type';
import { Skill, SkillI18n } from '@/types/api/skill.type';
import { Tag, TagI18n } from '@/types/api/tag.type';
import { Technology } from '@/types/api/technology.type';
import { useQuery } from '@tanstack/react-query';
import { useEffect, useRef, useState } from 'react';
import Icon, { IconName } from '@/component/ui/icon';
import { useI18n } from '@/i18n/i18nContext';

import './style.css';

type ProjectDetailsProps = {
  project: number;
  onSelectedProjectChange: (id: null) => void;
};

export default function ProjectDetails(props: ProjectDetailsProps) {
  const { t } = useI18n();
  const cardRef = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  const [locale, setLocale] = useState<string | null>(() =>
    typeof window !== 'undefined' ? localStorage.getItem('locale') : null,
  );

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

  const { data, isLoading } = useQuery<Project>({
    queryKey: [`project_${props.project}`, locale],
    queryFn: () => getProject(props.project, locale || undefined),
    enabled: true,
  });

  useEffect(() => {
    const node = cardRef.current;
    if (!node) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setVisible(true);
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.2, rootMargin: '0px 0px -10% 0px' },
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, [data]);

  if (isLoading) {
    return (
      <div className="project-details-container">
        <div className="return" onClick={() => handleOnClickReturn()}>
          <Icon
            name="ArrowLeftIcon"
            className={`icon arrow-return`}
            size={24}
          />
        </div>
        <div className="project-details is-loading">
          <p>{t('projectDetails.loading')}</p>
        </div>
      </div>
    );
  }

  const type = data?.company
    ? t('misc.projectType.workProject')
    : data?.school
    ? t('misc.projectType.schoolProject')
    : t('misc.projectType.sideProject');

  const handleOnClickReturn = () => {
    props.onSelectedProjectChange(null);
  };

  const getLinkHref = (link: Link): string | undefined => {
    if (link.url != null && link.url !== '') {
      return link.url;
    }

    if (link.repositoryUrl != null && link.repositoryUrl !== '') {
      return link.repositoryUrl;
    }

    return undefined;
  };

  const flatSkill =
    data.skill?.flatMap((skill: Skill) =>
      normalizeTranslations<SkillI18n>(skill.i18n).map((skillI18n) => ({
        ...skillI18n,
        skillId: skill.id,
      })),
    ) ?? [];

  return (
    <div className="project-details-container">
      <div className="return" onClick={() => handleOnClickReturn()}>
        <Icon
          name="ArrowLeftIcon"
          className={`icon arrow-return`}
          size={24}
          fill="#e1ca99"
        />
      </div>
      <div className="project-details">
        <div
          ref={cardRef}
          className={`details ${visible ? 'is-visible' : ''}`}
          style={{ transitionDelay: visible ? '80ms' : '0ms' }}
        >
          <div className="project-tag-container">
            <p>
              <span>/</span>
              {type}
              <span>/</span>
            </p>
            {data.tag?.flatMap((tag: Tag) =>
              normalizeTranslations<TagI18n>(tag.i18n).map((tagI18n) => (
                <div
                  key={`${tag.id}-${tagI18n.locale.id}`}
                  className="project-tag"
                >
                  <p>{tagI18n.label}</p>
                </div>
              )),
            )}
          </div>
          <div className="project-technology-container">
            {data.technology?.map((technology: Technology) => (
              <div key={technology.id} className="project-technology">
                <Icon
                  name={technology.icon as IconName}
                  className={`icon ${technology.icon}`}
                />
                <p>{technology.label}</p>
              </div>
            ))}
          </div>

          <div className="project-title-status-container">
            <h3>
              {data.i18n.label}
              {data.status && (
                <sup
                  key={`${data.status.id}-${data.status.i18n.locale.id}`}
                  className="project-status"
                >
                  {data.status.i18n.label}
                </sup>
              )}
            </h3>
          </div>
          <div className="project-company-school-container">
            {(data.company || data.school) && (
              <div className="project-company-school">
                {data.company && (
                  <p>
                    <span>@</span>
                    <a href={getLinkHref(data.company)} target="_blank">
                      {data.company.label}
                    </a>
                    <span> | </span>
                    {data.company.city}, {data.company.country.i18n.label}
                  </p>
                )}

                {data.school && (
                  <p>
                    <span>@</span>
                    {data.school.label}
                    <span>|</span> {data.school.country.i18n.label}
                  </p>
                )}
              </div>
            )}
          </div>

          <div className="project-description-container">
            <div
              className="project-description"
              dangerouslySetInnerHTML={{ __html: data.i18n.description }}
            />
          </div>
          <div className="project-skills-container">
            <h4>Skills</h4>
            <div className="project-skills">
              {flatSkill.map(
                (skillI18n: SkillI18n & { skillId: number }, index: number) => (
                  <div
                    key={`${skillI18n.skillId}-${skillI18n.locale.id}`}
                    className="project-skill"
                  >
                    <p>
                      {skillI18n.label}
                      {index < flatSkill.length - 1 && <span>|</span>}
                    </p>
                  </div>
                ),
              )}
            </div>
          </div>

          <div className="project-link-container">
            {data.link?.flatMap((link: Link) =>
              normalizeTranslations<LinkI18n>(link.i18n).map((linkI18n) => (
                <a
                  key={`${link.id}-${linkI18n.locale.id}`}
                  className="project-link"
                  href={getLinkHref(link)}
                  target="_blank"
                >
                  <Icon
                    name={link.icon as IconName}
                    className={`icon ${link.icon}`}
                  />
                  {linkI18n.label}
                </a>
              )),
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
