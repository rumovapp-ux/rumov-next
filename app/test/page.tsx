"use client";

import { createClient } from "@supabase/supabase-js";

export default function TestPage() {

  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );

  async function testSupabase() {
    const { data, error } = await supabase.from("demandes_clients").select("*").limit(1);
    console.log("🔎 TEST SUPABASE =>", { data, error });
  }

  testSupabase();

  return (
    <div style={{ padding: 24, fontFamily: "Arial" }}>
      <h1>Test Supabase</h1>
      <p>Regarde la console (F12 → Console).</p>
    </div>
  );
}