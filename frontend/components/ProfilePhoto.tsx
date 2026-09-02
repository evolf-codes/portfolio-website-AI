/* eslint-disable @next/next/no-img-element -- local portrait asset */
type Props = {
  className?: string;
  priority?: boolean;
};

export function ProfilePhoto({ className = "", priority = false }: Props) {
  return (
    <img
      src="/images/eric-volfson.jpg"
      alt="Eric Volfson, QA Manager"
      width={640}
      height={640}
      className={`profile-photo ${className}`.trim()}
      loading={priority ? "eager" : "lazy"}
      decoding="async"
    />
  );
}
