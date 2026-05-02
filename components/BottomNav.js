'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
const nav = [
  { href: '/', label: 'Home', d: 'M3 9.5L12 3l9 6.5V20a1 1 0 01-1 1H5a1 1 0 01-1-1V9.5zM9 21V12h6v9' },
  { href: '/learn', label: 'Learn', d: 'M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253' },
  { href: '/quran', label: 'Quran', d: 'M12 6.042A8.967 8.967 0 006 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 016 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 016-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0018 18a8.967 8.967 0 00-6 2.292m0-14.25v14.25' },
  { href: '/tracker', label: 'Track', d: 'M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z' },
  { href: '/qibla', label: 'Qibla', d: 'M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z' },
  { href: '/tasbeeh', label: 'Tasbeeh', d: 'M12 2a10 10 0 100 20A10 10 0 0012 2zM12 8v4M12 16h.01' },
];
export default function BottomNav() {
  const path = usePathname();
  return (
    <nav className="btm">
      <div style={{ display:'flex', justifyContent:'space-around', alignItems:'center', paddingTop:8, paddingBottom:4 }}>
        {nav.map(({ href, label, d }) => {
          const active = path === href;
          return (
            <Link key={href} href={href} style={{ display:'flex', flexDirection:'column', alignItems:'center', gap:2, padding:'4px 8px', color:active?'#c9a227':'#5a6478', textDecoration:'none', transition:'color 0.2s', minWidth:0 }}>
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={active?2.2:1.7} strokeLinecap="round" strokeLinejoin="round"><path d={d}/></svg>
              <span style={{ fontSize:9, fontWeight:active?700:400, letterSpacing:0.3 }}>{label}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}