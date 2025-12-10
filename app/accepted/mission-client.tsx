"use client";

import { useEffect, useState } from "react";

export default function MissionDetails({ initialData }: { initialData: any }) {
  const { matchId, token } = initialData;

  const [loading, setLoading] = useState(true);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [mission, setMission] = useState<any>(null);

  useEffect(() => {
    if (!matchId || !token) {
      setErrorMsg("Lien invalide ou incomplet.");
      setLoading(false);
      return;
    }

    console.log("matchId =", matchId);
    console.log("token =", token);

    const load = async () => {
      try {
        const url = `${process.env.NEXT_PUBLIC_SUPABASE_URL}/functions/v1/get-mission?match_id=${matchId}&token=${token}`;
        const res = await fetch(url);
        const json = await res.json();

        console.log("Réponse Supabase:", json);

        if (!json.success) {
          setErrorMsg(json.error || "Erreur inconnue");
          setLoading(false);
          return;
        }

        setMission(json.demande);
        setLoading(false);
      } catch (e) {
        setErrorMsg("Impossible de contacter le serveur.");
        setLoading(false);
      }
    };

    load();
  }, [matchId, token]);

  if (loading) return <p>Chargement…</p>;
  if (errorMsg) return <p style={{ color: "red" }}>{errorMsg}</p>;

  return (
    <div>
      <h1>Détails de la mission</h1>
      <pre>{JSON.stringify(mission, null, 2)}</pre>
    </div>
  );
}
