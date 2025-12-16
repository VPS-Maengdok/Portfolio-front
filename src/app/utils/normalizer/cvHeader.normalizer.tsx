import { Curriculum } from '@/types/api/curriculum.type';
import { TranslateFn, TranslateListFn } from '@/types/i18n/translate.type';
import { normalizeCountries, normalizeCountry } from './country.normalizer';
import Icon, { IconName } from '@/component/ui/icon';
import { normalizeLinks } from './link.normalizer';
import { normalizeLanguages } from './language.normalizer';
import { normalizeWorkTypes } from './workType.normalizer';

export const normalizeHeader = (
  data: Curriculum,
  t: TranslateFn,
  tList: TranslateListFn,
  className: string,
) => {
  return (
    <div className={`${className}-content`} data-header-id={1}>
      {tList('header.title').map(
        (paragraph: string, index: number) =>
          index === 0 && <h3 key={index}>{paragraph}</h3>,
      )}
      <div className={`${className}-info-container`}>
        <div className={`${className} info`}>
          <p>
            {data.firstname} {data.lastname}
          </p>
        </div>

        {data.location && (
          <div className={`${className}-location`}>
            <Icon
              name={'PinIcon' as IconName}
              className={`icon ${className}-icon`}
              stroke="#e1ca99"
            />
            <p>{data?.city}, </p>
            {normalizeCountry(data.location, `${className}-location`)}
          </div>
        )}

        {data.link && <>{normalizeLinks(data.link, `${className}-link`)}</>}

        <div className={`${className}-contract-type-container`}>
          <p>{t('resume.contract.description')}</p>
          {tList('resume.contract.type').map((contract, index) => (
            <div
              key={`${className} contract-type-${index}`}
              className={`${className}-contract-type`}
            >
              <p>{contract}</p>
              {index < tList('resume.contract.type').length - 1 && (
                <span>{'|'}</span>
              )}
            </div>
          ))}
          {data.isFreelance ? (
            <>
              <span>{'|'}</span> {t('resume.freelance.true')}
            </>
          ) : undefined}
        </div>

        {data.workType && (
          <div className={`${className}-work-type`}>
            <p>{t('resume.workType.description')}</p>
            {normalizeWorkTypes(data.workType, `${className}-work-type`)}
          </div>
        )}

        {data.expectedCountry && (
          <div className={`${className}-expected-country`}>
            <p>{t('resume.expectedCountry.description')}</p>
            {normalizeCountries(data.expectedCountry, `${className}-expected`)}
          </div>
        )}

        {data.hasVisa ? (
          <>
            {data.visaAvailableFor && (
              <>
                <div>
                  <p>{t('resume.visaAvailableFor.description')}</p>
                  {normalizeCountries(
                    data.visaAvailableFor,
                    `${className}-visa-available-for`,
                  )}
                </div>
              </>
            )}
          </>
        ) : (
          <p>{t('resume.hasVisa')}</p>
        )}

        {data.language && (
          <div className={`${className}-language`}>
            <p>{t('resume.language.description')}</p>
            {normalizeLanguages(data.language, `${className}-language`)}
          </div>
        )}
      </div>
    </div>
  );
};
