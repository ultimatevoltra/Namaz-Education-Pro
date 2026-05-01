"use client";

import { SessionProvider } from "next-auth/react";
import "../styles/globals.css";

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="theme-color" content="#1d4ed8" />
        <link rel="manifest" href="/manifest.json" />
      </head>
      <body>
        <SessionProvider>
          {children}
        </SessionProvider>
        <script>
          {`if ('serviceWorker' in navigator) {
            navigator.serviceWorker.register('/sw.js');
          }`}
        </script>
      </body>
    </html>
  );
}