'use client';
import { useLang } from './LangProvider';
export default function LangToggle() {
  const { lang, toggle } = useLang();
  return (
    <button
      onClick={toggle}
      title={lang === 'en' ? 'Switch to Bangla' : 'Switch to English'}
      style={{
        position: 'fixed', top: 16, right: 16, zIndex: 999,
        display: 'flex', alignItems: 'center', gap: 5,
        background: 'rgba(4,13,26,0.85)',
        backdropFilter: 'blur(16px)',
        border: '1px solid rgba(201,162,39,0.4)',
        borderRadius: 22,
        padding: '6px 13px',
        cursor: 'pointer',
        transition: 'all 0.2s',
        boxShadow: '0 2px 12px rgba(0,0,0,0.4)',
      }}
    >
      <span style={{ fontSize: 14 }}>{lang === 'en' ? '🇧🇩' : '🇬🇧'}</span>
      <span style={{
        fontSize: 12, fontWeight: 700, letterSpacing: 0.4,
        background: 'linear-gradient(135deg,#c9a227,#f0d060)',
        WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
      }}>
        {lang === 'en' ? 'বাং' : 'EN'}
      </span>
    </button>
  );
}