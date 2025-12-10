export default function AcceptedPage({ searchParams }: { searchParams: any }) {
  console.log("PAGE.TSX → searchParams =", searchParams);

  return (
    <div style={{ padding: 40 }}>
      <h1>Test searchParams</h1>
      <p>match_id : {searchParams.match_id || "❌ introuvable"}</p>
      <p>token : {searchParams.token || "❌ introuvable"}</p>
    </div>
  );
}
