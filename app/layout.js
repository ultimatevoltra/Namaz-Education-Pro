import './globals.css';
import BottomNav from '../components/BottomNav';
export const metadata = { title: 'Namaz Education Pro', description: 'Master Islamic Prayer' };
export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link href="https://fonts.googleapis.com/css2?family=Amiri:ital,wght@0,400;0,700;1,400&family=Inter:wght@300;400;500;600;700;800&display=swap" rel="stylesheet" />
        <meta name="theme-color" content="#040d1a" />
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1" />
      </head>
      <body className="geo-bg" style={{ background: '#040d1a' }}>
        <div style={{ minHeight: '100vh', paddingBottom: 72 }}>{children}</div>
        <BottomNav />
      </body>
    </html>
  );
}