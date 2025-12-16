import { Experience, ExperienceI18n } from '@/types/api/experience.type';
import { normalizeTranslations } from './translation.normalizer';
import { normalizeSkills } from './skill.normalizer';
import { normalizeTechnologies } from './technology.normalizer';
import { normalizeCountry } from './country.normalizer';
import { TranslateFn } from '@/types/i18n/translate.type';
import { normalizeDate } from './date.normalizer';

export const normalizeExperience = (
  experience: Experience,
  t: TranslateFn,
  className: string,
) => {
  return (
    <div className={`${className}-container`}>
      {normalizeTranslations<ExperienceI18n>(experience.i18n).map((i18n) => (
        <div
          key={`${className}-${experience.id}-${i18n.locale.id}`}
          data-experience-id={experience.id}
          className={`${className}-content`}
        >
          {experience?.technology && (
            <div className={`${className}-technology-container`}>
              {normalizeTechnologies(
                experience.technology,
                `${className}-technology`,
              )}
            </div>
          )}
          <h5>{i18n.label}</h5>
          {experience.company && (
            <div className={`${className}-company`}>
              <p>
                <span>@</span>
                <a href={experience.company.url ?? undefined} target="_blank">
                  {experience.company.label}
                </a>
              </p>
              <span>{'|'}</span>
              <p>{experience.company.city}, </p>
              {normalizeCountry(
                experience.company.country,
                `${className}-country`,
              )}
              <span>{'|'}</span>

              <div className={`${className}-company-dates`}>
                <p>{normalizeDate(experience.startingDate)}</p>
                <span> {'->'} </span>
                {experience.isCurrentWork ? (
                  <p>{t('resume.experience.actualWork')}</p>
                ) : (
                  <p>
                    {experience.endingDate
                      ? normalizeDate(experience.endingDate)
                      : undefined}
                  </p>
                )}
              </div>
            </div>
          )}

          {i18n.description && (
            <div
              className={`${className}-description`}
              dangerouslySetInnerHTML={{
                __html: i18n.description,
              }}
            />
          )}

          {!i18n.description && <div className={`${className}-description`} />}

          {experience?.skill && (
            <div>
              <h6>Skills</h6>
              {normalizeSkills(experience.skill, `${className}-skill`)}
            </div>
          )}
        </div>
      ))}
    </div>
  );
};
