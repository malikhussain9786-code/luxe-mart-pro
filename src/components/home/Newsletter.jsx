export default function Newsletter() {
  return (
    <section className="bg-gradient-to-br from-amethyst to-[#3D2166] py-12 text-center text-white">
      <div className="max-w-lg mx-auto px-6">
        <h2 className="font-display text-3xl font-semibold mb-3">Join the Luxe Mart Pro list</h2>
        <p className="text-white/80 text-sm mb-8">Early access to demo drops, price changes, and new categories.</p>
        <form className="flex" onSubmit={(e) => e.preventDefault()}>
          <input
            type="email"
            placeholder="Enter your email"
            className="flex-1 px-5 py-3.5 text-sm text-ink focus:outline-none"
          />
          <button type="submit" className="bg-gold text-sapphire font-bold px-7 py-3.5 text-sm">
            Subscribe
          </button>
        </form>
      </div>
    </section>
  );
}
