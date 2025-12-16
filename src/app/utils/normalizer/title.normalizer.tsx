import { TranslateFn } from '@/types/i18n/translate.type';

export const normalizeTitle = (t: TranslateFn, title: string) => {
  return (
    <>
      <span>{'$'}</span>
      {t(title)}
      <span>{'();'}</span>
    </>
  );
};

export const normalizeSubtitle = (
  t: TranslateFn,
  title: string,
  subtitle: string,
) => {
  return (
    <>
      <span>{'$'}</span>
      {t(title)}
      <span>{'->'}</span>
      {t(subtitle)}
      <span>{'();'}</span>
    </>
  );
};
