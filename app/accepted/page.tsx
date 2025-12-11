// app/accepted/page.tsx (NOUVEAU - Ceci est un Server Component)

// app/accepted/page.tsx (Server Component)

// 💡 Changez l'import de React pour être plus sûr
import { Suspense } from 'react'; // Importer Suspense directement de 'react'
import AcceptedDetails from './acceptedDetails'; 

export default function AcceptedPage() {


  return (

    <Suspense fallback={<p style={{ padding: 30 }}>Préparation de la mission...</p>}>
      <AcceptedDetails />
    </Suspense>
  );
}