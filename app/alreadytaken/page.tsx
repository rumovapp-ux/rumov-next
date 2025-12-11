export default function AlreadyTakenPage() {
  return (
    <div style={{
      fontFamily: "Arial, sans-serif",
      padding: "24px",
      maxWidth: "700px",
      margin: "40px auto",
      background: "#fff",
      borderRadius: "10px",
      boxShadow: "0 4px 18px rgba(0,0,0,0.08)"
    }}>
      <h1 style={{ color: "#c0392b" }}>Demande déjà prise</h1>

      <p style={{ marginTop: "20px", fontSize: "18px" }}>
        Cette demande urgente a déjà été acceptée par un autre artisan.
      </p>

      <p style={{ marginTop: "10px", color: "#555" }}>
        Vous recevrez prochainement d’autres opportunités correspondant à votre zone d’intervention.
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
