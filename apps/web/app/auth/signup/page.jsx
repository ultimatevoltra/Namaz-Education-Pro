"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import Card from "@namaz/ui/Card";
import Link from "next/link";

export default function SignUp() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSignUp = async (e) => {
    e.preventDefault();
    setError("");

    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    if (password.length < 8) {
      setError("Password must be at least 8 characters");
      return;
    }

    setLoading(true);

    try {
      const res = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password, name })
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error);
        return;
      }

      router.push("/auth/signin?registered=true");
    } catch (err) {
      setError("Registration failed. Try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ padding: 40, maxWidth: 400, margin: "0 auto", marginTop: 40 }}>
      <Card title="📝 Create Account">
        <form onSubmit={handleSignUp}>
          <input
            type="text"
            placeholder="Full Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            style={{ width: "100%", padding: 8, marginBottom: 12, border: "1px solid #ddd", borderRadius: 4 }}
          />
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            style={{ width: "100%", padding: 8, marginBottom: 12, border: "1px solid #ddd", borderRadius: 4 }}
          />
          <input
            type="password"
            placeholder="Password (min 8 chars)"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            style={{ width: "100%", padding: 8, marginBottom: 12, border: "1px solid #ddd", borderRadius: 4 }}
          />
          <input
            type="password"
            placeholder="Confirm Password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            style={{ width: "100%", padding: 8, marginBottom: 12, border: "1px solid #ddd", borderRadius: 4 }}
          />
          {error && <p style={{ color: "#ef4444", marginBottom: 12 }}>❌ {error}</p>}
          <button
            type="submit"
            disabled={loading}
            style={{
              width: "100%",
              padding: 10,
              background: "#16a34a",
              color: "white",
              border: "none",
              borderRadius: 8,
              cursor: loading ? "not-allowed" : "pointer",
              opacity: loading ? 0.6 : 1
            }}
          >
            {loading ? "Creating account..." : "Sign Up"}
          </button>
        </form>

        <p style={{ textAlign: "center", marginTop: 20 }}>
          Already have an account? <Link href="/auth/signin" style={{ color: "#1d4ed8", textDecoration: "none" }}>Sign in</Link>
        </p>
      </Card>
    </div>
  );
}