type Props = {
  className?: string;
};


export function TimelineDot({ className }: Props) {
  return (
    <svg
      className={className}
      viewBox="0 0 40 40"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <circle cx="20" cy="20" r="20" fill="var(--color-red-500)" />
      <circle cx="20" cy="20" r="16" fill="white" />
      <circle cx="20" cy="20" r="12" fill="var(--color-red-500)" />
    </svg>
  );
}