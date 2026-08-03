export default function Pagination({ page, totalPages, onChange }) {
  if (totalPages <= 1) return null;

  const pages = Array.from({ length: totalPages }, (_, i) => i + 1);

  return (
    <div className="flex items-center justify-center gap-2 mt-14">
      <button
        disabled={page === 1}
        onClick={() => onChange(page - 1)}
        className="px-4 py-2 text-sm font-semibold border border-sapphire/15 disabled:opacity-30 hover:bg-sapphire hover:text-ivory transition"
      >
        ← Prev
      </button>
      {pages.map((p) => (
        <button
          key={p}
          onClick={() => onChange(p)}
          className={`w-9 h-9 text-sm font-semibold transition ${
            p === page ? "bg-sapphire text-ivory" : "border border-sapphire/15 hover:bg-ivory-2"
          }`}
        >
          {p}
        </button>
      ))}
      <button
        disabled={page === totalPages}
        onClick={() => onChange(page + 1)}
        className="px-4 py-2 text-sm font-semibold border border-sapphire/15 disabled:opacity-30 hover:bg-sapphire hover:text-ivory transition"
      >
        Next →
      </button>
    </div>
  );
}
