"use client";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Card from "@namaz/ui/Card";
import Link from "next/link";

export default function Dashboard() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/auth/signin");
    } else if (status === "authenticated") {
      fetchStats();
    }
  }, [status]);

  const fetchStats = async () => {
    try {
      const res = await fetch("/api/progress/stats");
      const data = await res.json();
      setStats(data);
    } catch (error) {
      console.error("Failed to fetch stats", error);
    } finally {
      setLoading(false);
    }
  };

  if (status === "loading" || loading) {
    return <div style={{ padding: 40 }}>Loading...</div>;
  }

  return (
    <div style={{ padding: 40 }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <h1>🕌 Welcome, {session?.user?.name}!</h1>
        <Link href="/">
          <button
            style={{
              padding: "10px 20px",
              background: "#6b7280",
              color: "white",
              border: "none",
              borderRadius: 8,
              cursor: "pointer"
            }}
          >
            ← Home
          </button>
        </Link>
      </div>

      <Card title="👤 Profile">
        <p><strong>Name:</strong> {session?.user?.name}</p>
        <p><strong>Email:</strong> {session?.user?.email}</p>
        <p><strong>Joined:</strong> {new Date().toLocaleDateString()}</p>
      </Card>

      <Card title="📊 Today's Stats">
        {stats ? (
          <>
            <p>✅ <strong>Completed Prayers:</strong> {stats.completedPrayers || 0}</p>
            <p>📈 <strong>Average Score:</strong> {stats.averageScore?.toFixed(1) || 0}%</p>
            <p>⏱️ <strong>Total Duration:</strong> {Math.floor((stats.totalDuration || 0) / 60)} minutes</p>
            <p>❌ <strong>Mistakes Detected:</strong> {stats.mistakeCount || 0}</p>
          </>
        ) : (
          <p>No data yet. Complete your first prayer to see stats!</p>
        )}
      </Card>

      <Card title="🕰️ Prayer Times">
        <ul>
          <li>🌅 <strong>Fajr:</strong> 5:30 AM</li>
          <li>☀️ <strong>Zuhr:</strong> 12:45 PM</li>
          <li>🌤️ <strong>Asr:</strong> 4:15 PM</li>
          <li>🌅 <strong>Maghrib:</strong> 7:00 PM</li>
          <li>🌙 <strong>Isha:</strong> 8:30 PM</li>
        </ul>
      </Card>
    </div>
  );
}