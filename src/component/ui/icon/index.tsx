import { icons } from '@/app/assets/icons/icon';
import { FC } from 'react';

export type IconName = keyof typeof icons;

interface IconProps {
  name: IconName;
  size?: number;
  fill?: string;
  stroke?: string;
  className?: string;
  onClick?: () => void;
}

const iconsThatRequireCurrentColor: IconName[] = [
  'SymfonyIcon',
  'GithubIcon',
  'ArrowLeftIcon',
];

const Icon: FC<IconProps> = ({
  name,
  className,
  fill,
  stroke,
  size = 16,
  ...props
}) => {
  const Component = icons[name];

  if (!Component) {
    return null;
  }

  return (
    <Component
      width={size}
      height={size}
      fill={
        iconsThatRequireCurrentColor.includes(name) && !fill
          ? 'currentColor'
          : fill
      }
      stroke={stroke}
      className={className}
      {...props}
    />
  );
};

export default Icon;
