import imgSrc from './react-logo.svg';

export const TranspileMe = ({ number }: { number: number }) => (
  <div>
    <img src={imgSrc} alt="logo" />
    {number}
  </div>
);
