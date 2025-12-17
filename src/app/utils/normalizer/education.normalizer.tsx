import { Education, EducationI18n } from '@/types/api/education.type';
import { normalizeCountry } from './country.normalizer';
import { normalizeDate } from './date.normalizer';
import { normalizeSkills } from './skill.normalizer';
import { normalizeTechnologies } from './technology.normalizer';
import { normalizeTranslations } from './translation.normalizer';

export const normalizeEducation = (
  education: Education,
  className: string,
  isMobileScreen: boolean = false,
) => {
  return (
    <div className={`${className}-container`}>
      {normalizeTranslations<EducationI18n>(education.i18n).map((i18n) => (
        <div
          key={`${className}-${education.id}-${i18n.locale.id}`}
          className={`${className}-content`}
          data-education-id={education.id}
        >
          {education?.technology && (
            <div className={`${className} technology-container`}>
              {normalizeTechnologies(
                education.technology,
                `${className}-technology`,
              )}
            </div>
          )}
          <h5>
            {i18n.diploma} <span>|</span> {i18n.label}
          </h5>
          {education.school && (
            <div className={`${className}-school`}>
              <p>
                <span>@</span>
                <a href={education.school.url ?? undefined} target="_blank">
                  {education.school.label}
                </a>
              </p>

              <div className={`${className}-country-dates`}>
                {!isMobileScreen && <span>{'|'}</span>}
                <p>{education.school.city}, </p>
                {normalizeCountry(
                  education.school.country,
                  `${className}-country`,
                )}
                <span>{'|'}</span>

                <div className={`${className}-school-dates`}>
                  <p>{normalizeDate(education.startingDate)}</p>
                  <span>{'->'}</span>
                  <p>
                    {education.endingDate
                      ? normalizeDate(education.endingDate)
                      : undefined}
                  </p>
                </div>
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

          {education?.skill && (
            <div>
              <h6>Skills</h6>
              {normalizeSkills(education.skill, `${className}-skill`)}
            </div>
          )}
        </div>
      ))}
    </div>
  );
};
