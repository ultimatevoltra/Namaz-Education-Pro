"use client";

import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import Card from "@namaz/ui/Card";
import Link from "next/link";

export default function SignIn() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSignIn = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    const result = await signIn("credentials", {
      email,
      password,
      redirect: false
    });

    if (result?.error) {
      setError(result.error);
      setLoading(false);
    } else {
      router.push("/dashboard");
    }
  };

  return (
    <div style={{ padding: 40, maxWidth: 400, margin: "0 auto", marginTop: 40 }}>
      <Card title="🔐 Sign In">
        <form onSubmit={handleSignIn}>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            style={{ width: "100%", padding: 8, marginBottom: 12, border: "1px solid #ddd", borderRadius: 4 }}
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            style={{ width: "100%", padding: 8, marginBottom: 12, border: "1px solid #ddd", borderRadius: 4 }}
          />
          {error && <p style={{ color: "#ef4444", marginBottom: 12 }}>❌ {error}</p>}
          <button
            type="submit"
            disabled={loading}
            style={{
              width: "100%",
              padding: 10,
              background: "#1d4ed8",
              color: "white",
              border: "none",
              borderRadius: 8,
              cursor: loading ? "not-allowed" : "pointer",
              opacity: loading ? 0.6 : 1
            }}
          >
            {loading ? "Signing in..." : "Sign In"}
          </button>
        </form>

        <hr style={{ margin: "20px 0" }} />

        <button
          onClick={() => signIn("github", { callbackUrl: "/dashboard" })}
          style={{
            width: "100%",
            padding: 10,
            marginBottom: 8,
            background: "#333",
            color: "white",
            border: "none",
            borderRadius: 8,
            cursor: "pointer"
          }}
        >
          Sign in with GitHub
        </button>

        <button
          onClick={() => signIn("google", { callbackUrl: "/dashboard" })}
          style={{
            width: "100%",
            padding: 10,
            background: "#ea4335",
            color: "white",
            border: "none",
            borderRadius: 8,
            cursor: "pointer"
          }}
        >
          Sign in with Google
        </button>

        <p style={{ textAlign: "center", marginTop: 20 }}>
          No account? <Link href="/auth/signup" style={{ color: "#1d4ed8", textDecoration: "none" }}>Sign up</Link>
        </p>
      </Card>
    </div>
  );
}