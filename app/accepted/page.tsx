"use client";

import { useEffect, useState } from "react";


export default function AcceptedPage({ searchParams }: { searchParams: any }) {
  const matchId = searchParams.match_id;
  const token = searchParams.token;

  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  console.log("URLSUPABASE DETECTEE PAR NEXT :", process.env.NEXT_PUBLIC_SUPABASE_URL);
  console.log("matchId :", matchId);
  console.log("token :", token);

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
      }};

    load();
  }, [matchId, token]);

  if (loading) return <p style={{ padding: 30 }}>Chargement…</p>;
  if (errorMsg) return <p style={{ padding: 30, color: "red" }}>{errorMsg}</p>;

  return (
    <div
      style={{
        fontFamily: "Arial, sans-serif",
        padding: "24px",
        maxWidth: "700px",
        margin: "40px auto",
        background: "#fff",
        borderRadius: "10px",
        boxShadow: "0 4px 18px rgba(0,0,0,0.08)",
      }}
    >
      <h1 style={{ color: "#1f8bff" }}>Détails de la mission</h1>

      {data.delai_souhaite === "moins_de_48h" ? (
        <p
          style={{
            background: "#ffefef",
            padding: "12px",
            borderLeft: "4px solid #c0392b",
            borderRadius: 6,
          }}
        >
          ⚠ Demande urgente — Vous êtes le seul artisan à pouvoir intervenir.
        </p>
      ) : (
        <p
          style={{
            background: "#e8f8f1",
            padding: "12px",
            borderLeft: "4px solid #27ae60",
            borderRadius: 6,
          }}
        >
          Demande non urgente — Le client peut être contacté par plusieurs artisans.
        </p>
      )}

      <h3>Client</h3>
      <p><b>Nom :</b> {data.full_name}</p>
      <p><b>Téléphone :</b> {data.phone}</p>

      <h3>Adresse</h3>
      <p>
        {data.address_line}, {data.ville} ({data.client_cp})
      </p>

      <h3>Description</h3>
      <p>{data.description}</p>

      {data.photo_url && (
        <>
          <h3>Photo jointe</h3>
          <img
            src={data.photo_url}
            alt="photo"
            style={{
              maxWidth: "100%",
              borderRadius: "8px",
              marginTop: "10px",
              border: "1px solid #ccc",
            }}
          />
        </>
      )}

      <a
        href="/"
        style={{
          marginTop: "30px",
          display: "inline-block",
          padding: "12px 20px",
          background: "#1f8bff",
          color: "white",
          borderRadius: "8px",
          textDecoration: "none",
          fontWeight: "bold",
        }}
      >
        Retour au site
      </a>
    </div>
  );
}
