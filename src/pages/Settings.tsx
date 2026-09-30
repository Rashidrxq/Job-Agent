import {
  Bell,
  Briefcase,
  MapPin,
  Save,
  User,
} from "lucide-react";

export default function Settings() {
  return (
    <div className="max-w-4xl space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-semibold text-zinc-900">
          Settings
        </h1>

        <p className="mt-1 text-sm text-zinc-500">
          Configure your profile and job preferences.
        </p>
      </div>

      {/* Profile */}
      <section className="rounded-xl border border-zinc-200 bg-white p-6">
        <div className="flex items-center gap-2">
          <User size={18} className="text-zinc-700" />

          <h2 className="font-semibold text-zinc-900">
            Profile
          </h2>
        </div>

        <div className="mt-6 grid gap-5 sm:grid-cols-2">
          <div>
            <label className="text-sm font-medium text-zinc-700">
              Full name
            </label>

            <input
              type="text"
              defaultValue="Muhammed Rashid"
              className="mt-2 h-10 w-full rounded-lg border border-zinc-200 px-3 text-sm outline-none focus:border-zinc-400"
            />
          </div>

          <div>
            <label className="text-sm font-medium text-zinc-700">
              Email
            </label>

            <input
              type="email"
              defaultValue=""
              placeholder="your@email.com"
              className="mt-2 h-10 w-full rounded-lg border border-zinc-200 px-3 text-sm outline-none focus:border-zinc-400"
            />
          </div>
        </div>
      </section>

      {/* Job Preferences */}
      <section className="rounded-xl border border-zinc-200 bg-white p-6">
        <div className="flex items-center gap-2">
          <Briefcase size={18} className="text-zinc-700" />

          <h2 className="font-semibold text-zinc-900">
            Job Preferences
          </h2>
        </div>

        <div className="mt-6 space-y-5">
          <div>
            <label className="text-sm font-medium text-zinc-700">
              Target roles
            </label>

            <input
              type="text"
              placeholder="Frontend Developer, React Developer, Software Engineer"
              className="mt-2 h-10 w-full rounded-lg border border-zinc-200 px-3 text-sm outline-none focus:border-zinc-400"
            />
          </div>

          <div>
            <label className="flex items-center gap-2 text-sm font-medium text-zinc-700">
              <MapPin size={15} />
              Preferred locations
            </label>

            <input
              type="text"
              placeholder="Calicut, Kochi, Bangalore, Remote"
              className="mt-2 h-10 w-full rounded-lg border border-zinc-200 px-3 text-sm outline-none focus:border-zinc-400"
            />
          </div>

          <div>
            <label className="text-sm font-medium text-zinc-700">
              Experience
            </label>

            <select className="mt-2 h-10 w-full rounded-lg border border-zinc-200 bg-white px-3 text-sm outline-none focus:border-zinc-400">
              <option>Fresher / 0–1 years</option>
              <option>1–2 years</option>
              <option>2–3 years</option>
            </select>
          </div>
        </div>
      </section>

      {/* Automation */}
      <section className="rounded-xl border border-zinc-200 bg-white p-6">
        <div className="flex items-center gap-2">
          <Bell size={18} className="text-zinc-700" />

          <h2 className="font-semibold text-zinc-900">
            Job Automation
          </h2>
        </div>

        <div className="mt-5 space-y-4">
          <label className="flex items-center justify-between gap-4">
            <div>
              <p className="text-sm font-medium text-zinc-900">
                Automatic job discovery
              </p>

              <p className="mt-1 text-xs text-zinc-500">
                Find new jobs matching your preferences.
              </p>
            </div>

            <input
              type="checkbox"
              defaultChecked
              className="h-4 w-4"
            />
          </label>

          <label className="flex items-center justify-between gap-4">
            <div>
              <p className="text-sm font-medium text-zinc-900">
                Automatic application preparation
              </p>

              <p className="mt-1 text-xs text-zinc-500">
                Generate a tailored resume and recruiter message.
              </p>
            </div>

            <input
              type="checkbox"
              defaultChecked
              className="h-4 w-4"
            />
          </label>
        </div>
      </section>

      {/* Save */}
      <div className="flex justify-end">
        <button className="flex items-center gap-2 rounded-lg bg-zinc-900 px-5 py-2.5 text-sm font-medium text-white hover:bg-zinc-800">
          <Save size={16} />
          Save Settings
        </button>
      </div>
    </div>
  );
}