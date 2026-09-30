import { Bell } from "lucide-react";

export default function Topbar() {
  return (
    <header className="fixed left-64 right-0 top-0 z-10 flex h-16 items-center justify-between border-b border-zinc-200 bg-white px-8">
      <div>
        <h2 className="text-sm font-medium text-zinc-900">Dashboard</h2>
      </div>

      <div className="flex items-center gap-5">
        <button className="relative text-zinc-500 hover:text-zinc-900">
          <Bell size={19} strokeWidth={1.8} />

          <span className="absolute -right-1 -top-1 h-2 w-2 rounded-full bg-blue-500" />
        </button>

        <div className="flex items-center gap-3">
          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-zinc-900 text-xs font-medium text-white">
            R
          </div>

          <div className="hidden sm:block">
            <p className="text-sm font-medium text-zinc-900">Rashid</p>
            <p className="text-xs text-zinc-500">Candidate</p>
          </div>
        </div>
      </div>
    </header>
  );
}