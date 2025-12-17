import { JSX } from 'react';
import './style.css';

type CardProps = {
  className: string;
  normalizer: JSX.Element;
  visible?: number[];
  visibleId?: number;
  hasBackgroundImage?: boolean;
};

export default function Card(props: CardProps): JSX.Element {
  const shouldAnimate = Boolean(
    props.visible &&
      (props.visibleId !== undefined
        ? props.visible.includes(props.visibleId)
        : props.visible.length),
  );

  return (
    <div
      className={`card ${props.className} ${
        shouldAnimate ? 'is-visible' : ''
      } ${props.hasBackgroundImage ? 'background-image' : ''}`}
    >
      {props.normalizer}
    </div>
  );
}
