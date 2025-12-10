// app/accepted/page.tsx (NOUVEAU - Ceci est un Server Component)

import React, { Suspense } from 'react';
import AcceptedDetails from './acceptedDetails'; // Import du Client Component

// NOTE: Le Server Component n'a pas besoin des props searchParams
export default function AcceptedPage() {

  
  return (
    // 🔑 Envelopper le Client Component dans Suspense
    <Suspense fallback={<p style={{ padding: 30 }}>Préparation de la mission...</p>}>
      <AcceptedDetails />
    </Suspense>
  );}