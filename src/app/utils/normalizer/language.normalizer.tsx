import { Language, LanguageI18n } from '@/types/api/language.type';
import { normalizeTranslations } from './translation.normalizer';
import Icon, { IconName } from '@/component/ui/icon';

export const normalizeLanguages = (
  languages: Language[],
  className: string,
) => {
  return (
    <div className={`${className}-container`}>
      {languages?.map((language: Language, index: number) => (
        <div
          key={`${className}-${language.id}`}
          className={`${className}-content`}
        >
          {normalizeTranslations<LanguageI18n>(language.i18n).map((i18n) => (
            <div
              key={`${className}-${language.id}-${i18n.locale.id}`}
              className={`${className}-label`}
            >
              <Icon
                name={`${i18n.shortened}Icon` as IconName}
                className={`icon ${className}-icon`}
              />
              <p>{i18n.level}</p>
              {index < languages.length - 1 && <span>{'|'}</span>}
            </div>
          ))}
        </div>
      ))}
    </div>
  );
};
