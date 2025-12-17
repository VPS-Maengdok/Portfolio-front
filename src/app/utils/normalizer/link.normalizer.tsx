import Icon, { IconName } from '@/component/ui/icon';
import { Link, LinkI18n } from '@/types/api/link.type';
import { normalizeTranslations } from './translation.normalizer';

export const getPath = (url: string): string => {
  return new URL(url).pathname;
};

export const normalizeLinks = (links: Link[], className: string) => {
  return (
    <div className={`${className}-container`}>
      {links?.map((link: Link) => (
        <div key={`${className}-${link.id}`} className={`${className}-content`}>
          <a
            href={link?.url ?? link?.repositoryUrl ?? undefined}
            target="_blank"
          >
            <Icon
              name={link.icon as IconName}
              className={`icon ${link.icon}`}
            />
            {normalizeTranslations<LinkI18n>(link.i18n).map((i18n) => (
              <div
                key={`${className}-${link.id}-${i18n.locale.id}`}
                className={`${className}-link`}
              >
                <p>{i18n.label}</p>
              </div>
            ))}
          </a>

          <span>{'|'}</span>
          {link?.url && <p>{getPath(link.url)}</p>}
          {link?.repositoryUrl && <p>{getPath(link.repositoryUrl)}</p>}
        </div>
      ))}
    </div>
  );
};
