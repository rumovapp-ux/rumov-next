// app/accepted/AcceptedDetails.tsx
"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from 'next/navigation';

// Définition de l'interface pour le typage si vous le souhaitez
// interface DemandeClient { /* ... */ } 

// L'URL de votre Edge Function
const EDGE_FUNCTION_URL = `${process.env.NEXT_PUBLIC_SUPABASE_URL}/functions/v1/get-mission`;


export default function AcceptedDetails() {
  const searchParams = useSearchParams();
  const matchId = searchParams.get("match_id");
  const token = searchParams.get("token");

  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  // Le reste de votre logique useEffect/fetch...
  useEffect(() => {
    // ... (Votre logique load() avec le fetch) ...
    // Vous devez utiliser la valeur matchId et token ici
    
    if (!matchId || !token) {
        setErrorMsg("Lien invalide ou incomplet.");
        setLoading(false);
        return;
    }
    
    // ... Le code load() avec le fetch va ici ...
    const load = async () => {
        // ... (Le code de fetch)
        try {
            const url = `${EDGE_FUNCTION_URL}?match_id=${matchId}&token=${token}`;
            const res = await fetch(url);
            const json = await res.json();
            
            if (!json.success) {
                setErrorMsg(json.error || "Erreur inconnue");
            } else {
                setData(json.demande);
            }
        } catch (e) {
            setErrorMsg("Impossible de contacter le serveur.");
        }
        setLoading(false);
    }
    load();
    
  }, [matchId, token]);


  // ... (Votre rendu final : loading, errorMsg, et les détails du client) ...
  if (loading) return <p style={{ padding: 30 }}>Chargement…</p>;
  if (errorMsg) return <p style={{ padding: 30, color: "red" }}>{errorMsg}</p>;

  return (
    // Le contenu du rendu de la page ACCEPTED
    <div /* ... styles ... */ >
        {/* ... Rendu de data.full_name, data.description, etc. ... */}
        <h1 style={{ color: "#1f8bff" }}>Détails de la mission</h1>
        {/* ... */}
        <h3>Client</h3>
        <p><b>Nom :</b> {data?.full_name}</p>
        {/* ... */}
    </div>
  );
}