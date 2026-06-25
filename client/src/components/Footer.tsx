export default function Footer() {
  return (
    <footer
      className="py-12 border-t"
      style={{
        backgroundColor: '#050510',
        borderColor: 'rgba(255, 255, 255, 0.06)',
      }}
    >
      <div className="max-w-6xl mx-auto px-4 text-center space-y-4">
        <p
          className="text-xs uppercase tracking-widest"
          style={{
            color: 'var(--text-secondary)',
            letterSpacing: '0.2em',
          }}
        >
          DECOMPOSE · DISCLOSE · EXECUTE
        </p>
        <p
          className="text-sm font-bold uppercase tracking-widest"
          style={{
            color: '#1e1e3a',
            letterSpacing: '0.3em',
          }}
        >
          DURABLFI
        </p>
      </div>
    </footer>
  );
}
