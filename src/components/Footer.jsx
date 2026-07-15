import { TrendingUp, Github, Mail } from "lucide-react";

const Footer = () => {
  return (
    <footer className="border-t border-base-800 mt-16">
      <div className="max-w-6xl mx-auto px-5 py-10 grid gap-8 sm:grid-cols-3">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <TrendingUp className="text-accent-green" size={20} />
            <span className="font-bold text-white">StockFolio</span>
          </div>
          <p className="text-sm text-slate-500">
            A simple stock market portfolio tracker built using MERN.
          </p>
        </div>

        <div>
          <p className="text-sm font-semibold text-slate-300 mb-2">Project</p>
          <ul className="space-y-1 text-sm text-slate-500">
            <li>Built with React, Node.js, Express &amp; MongoDB</li>
            
          </ul>
        </div>

        <div>
          <p className="text-sm font-semibold text-slate-300 mb-2">Contact</p>
          <ul className="space-y-2 text-sm text-slate-500">
            <li className="flex items-center gap-2">
              <Mail size={30} /> 23311a05bg@cse.sreenidhi.edu.in
              23311a05af@cse.sreenidhi.edu.in
              23311a05al@cse.sreenidhi.edu.in
            </li>
            <li className="flex items-center gap-2">
              <Github size={14} /> github.com/your-username
            </li>
          </ul>
        </div>
      </div>
      <div className="text-center text-xs text-slate-600 pb-6">
        © {new Date().getFullYear()} StockFolio copyrights are reserved
      </div>
    </footer>
  );
};

export default Footer;
