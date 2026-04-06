interface IconProps {
  name: string;
  filled?: boolean;
  style?: React.CSSProperties;
  className?: string;
}

export const Icon = ({ name, filled = false, style, className }: IconProps) => (
  <span
    className={`material-symbols-outlined${className ? ` ${className}` : ''}`}
    style={{
      ...(filled && { fontVariationSettings: "'FILL' 1, 'wght' 400, 'GRAD' 0, 'opsz' 24" }),
      ...style,
    }}
  >
    {name}
  </span>
);
