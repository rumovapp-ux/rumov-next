"use client";

import { createClient } from "@supabase/supabase-js";

export default function TestPage() {
  console.log("🔵 TestPage loaded");

  // Lire les variables d'environnement
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  console.log("🟣 Vercel URL:", url);
  console.log("🟣 Vercel KEY:", key ? "OK (masquée)" : "❌ Undefined");

  // Si l'une des variables est absente → message clair
  if (!url || !key) {
    console.error("❌ Supabase URL or KEY missing!");
    return (
      <div style={{ padding: 30 }}>
        ❌ Erreur : NEXT_PUBLIC_SUPABASE_URL ou KEY est manquant dans Vercel.
      </div>
    );
  }

  // Client supabase
  const supabase = createClient(url, key);

  // Petite requête test
  async function testSupabase() {
    console.log("🔍 Envoi requête test à Supabase...");

    const { data, error } = await supabase.from("demandes_clients").select("client_id").limit(1);

    if (error) {
      console.error("❌ Erreur Supabase:", error);
    } else {
      console.log("✅ Réponse Supabase:", data);
    }
  }

  // Lancer le test au chargement
  testSupabase();

  return (
    <div style={{ padding: 30 }}>
      <h1>Test Supabase</h1>
      <p>Regarde la console (F12 → Console)</p>
    </div>
  );
}