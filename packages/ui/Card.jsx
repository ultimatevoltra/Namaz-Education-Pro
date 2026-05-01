export default function Card({ title, children }) {
  return (
    <div
      style={{
        padding: 16,
        borderRadius: 16,
        background: "#fff",
        boxShadow: "0 10px 25px rgba(0,0,0,0.08)",
        marginBottom: 20
      }}
    >
      {title && <h3 style={{ marginBottom: 12 }}>{title}</h3>}
      {children}
    </div>
  );
}
