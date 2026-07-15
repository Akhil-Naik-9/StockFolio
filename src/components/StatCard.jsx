const StatCard = ({ label, value, icon: Icon, accent = "blue", sub }) => {
  const accentClasses = {
    blue: "bg-accent-blue/15 text-accent-blue",
    green: "bg-accent-green/15 text-accent-green",
    red: "bg-red-500/15 text-red-400",
  };

  return (
    <div className="card p-4 flex items-start justify-between">
      <div>
        <p className="text-xs text-slate-400 mb-1">{label}</p>
        <p className="text-xl font-bold text-white">{value}</p>
        {sub && <p className="text-xs mt-1 text-slate-500">{sub}</p>}
      </div>
      {Icon && (
        <div className={`p-2 rounded-lg ${accentClasses[accent]}`}>
          <Icon size={20} />
        </div>
      )}
    </div>
  );
};

export default StatCard;
