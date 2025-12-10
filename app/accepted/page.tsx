export default function AcceptedPage() {
  return (
    <div style={{
      fontFamily: "Arial, sans-serif",
      padding: "24px",
      maxWidth: "700px",
      margin: "40px auto"
    }}>
      <h1>Demande acceptée ✔</h1>
      <p style={{ marginTop: "20px", fontSize: "18px" }}>
        Merci ! Vous avez confirmé votre disponibilité pour cette mission.
      </p>

      <p style={{ marginTop: "10px", color: "#555" }}>
        Vous allez maintenant pouvoir accéder aux coordonnées complètes du client.
      </p>

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
          fontWeight: "bold"
        }}
      >
        Retour au site
      </a>
    </div>
  );
}
