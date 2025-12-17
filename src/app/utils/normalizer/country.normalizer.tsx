import Icon, { IconName } from '@/component/ui/icon';
import { Country, CountryI18n } from '@/types/api/country.type';
import { normalizeTranslations } from './translation.normalizer';

export const normalizeCountries = (
  countries: Country[],
  className: string,
  hasIcon: boolean = true,
) => {
  return (
    <div className={`${className}-content`}>
      {countries?.map((country: Country) => (
        <div
          key={`${className}-${country.id}`}
          className={`${className}-label`}
        >
          {hasIcon && (
            <Icon
              name={`${country.shortened}Icon` as IconName}
              className={`icon country-${country.id}`}
            />
          )}
          {normalizeTranslations<CountryI18n>(country.i18n).map((i18n) => (
            <p key={`${className}-${country.id}-${i18n.id}`}>{i18n.label}</p>
          ))}
        </div>
      ))}
    </div>
  );
};

export const normalizeCountry = (
  country: Country,
  className: string,
  hasIcon: boolean = true,
) => {
  return (
    <div className={`${className}-content`}>
      {hasIcon && (
        <Icon
          name={`${country.shortened}Icon` as IconName}
          className={`icon country-${country.id}`}
        />
      )}
      {normalizeTranslations<CountryI18n>(country.i18n).map((i18n) => (
        <p key={`${className}-${country.id}-${i18n.id}`}>{i18n.label}</p>
      ))}
    </div>
  );
};
