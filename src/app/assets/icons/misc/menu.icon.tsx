import { FC, SVGProps } from 'react';

const MenuIcon: FC<SVGProps<SVGSVGElement>> = (props) => (
  <svg
    width={(props.width as number) * 1.5}
    viewBox="0 0 18 12"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path d="M0 12V10H18V12H0ZM0 7V5H18V7H0ZM0 2V0H18V2H0Z" fill={props.fill} />
  </svg>
);

export default MenuIcon;
