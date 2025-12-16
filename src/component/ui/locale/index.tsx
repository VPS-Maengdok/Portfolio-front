import { getLocales } from '@/service/api/locale.api';
import Icon, { IconName } from '@/component/ui/icon';
import { Locale as L, Locale } from '@/types/api/locale.type';
import { useQuery } from '@tanstack/react-query';
import { useState } from 'react';
import { LocaleType } from '@/types/i18n/locale.type';
import { useI18n } from '@/i18n/i18nContext';

import './style.css';

export default function Locale() {
  const { locale, setLocale } = useI18n();
  const [openLanguageDisplay, setOpenLanguageDisplay] =
    useState<boolean>(false);

  const { data, error, isLoading } = useQuery<L>({
    queryKey: ['locales'],
    queryFn: () => getLocales(),
    enabled: true,
  });

  const locales = data ?? [];

  const selectedLocale =
    locales.find((l: { shortened: string | null }) => l.shortened === locale) ??
    locales[0];

  const orderedLocales = selectedLocale
    ? [
        selectedLocale,
        ...locales.filter(
          (l: { shortened: string }) =>
            l.shortened !== selectedLocale.shortened,
        ),
      ]
    : locales;

  const handleLanguageDisplay = (isHovered: boolean) => {
    setOpenLanguageDisplay(isHovered);
  };

  const handleLanguage = (choice: LocaleType) => {
    setLocale(choice);
  };

  return (
    <div
      className={`locale-icons ${openLanguageDisplay ? 'opened' : 'closed'}`}
      onMouseEnter={() => handleLanguageDisplay(true)}
      onMouseLeave={() => handleLanguageDisplay(false)}
    >
      {!isLoading && selectedLocale && (
        <>
          {!openLanguageDisplay && (
            <div className="locale-list">
              <Icon
                key={selectedLocale.id}
                className="locale-icon selected"
                name={`${selectedLocale.shortened}Icon` as IconName}
                size={30}
                onClick={() =>
                  handleLanguage(selectedLocale.shortened as LocaleType)
                }
              />
            </div>
          )}

          {openLanguageDisplay && (
            <div className="locale-list">
              {orderedLocales.map((l: Locale) => (
                <Icon
                  key={l.id}
                  className={`locale-icon ${
                    locale === l.shortened ? 'selected' : ''
                  }`}
                  name={`${l.shortened}Icon` as IconName}
                  size={30}
                  onClick={() => handleLanguage(l.shortened as LocaleType)}
                />
              ))}
            </div>
          )}
        </>
      )}
    </div>
  );
}
