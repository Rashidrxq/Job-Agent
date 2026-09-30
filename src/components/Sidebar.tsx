import {
  LayoutDashboard,
  Briefcase,
  FileText,
  Send,
  Settings,
} from "lucide-react";
import { NavLink } from "react-router-dom";

const navigation = [
  {
    name: "Dashboard",
    path: "/",
    icon: LayoutDashboard,
  },
  {
    name: "Jobs",
    path: "/jobs",
    icon: Briefcase,
  },
  {
    name: "Resumes",
    path: "/resumes",
    icon: FileText,
  },
  {
    name: "Applications",
    path: "/applications",
    icon: Send,
  },
];

export default function Sidebar() {
  return (
    <aside className="fixed left-0 top-0 flex h-screen w-64 flex-col border-r border-zinc-200 bg-white">
      {/* Logo */}
      <div className="flex h-16 items-center border-b border-zinc-200 px-6">
        <div>
          <h1 className="text-lg font-semibold text-zinc-900">
            JobAgent
          </h1>

          <p className="text-xs text-zinc-500">
            AI Job Assistant
          </p>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-3 py-6">
        <p className="mb-3 px-3 text-xs font-medium uppercase tracking-wider text-zinc-400">
          Menu
        </p>

        <div className="space-y-1">
          {navigation.map((item) => {
            const Icon = item.icon;

            return (
              <NavLink
                key={item.name}
                to={item.path}
                className={({ isActive }) =>
                  `flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm transition ${
                    isActive
                      ? "bg-zinc-100 font-medium text-zinc-900"
                      : "text-zinc-600 hover:bg-zinc-50 hover:text-zinc-900"
                  }`
                }
              >
                <Icon size={18} strokeWidth={1.8} />

                {item.name}
              </NavLink>
            );
          })}
        </div>
      </nav>

      {/* Settings */}
      <div className="border-t border-zinc-200 p-3">
        <NavLink
          to="/settings"
          className={({ isActive }) =>
            `flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm transition ${
              isActive
                ? "bg-zinc-100 font-medium text-zinc-900"
                : "text-zinc-600 hover:bg-zinc-50 hover:text-zinc-900"
            }`
          }
        >
          <Settings size={18} strokeWidth={1.8} />

          Settings
        </NavLink>
      </div>
    </aside>
  );
}