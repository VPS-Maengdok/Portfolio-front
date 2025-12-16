import { Project, ProjectI18n } from '@/types/api/project.type';
import { normalizeTranslations } from './translation.normalizer';
import { normalizeTechnologies } from './technology.normalizer';
import { TranslateFn } from '@/types/i18n/translate.type';
import { normalizeSkills } from './skill.normalizer';

export const normalizeProject = (
  project: Project,
  t: TranslateFn,
  className: string,
  onClick?: (id: number) => void,
) => {
  const getProjectType = (project: Project) => {
    return project?.company?.id
      ? t('misc.projectType.workProject')
      : project?.school?.id
      ? t('misc.projectType.schoolProject')
      : t('misc.projectType.sideProject');
  };

  return (
    <div className={`${className}-container`}>
      {normalizeTranslations<ProjectI18n>(project.i18n).map((i18n) => (
        <div
          key={`${className}-${project.id}-${i18n.locale.id}`}
          className={`${className}-content`}
          data-project-id={project.id}
          onClick={onClick ? () => onClick(project.id) : undefined}
        >
          <div className={`${className}-header`}>
            <div className={`${className}-technology-container`}>
              {project?.technology &&
                normalizeTechnologies(
                  project.technology,
                  `${className}-technology`,
                )}
              <p>
                <span>/</span>
                {getProjectType(project)}
                <span>/</span>
              </p>
            </div>
            <h5>{i18n.label}</h5>
          </div>

          {i18n?.shortDescription && (
            <div
              className={`${className}-description`}
              dangerouslySetInnerHTML={{ __html: i18n.shortDescription }}
            />
          )}

          {i18n?.cvDescription && (
            <div
              className={`${className}-description`}
              dangerouslySetInnerHTML={{ __html: i18n.cvDescription }}
            />
          )}

          {!i18n.cvDescription && !i18n.shortDescription && (
            <div className={`${className}-description`} />
          )}

          {project?.skill && (
            <div className={`${className}-skill-block`}>
              <h6>Skills</h6>
              {normalizeSkills(project.skill, `${className}-skill`)}
            </div>
          )}
        </div>
      ))}
    </div>
  );
};
