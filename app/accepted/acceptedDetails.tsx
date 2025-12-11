// app/accepted/AcceptedDetails.tsx
"use client";

import { useEffect, useState, CSSProperties } from "react";
import { useSearchParams } from 'next/navigation';






const EDGE_FUNCTION_URL = `${process.env.NEXT_PUBLIC_SUPABASE_URL}/functions/v1/get-mission`;


export default function AcceptedDetails() {
  const searchParams = useSearchParams();
  const matchId = searchParams.get("match_id");
  const token = searchParams.get("token");

  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);


const primaryColor = '#00c0c7';
  const textDark = '#111';
  const spaceLg = '32px';
  const spaceMd = '24px';

// 🔑 1. DÉCLARATION DES STYLES (DOIT ÊTRE DANS LA FONCTION, HORS DU RETURN)
const sectionTitleStyle: CSSProperties = {
fontSize: '1.2rem',
fontWeight: '600',
color: textDark,
marginTop: spaceMd,
marginBottom: '10px',
borderBottom: `1px solid ${primaryColor}`,
paddingBottom: '5px',
fontFamily: 'Montserrat, sans-serif',
    
    // ✅ AJOUT : Centrer les titres de section pour l'équilibre
textAlign: 'center'
};

const detailTextStyle: CSSProperties = {
fontSize: '1rem',
color: '#555',
lineHeight: '1.6',
marginBottom: '10px',
display: "flex",
justifyContent: "center",
gap: "5px"
};

const contactButtonStyle: CSSProperties = {
    display: 'block',
    textAlign: 'center',
    border: 'none',
    width: '100%',
    padding: '12px',
    backgroundColor: '#00c0c7',
    color: '#ffffff',
    borderRadius: '8px',
    cursor: 'pointer',
    fontSize: '16px',
    fontWeight: '600',
    textDecoration: 'none',
    marginTop: '25px',
    transition: 'background 0.25s ease',
  };

const delaiMap: { [key: string]: string } = {
  'moins_de_48h': 'Moins de 48 heures (URGENT)',
  'moins_de_2_semaines': 'Dans les deux semaines (Standard)',
  'devis_seul': 'Devis seul (Flexible)'
  
};

// ... (votre useEffect commence ici)
  // Fin de la déclaration des styles

  useEffect(() => {
    // ... (Logique load() complète ici) ...
    if (!matchId || !token) {
        setErrorMsg("Lien invalide ou incomplet.");
        setLoading(false);
        return;
    }
    
    const load = async () => {
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


  if (loading) return <p style={{ padding: 30 }}>Chargement…</p>;
  if (errorMsg) return <p style={{ padding: 30, color: "red" }}>{errorMsg}</p>;

  return ( // 🔑 DÉBUT DU JSX
    <div 
      className="details-container"
      style={{
        width: '100%', 
        maxWidth: '420px', 
        padding: '20px', 
        backgroundColor: '#ffffff', 
        border: '1px solid #d0d0d0', 
        borderRadius: '12px', 
        boxShadow: '0 4px 10px rgba(0, 0, 0, 0.08)',
        margin: '20px auto'
      }}
    >
      
      <h1 
        style={{
          marginBottom: '24px', 
          textAlign: 'center', 
          color: '#00c0c7',
          fontSize: '26px', 
          fontWeight: '600',
        }}
      >
        Détails de la mission
      </h1>

      {/* 1. DESCRIPTION ET DÉLAIS */}
      <h3 style={sectionTitleStyle}>🔎 Description de la Mission</h3>

      <p style={detailTextStyle}>
    <b style={{ minWidth: '100px', display: 'inline-block' }}>Délai souhaité :</b> 
    {delaiMap[data?.delai_souhaite] || data?.delai_souhaite}
</p>
      <div style={{ marginBottom: '20px' }}>
    <p style={{ ...detailTextStyle, fontWeight: '600', marginBottom: '5px', display: 'block' }}>Description :</p>
    <p style={{ ...detailTextStyle, fontSize: '15px', color: '#555', lineHeight: '1.6', display: 'block' }}>
        {data?.description}
    </p>
</div>
          
      
      {/* 2. PHOTO JOINTE */}
      {data?.photo_url && (
        <>
          <h3 style={sectionTitleStyle}>🖼️ Photo jointe</h3>
          <img 
            src={data.photo_url} 
            alt="Photo fournie par le client pour la mission" 
            style={{ 
              maxWidth: '100%',
              height: 'auto', 
              borderRadius: '8px', 
              marginTop: '10px' 
            }} 
          />
        </>
      )}

      {/* 3. LOCALISATION */}
      <h3 style={sectionTitleStyle}>📍 Localisation</h3>
      <p style={detailTextStyle}>
    <b style={{ minWidth: '100px', display: 'inline-block' }}>Adresse :</b> 
    {data?.address_line} {data?.client_cp} {data?.ville}
</p>
      
      {/* 4. CLIENT & CONTACT */}
      <h3 style={sectionTitleStyle}>👤 Client & Contact</h3>
      <p style={detailTextStyle}>
    <b style={{ minWidth: '100px', display: 'inline-block' }}>Nom :</b> 
    {data?.full_name}
</p>
      <a
href={`tel:${data?.phone}`}
style={contactButtonStyle}
>
   📞 Appeler le Client ({data?.phone}) 
</a>
      
    </div> // FERMETURE DU DIV PRINCIPAL
  ); // FERMETURE DU RETURN
} // 🔑 FERMETURE DE LA FONCTION AcceptedDetails