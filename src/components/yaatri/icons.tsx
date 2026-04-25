import type { SVGProps } from "react";

export function YaatriLogo(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
      <circle cx="15" cy="15" r="4" stroke="#C8B8FF" strokeWidth="0.8" fill="none" />
      <circle cx="15" cy="15" r="1.5" fill="#C8B8FF" />
      <path
        d="M15 8 Q20 11.5 20 15 Q20 18.5 15 22 Q10 18.5 10 15 Q10 11.5 15 8Z"
        stroke="#7F77DD"
        strokeWidth="0.7"
        fill="none"
      />
      <circle cx="15" cy="15" r="8" stroke="#534AB7" strokeWidth="0.4" fill="none" strokeDasharray="2 3" />
    </svg>
  );
}

export function HomeIcon(props: SVGProps<SVGSVGElement>) {
  return <svg viewBox="0 0 24 24" fill="none" {...props}><path d="M3 10.5L12 3l9 7.5V21h-6v-5h-6v5H3v-10.5Z" stroke="currentColor" strokeWidth="1.1" /></svg>;
}

export function PlanIcon(props: SVGProps<SVGSVGElement>) {
  return <svg viewBox="0 0 24 24" fill="none" {...props}><rect x="4" y="3" width="16" height="18" rx="2.5" stroke="currentColor" strokeWidth="1.1" /><path d="M8 8h8M8 12h8M8 16h5" stroke="currentColor" strokeWidth="1.1"/></svg>;
}

export function ExploreIcon(props: SVGProps<SVGSVGElement>) {
  return <svg viewBox="0 0 24 24" fill="none" {...props}><path d="M12 21s7-3.7 7-10a7 7 0 1 0-14 0c0 6.3 7 10 7 10Z" stroke="currentColor" strokeWidth="1.1"/><circle cx="12" cy="11" r="2.5" stroke="currentColor" strokeWidth="1.1"/></svg>;
}

export function WalletIcon(props: SVGProps<SVGSVGElement>) {
  return <svg viewBox="0 0 24 24" fill="none" {...props}><rect x="3" y="6" width="18" height="13" rx="2.5" stroke="currentColor" strokeWidth="1.1"/><path d="M16 11h5v3h-5a1.5 1.5 0 0 1 0-3Z" stroke="currentColor" strokeWidth="1.1"/></svg>;
}

export function AccountIcon(props: SVGProps<SVGSVGElement>) {
  return <svg viewBox="0 0 24 24" fill="none" {...props}><circle cx="12" cy="8" r="3.5" stroke="currentColor" strokeWidth="1.1"/><path d="M4 20a8 8 0 0 1 16 0" stroke="currentColor" strokeWidth="1.1"/></svg>;
}
