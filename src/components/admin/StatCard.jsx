export default function StatCard({ icon: Icon, label, value, tone = "amethyst" }) {
  const toneMap = {
    amethyst: "text-amethyst bg-amethyst/10",
    gold: "text-gold bg-gold/10",
    emerald: "text-emerald bg-emerald/10",
    ruby: "text-ruby bg-ruby/10",
  };
  return (
    <div className="relative bg-white border border-sapphire/10 p-6 flex items-center gap-4 overflow-hidden transition-shadow duration-300 hover:shadow-[0_20px_40px_-24px_rgba(20,33,61,0.35)]">
      <div className="absolute top-0 left-0 right-0 h-[3px] bg-gradient-to-r from-gold via-amethyst to-sapphire" />
      <div className={`w-11 h-11 rounded-full flex items-center justify-center flex-shrink-0 ${toneMap[tone]}`}>
        <Icon size={19} />
      </div>
      <div>
        <div className="font-display text-2xl font-bold text-sapphire">{value}</div>
        <div className="text-xs text-ink/50 mt-0.5">{label}</div>
      </div>
    </div>
  );
}
