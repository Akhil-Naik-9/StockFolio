import { Target, Layers, Workflow, Rocket, User } from "lucide-react";
import PublicNavbar from "../components/PublicNavbar";
import Footer from "../components/Footer";

const AboutPage = () => {
  return (
    <div className="min-h-screen bg-base-950">
      <PublicNavbar />

      <div className="max-w-4xl mx-auto px-5 py-12">
        <h1 className="text-2xl font-bold text-white mb-2">About This Project</h1>
        <p className="text-slate-400 mb-10">
          StockFolio is a full-stack MERN application built as a college mini project to
          demonstrate practical skills in modern web development.
        </p>

        <section className="mb-8">
          <div className="flex items-center gap-2 mb-3">
            <Target size={20} className="text-accent-blue" />
            <h2 className="font-semibold text-white text-lg">Objectives</h2>
          </div>
          <ul className="list-disc list-inside text-slate-400 space-y-1.5 text-sm">
            <li>Build a complete full-stack application using the MERN stack</li>
            <li>Implement secure user authentication with JWT</li>
            <li>Design a functional CRUD system for managing stock holdings</li>
            <li>Visualize portfolio data using charts</li>
            <li>Apply REST API principles on the backend</li>
          </ul>
        </section>

        <section className="mb-8">
          <div className="flex items-center gap-2 mb-3">
            <Layers size={20} className="text-accent-green" />
            <h2 className="font-semibold text-white text-lg">Technologies Used</h2>
          </div>
          <div className="grid sm:grid-cols-2 gap-3 text-sm text-slate-400">
            <div className="card p-3">Frontend: React (Vite), Tailwind CSS, React Router</div>
            <div className="card p-3">Backend: Node.js, Express.js</div>
            <div className="card p-3">Database: MongoDB with Mongoose</div>
            <div className="card p-3">Auth: JWT + bcrypt password hashing</div>
            <div className="card p-3">Charts: Chart.js via react-chartjs-2</div>
            <div className="card p-3">Icons: Lucide React</div>
          </div>
        </section>

        <section className="mb-8">
          <div className="flex items-center gap-2 mb-3">
            <Workflow size={20} className="text-accent-blue" />
            <h2 className="font-semibold text-white text-lg">Project Workflow</h2>
          </div>
          <ol className="list-decimal list-inside text-slate-400 space-y-1.5 text-sm">
            <li>User registers or logs in, receiving a JWT for authenticated requests</li>
            <li>User adds stocks to their portfolio with buy price and quantity</li>
            <li>Backend calculates investment, current value and profit/loss</li>
            <li>Dashboard and analytics pages visualize this data with charts</li>
            <li>Transactions and watchlist entries are stored separately per user</li>
          </ol>
        </section>

        <section className="mb-8">
          <div className="flex items-center gap-2 mb-3">
            <Rocket size={20} className="text-accent-green" />
            <h2 className="font-semibold text-white text-lg">Future Enhancements</h2>
          </div>
          <ul className="list-disc list-inside text-slate-400 space-y-1.5 text-sm">
            <li>Integrate a live stock price API instead of manual price entry</li>
            <li>Add email notifications for watchlist price alerts</li>
            <li>Support multiple portfolios per user</li>
            <li>Add dark/light theme toggle</li>
          </ul>
        </section>

        <section>
          <div className="flex items-center gap-2 mb-3">
            <User size={20} className="text-accent-blue" />
            <h2 className="font-semibold text-white text-lg">Developer Information</h2>
          </div>
          <div className="card p-4 text-sm text-slate-400">
            <p>Developed by a B.Tech Computer Science student as a semester project.</p>
            <p className="mt-1">Built to demonstrate MERN stack proficiency for a college project expo.</p>
          </div>
        </section>
      </div>

      <Footer />
    </div>
  );
};

export default AboutPage;
