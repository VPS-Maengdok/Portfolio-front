'use client';

import { useI18n } from '@/i18n/i18nContext';
import { useState, useEffect } from 'react';

import './style.css';

export default function Introduction() {
  const { t, tList } = useI18n();
  const [visibleMap, setVisibleMap] = useState<Record<string, boolean>>({});

  useEffect(() => {
    const nodes = document.querySelectorAll<HTMLElement>('[data-reveal-id]');
    if (!nodes.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const id = entry.target.getAttribute('data-reveal-id') || '';
            setVisibleMap((prev) =>
              prev[id] ? prev : { ...prev, [id]: true },
            );
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.2, rootMargin: '0px 0px -10% 0px' },
    );

    nodes.forEach((node) => observer.observe(node));
    return () => observer.disconnect();
  }, []);

  return (
    <div className="introduction">
      <h2>
        <span>{'$'}</span>
        {t('introduction.selfIntroduction.title')}
        <span>{'();'}</span>
      </h2>
      <div className="container">
        <div className="title-introduction-container">
          <div
            className={`introduction-description ${
              visibleMap.introduction ? 'is-visible' : ''
            }`}
            data-reveal-id="introduction"
          >
            {tList('introduction.selfIntroduction.description').map(
              (paragraph: string, index: number) => (
                <div
                  key={index}
                  dangerouslySetInnerHTML={{
                    __html: paragraph,
                  }}
                />
              ),
            )}
          </div>
        </div>

        <div className="journey-container">
          <h3>
            <span>{'$'}</span>
            {t('introduction.selfIntroduction.title')}
            <span>{'->'}</span>
            {t('introduction.journey.title')}
            <span>{'();'}</span>
          </h3>
          <div
            className={`journey-description ${
              visibleMap.journey ? 'is-visible' : ''
            }`}
            data-reveal-id="journey"
          >
            {tList('introduction.journey.description').map(
              (paragraph: string, index: number) => (
                <div
                  key={index}
                  dangerouslySetInnerHTML={{
                    __html: paragraph,
                  }}
                />
              ),
            )}
          </div>
        </div>

        <div className="motivation-container">
          <h3>
            <span>{'$'}</span>
            {t('introduction.selfIntroduction.title')}
            <span>{'->'}</span>
            {t('introduction.motivation.title')}
            <span>{'();'}</span>
          </h3>
          <div
            className={`motivation-description ${
              visibleMap.motivation ? 'is-visible' : ''
            }`}
            data-reveal-id="motivation"
          >
            {tList('introduction.motivation.description').map(
              (paragraph: string, index: number) => (
                <div
                  key={index}
                  dangerouslySetInnerHTML={{
                    __html: paragraph,
                  }}
                />
              ),
            )}
          </div>
        </div>

        <div className="lookingfor-container">
          <h3>
            <span>{'$'}</span>
            {t('introduction.selfIntroduction.title')}
            <span>{'->'}</span>
            {t('introduction.lookingFor.title')}
            <span>{'();'}</span>
          </h3>
          <div
            className={`lookingfor-description ${
              visibleMap.lookingfor ? 'is-visible' : ''
            }`}
            data-reveal-id="lookingfor"
          >
            {tList('introduction.lookingFor.description').map(
              (paragraph: string, index: number) => (
                <div
                  key={index}
                  dangerouslySetInnerHTML={{
                    __html: paragraph,
                  }}
                />
              ),
            )}
          </div>
        </div>

        <div className="passion-container">
          <h3>
            <span>{'$'}</span>
            {t('introduction.selfIntroduction.title')}
            <span>{'->'}</span>
            {t('introduction.passion.title')}
            <span>{'();'}</span>
          </h3>
          <div
            className={`passion-description ${
              visibleMap.passion ? 'is-visible' : ''
            }`}
            data-reveal-id="passion"
          >
            {tList('introduction.passion.description').map(
              (paragraph: string, index: number) => (
                <div
                  key={index}
                  dangerouslySetInnerHTML={{
                    __html: paragraph,
                  }}
                />
              ),
            )}
          </div>
        </div>

        <div className="mentions-container">
          <h3>
            <span>{'$'}</span>
            {t('introduction.selfIntroduction.title')}
            <span>{'->'}</span>
            {t('introduction.mentions.title')}
            <span>{'();'}</span>
          </h3>
          <div
            className={`mentions-description ${
              visibleMap.passion ? 'is-visible' : ''
            }`}
            data-reveal-id="mentions"
          >
            {tList('introduction.mentions.description').map(
              (paragraph: string, index: number) => (
                <div
                  key={index}
                  dangerouslySetInnerHTML={{
                    __html: paragraph,
                  }}
                />
              ),
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
