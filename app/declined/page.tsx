// Ce JSX est affiché si la réponse du serveur (Edge Function) est positive.
export default function DeclinedDetails() {
  return (
    <div 
      className="details-container" // Utilisation de la classe CSS du formulaire si elle est globale
      style={{
        width: '100%', 
        maxWidth: '420px', // Cohérent avec la largeur du formulaire
        padding: '20px', 
        backgroundColor: '#ffffff', 
        border: '1px solid #d0d0d0', 
        borderRadius: '12px', 
        boxShadow: '0 4px 10px rgba(0, 0, 0, 0.08)',
        margin: '40px auto',
        fontFamily: 'Montserrat, sans-serif', // Police du formulaire
      }}
    >
      
      <h1 
        style={{
          marginBottom: '24px', 
          textAlign: 'center', 
          color: '#333', // Gris foncé pour le titre
          fontSize: '26px', 
          fontWeight: '600',
        }}
      >
        Demande refusée ❌
      </h1>

      <p style={{ 
        marginTop: "20px", 
        fontSize: "15px", // Taille cohérente avec le formulaire
        color: "#555",
        textAlign: "center", 
      }}>
        Merci, votre indisponibilité a bien été enregistrée.
      </p>

     <p style={{
      marginTop: "10px",
      color: "#555",
      textAlign: "center",
      
     }}>

       Cette mission ne vous sera pas proposée à nouveau  </p>

      <a
        href="/"
        style={{
          // Reprise du style du bouton SUBMIT
          marginTop: "30px",
          display: "block", // Rendre le bouton plein largeur comme le submit
          width: "100%",
          padding: "12px",
          background: "#111", // Couleur de base du bouton submit
          color: "white",
          borderRadius: "8px",
          textDecoration: "none",
          fontWeight: "600",
          textAlign: "center",
          transition: 'background 0.25s ease'
        }}
      >
        Retour au site
      </a>
      {/* Note : Pour le hover, vous devriez utiliser CSS Modules ou Tailwind */}
    </div>
  );

}
