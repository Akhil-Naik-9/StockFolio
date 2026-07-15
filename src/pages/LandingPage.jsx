import { Link } from "react-router-dom";
import {
  TrendingUp,
  PieChart,
  Wallet,
  Eye,
  ShieldCheck,
  LineChart,
  ArrowRight,
} from "lucide-react";
import PublicNavbar from "../components/PublicNavbar";
import Footer from "../components/Footer";

const features = [
  {
    icon: Wallet,
    title: "Portfolio Tracking",
    desc: "Add your stock holdings and instantly see investment value, current value and profit/loss.",
  },
  {
    icon: Eye,
    title: "Watchlist",
    desc: "Keep an eye on stocks you're interested in before you decide to invest.",
  },
  {
    icon: PieChart,
    title: "Visual Analytics",
    desc: "Pie and line charts show your portfolio allocation and growth over time.",
  },
  {
    icon: LineChart,
    title: "Transaction History",
    desc: "Every buy and sell you log is stored so you can review it later.",
  },
  {
    icon: ShieldCheck,
    title: "Secure Login",
    desc: "JWT-based authentication keeps your portfolio data tied to your account.",
  },
  {
    icon: TrendingUp,
    title: "Simple Dashboard",
    desc: "A clean overview screen that summarizes your entire portfolio at a glance.",
  },
];

const LandingPage = () => {
  return (
    <div className="min-h-screen bg-base-950">
      <PublicNavbar />
      <section className="max-w-6xl mx-auto px-5 pt-16 pb-12 grid lg:grid-cols-2 gap-10 items-center">
        <div>
         
          <h1 className="text-3xl sm:text-4xl font-extrabold text-white leading-tight mb-4">
            Track your stock portfolio, <span className="text-accent-blue">the simple way</span>.
          </h1>
          <p className="text-slate-400 mb-6 leading-relaxed">
            StockFolio is a full-stack web app that lets you record your stock holdings,
            keep a watchlist, log transactions and visualize your portfolio performance —
            built from scratch using React, Node.js, Express and MongoDB.
          </p>
          <div className="flex gap-3">
            <Link to="/register" className="btn-primary flex items-center gap-2">
              Get Started <ArrowRight size={16} />
            </Link>
            <Link to="/about" className="btn-secondary">
              Learn More
            </Link>
          </div>
        </div>
        <div className="card p-4">
          <div className="flex items-center gap-2 mb-3">
            <span className="w-2.5 h-2.5 rounded-full bg-red-500/70" />
            <span className="w-2.5 h-2.5 rounded-full bg-yellow-500/70" />
            <span className="w-2.5 h-2.5 rounded-full bg-green-500/70" />
            <span className="text-xs text-slate-500 ml-2">dashboard preview</span>
          </div>
          <div className="grid grid-cols-2 gap-3 mb-3">
            <div className="bg-base-800 rounded-lg p-3">
              <p className="text-xs text-slate-500">Total Investment</p>
              <p className="text-lg font-bold text-white">₹4,52,000</p>
            </div>
            <div className="bg-base-800 rounded-lg p-3">
              <p className="text-xs text-slate-500">Current Value</p>
              <p className="text-lg font-bold text-accent-green">₹4,91,300</p>
            </div>
          </div>
          <div className="bg-base-800 rounded-lg p-3 h-32 flex items-end gap-2">
            {[40, 65, 50, 80, 60, 95, 75].map((h, i) => (
              <div
                key={i}
                className="flex-1 bg-gradient-to-t from-accent-green to-accent-blue rounded-t"
                style={{ height: `${h}%` }}
              />
            ))}
          </div>
        </div>
      </section>

      <section className="max-w-6xl mx-auto px-5 py-12">
        <h2 className=" text-2xl font-bold text-white mb-2 ">What you can do</h2>
        <p className="text-slate-400 mb-8">Everything needed for a basic portfolio tracker.</p>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {features.map(({ icon: Icon, title, desc }) => (
            <div key={title} className="card p-5">
              <div className="w-10 h-10 rounded-lg bg-accent-blue/15 text-accent-blue flex items-center justify-center mb-3">
                <Icon size={20} />
              </div>
              <h3 className="font-semibold text-white mb-1">{title}</h3>
              <p className="text-sm text-slate-400">{desc}</p>
            </div>
          ))}
        </div>
      </section>

      
      
      <section className="max-w-6xl mx-auto px-5 py-12">
        <div className="card p-8 text-center bg-gradient-to-br from-base-900 to-base-800">
          <h2 className="text-xl font-bold text-white mb-2">Ready to try it out?</h2>
          <p className="text-slate-400 mb-5">Create a free account and add your first stock in under a minute.</p>
          <Link to="/register" className="btn-primary inline-flex items-center gap-2">
            Get Started <ArrowRight size={16} />
          </Link>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default LandingPage;
