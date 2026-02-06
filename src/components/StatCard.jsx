function StatCard({ value, label, sublabel, highlight = false }) {
  return (
    <div className={`p-6 border ${highlight ? 'border-blood-light bg-blood-dark/10' : 'border-paper/20 bg-slate-950/50'}`}>
      <div className={`font-mono text-4xl md:text-5xl font-bold mb-2 ${highlight ? 'text-blood-light' : 'text-warning'}`}>
        {value}
      </div>
      <div className="font-serif text-lg text-paper/90">{label}</div>
      {sublabel && (
        <div className="font-serif text-sm text-paper/60 mt-1">{sublabel}</div>
      )}
    </div>
  )
}

export default StatCard
