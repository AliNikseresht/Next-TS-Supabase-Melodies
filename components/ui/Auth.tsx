"use client";

import { supabase } from "@/utils/supabaseClient";
import { useState } from "react";

export default function Auth() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSignUp = async () => {
    setLoading(true);
    setError("");

    const { error } = await supabase.auth.signUp({
      email,
      password,
    });

    if (error) {
      setError(error.message);
    } else {
      alert("Bestätigungs-E-Mail gesendet. Bitte überprüfen Sie Ihre E-Mail!");
    }

    setLoading(false);
  };

  const handleLogin = async () => {
    setLoading(true);
    setError("");

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      setError(error.message);
    }

    setLoading(false);
  };

  return (
    <div className="max-w-md mx-auto p-4">
      <h2 className="text-xl font-semibold mb-4 text-yellow-600">Anmelden / Registrieren</h2>
      <input
        type="email"
        placeholder="E-Mail"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="w-full p-2 border rounded-md mb-2 border-yellow-600"
      />
      <input
        type="password"
        placeholder="Passwort"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        className="w-full p-2 border rounded-md mb-2 border-yellow-600"
      />
      <button
        onClick={handleLogin}
        disabled={loading}
        className="bg-yellow-600 text-[#000] px-4 py-2 rounded-md w-full mb-2"
      >
        Login
      </button>
      <button
        onClick={handleSignUp}
        disabled={loading}
        className="border border-yellow-600 text-yellow-600 px-4 py-2 rounded-md w-full"
      >
        Registrieren
      </button>
      {error && <p className="text-red-500 mt-2">{error}</p>}
    </div>
  );
}
