'use client';

import { useQuery } from '@tanstack/react-query';
import { searchLink } from '@/service/api/link.api';
import { Link } from '@/types/api/link.type';
import Icon from '@/component/ui/icon';
import Locale from '@/component/ui/locale';

import './style.css';

export default function Footer() {
  const { data: linkedinData, isLoading: linkedinIsLoading } = useQuery<Link>({
    queryKey: ['linkedin-link'],
    queryFn: () => searchLink('Linkedin'),
    enabled: true,
  });
  const { data: githubData, isLoading: githubIsLoading } = useQuery<Link>({
    queryKey: ['github-link'],
    queryFn: () => searchLink('Github'),
    enabled: true,
  });

  return (
    <div className="footer">
      <div className="footer-github-icon-container">
        {!githubIsLoading && githubData && (
          <a href={githubData.url} target="_blank">
            <Icon
              className="footer-github-icon"
              name={githubData.icon}
              size={30}
            />
          </a>
        )}
      </div>
      <div className="footer-linkedin-icon-container">
        {!linkedinIsLoading && linkedinData && (
          <a href={linkedinData.url} target="_blank">
            <Icon
              className="footer-linkedin-icon"
              name={linkedinData.icon}
              size={30}
            />
          </a>
        )}
      </div>
      <Locale />
    </div>
  );
}
