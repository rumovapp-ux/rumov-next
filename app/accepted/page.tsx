"use client";

import { useEffect, useState } from "react";

export default function AcceptedPage({ searchParams }) {
  const matchId = searchParams?.match_id;
  const token = searchParams?.token;

  console.log("matchId =", matchId);
  console.log("token =", token);

  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [errorMsg, setErrorMsg] = useState(null);

  useEffect(() => {
    if (!matchId || !token) {
      setErrorMsg("Lien invalide ou incomplet.");
      setLoading(false);
      return;
    }

    const load = async () => {
      try {
       
       
       const url = `${process.env.NEXT_PUBLIC_SUPABASE_URL}/functions/v1/get-mission?match_id=${matchId}&token=${token}`;
        const res = await fetch(url);
        const json = await res.json();

        if (!json.success) {
          setErrorMsg(json.error || "Erreur inconnue");
          setLoading(false);
          return;
        }

        setData(json.demande);
        setLoading(false);
      } catch (e) {
        setErrorMsg("Impossible de contacter le serveur.");
        setLoading(false);
      }
    };

    load();
  }, [matchId, token]);

  if (loading) return <p style={{ padding: 30 }}>Chargement…</p>;
  if (errorMsg) return <p style={{ padding: 30, color: "red" }}>{errorMsg}</p>;

  return (
    <div style={{ padding: 30 }}>
      <h1>Détails de la mission</h1>
      <pre>{JSON.stringify(data, null, 2)}</pre>
    </div>
  );
}
