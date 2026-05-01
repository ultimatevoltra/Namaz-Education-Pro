"use client";

import { useSession, signOut } from "next-auth/react";
import Link from "next/link";
import Card from "@namaz/ui/Card";

export default function Home() {
  const { data: session } = useSession();

  return (
    <div style={{ padding: 40, fontFamily: "sans-serif" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <h1>🕌 Namaz Education Pro</h1>
        {session && (
          <button
            onClick={() => signOut({ callbackUrl: "/" })}
            style={{
              padding: "10px 20px",
              background: "#ef4444",
              color: "white",
              border: "none",
              borderRadius: 8,
              cursor: "pointer"
            }}
          >
            Sign Out
          </button>
        )}
      </div>

      {!session ? (
        <Card title="🔐 Welcome">
          <p>Sign in to access your learning dashboard and track progress.</p>
          <div style={{ display: "flex", gap: 10, marginTop: 20 }}>
            <Link href="/auth/signin">
              <button
                style={{
                  padding: "10px 20px",
                  background: "#1d4ed8",
                  color: "white",
                  border: "none",
                  borderRadius: 8,
                  cursor: "pointer"
                }}
              >
                Sign In
              </button>
            </Link>
            <Link href="/auth/signup">
              <button
                style={{
                  padding: "10px 20px",
                  background: "#16a34a",
                  color: "white",
                  border: "none",
                  borderRadius: 8,
                  cursor: "pointer"
                }}
              >
                Sign Up
              </button>
            </Link>
          </div>
        </Card>
      ) : (
        <Card title="📊 Dashboard">
          <p>Welcome, {session.user?.name}!</p>
          <Link href="/dashboard">
            <button
              style={{
                marginTop: 10,
                padding: "10px 20px",
                background: "#1d4ed8",
                color: "white",
                border: "none",
                borderRadius: 8,
                cursor: "pointer"
              }}
            >
              Go to Dashboard →
            </button>
          </Link>
        </Card>
      )}

      <Card title="📖 Features">
        <ul>
          <li>✅ Step-by-step Salah learning</li>
          <li>✅ Bangla AI Imam guidance</li>
          <li>✅ 3D prayer visualization</li>
          <li>✅ Offline support</li>
          <li>✅ Progress tracking</li>
          <li>✅ Mistake detection</li>
        </ul>
      </Card>
    </div>
  );
}