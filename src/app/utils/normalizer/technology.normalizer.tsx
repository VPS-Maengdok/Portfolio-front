import Icon, { IconName } from '@/component/ui/icon';
import { Technology } from '@/types/api/technology.type';

export const normalizeTechnologies = (
  technologies: Technology[],
  className: string,
) => {
  return (
    <div className={`${className}-container`}>
      {technologies.map((technology) => (
        <div
          key={`${className}-${technology.id}`}
          className={`${className}-content`}
          data-technology-id={technology.id}
        >
          <div className={`${className}-icon`}>
            <Icon
              name={technology.icon as IconName}
              className={`icon ${technology.icon}`}
            />
            <p>{technology.label}</p>
          </div>
        </div>
      ))}
    </div>
  );
};
