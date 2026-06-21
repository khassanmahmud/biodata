import { Code2, Heart } from "lucide-react";

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-white/5 py-10 px-6">
      <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-slate-500">
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-indigo-500 to-violet-600 flex items-center justify-center">
            <Code2 className="w-3.5 h-3.5 text-white" />
          </div>
          <span className="text-slate-400 font-medium">Rabiul Aid</span>
        </div>

        <p className="flex items-center gap-1.5">
          Built with{" "}
          <Heart className="w-3.5 h-3.5 text-rose-500 inline" />
          {" "}using Next.js & Tailwind CSS
        </p>

        <p>© {year} Rabiul Aid. All rights reserved.</p>
      </div>
    </footer>
  );
}
