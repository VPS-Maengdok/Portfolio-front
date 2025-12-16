import { Skill, SkillI18n } from '@/types/api/skill.type';
import { normalizeTranslations } from './translation.normalizer';

export const normalizeSkills = (skills: Skill[], className: string) => {
  return (
    <div className={`${className}-list-container`}>
      {skills?.map((skill: Skill, index: number) =>
        normalizeTranslations<SkillI18n>(skill.i18n).map((i18n) => (
          <div
            key={`${className}-${skill.id}-${i18n.locale.id}`}
            className={`${className}-content`}
            data-skill-id={skill.id}
          >
            <p className={`${className}-label`}>
              {i18n.label}
              {index < skills.length - 1 && <span>|</span>}
            </p>
          </div>
        )),
      )}
    </div>
  );
};
