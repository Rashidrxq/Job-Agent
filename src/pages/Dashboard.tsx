import { Briefcase, CheckCircle2, Send } from "lucide-react";

const stats = [
  {
    label: "Jobs Found",
    value: "124",
    icon: Briefcase,
  },
  {
    label: "Strong Matches",
    value: "32",
    icon: CheckCircle2,
  },
  {
    label: "Applications",
    value: "18",
    icon: Send,
  },
];

const jobs = [
  {
    title: "Frontend Developer",
    company: "ABC Technologies",
    location: "Calicut",
    skills: ["React", "Next.js", "JavaScript"],
    match: 92,
  },
  {
    title: "Junior Software Engineer",
    company: "XYZ Technologies",
    location: "Bangalore",
    skills: ["Python", "SQL", "REST"],
    match: 87,
  },
];

export default function Dashboard() {
  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-semibold tracking-tight text-zinc-900">
          Good morning, Rashid
        </h1>

        <p className="mt-1 text-sm text-zinc-500">
          Find your next opportunity.
        </p>
      </div>

      {/* Stats */}
      <div className="grid gap-4 sm:grid-cols-3">
        {stats.map((stat) => {
          const Icon = stat.icon;

          return (
            <div
              key={stat.label}
              className="rounded-xl border border-zinc-200 bg-white p-5"
            >
              <div className="flex items-center justify-between">
                <p className="text-sm text-zinc-500">{stat.label}</p>

                <Icon
                  size={18}
                  strokeWidth={1.8}
                  className="text-zinc-400"
                />
              </div>

              <p className="mt-3 text-2xl font-semibold text-zinc-900">
                {stat.value}
              </p>
            </div>
          );
        })}
      </div>

      {/* Recommended Jobs */}
      <section>
        <div className="mb-4 flex items-center justify-between">
          <div>
            <h2 className="text-base font-semibold text-zinc-900">
              Recommended Jobs
            </h2>

            <p className="mt-1 text-sm text-zinc-500">
              Jobs that match your profile.
            </p>
          </div>

          <button className="text-sm font-medium text-zinc-700 hover:text-zinc-900">
            View all
          </button>
        </div>

        <div className="space-y-3">
          {jobs.map((job) => (
            <div
              key={job.title}
              className="rounded-xl border border-zinc-200 bg-white p-5 transition hover:border-zinc-300"
            >
              <div className="flex items-start justify-between gap-4">
                <div>
                  <h3 className="font-medium text-zinc-900">{job.title}</h3>

                  <p className="mt-1 text-sm text-zinc-500">
                    {job.company} · {job.location}
                  </p>
                </div>

                <div className="rounded-full bg-zinc-100 px-3 py-1 text-sm font-medium text-zinc-800">
                  {job.match}% match
                </div>
              </div>

              <div className="mt-4 flex flex-wrap gap-2">
                {job.skills.map((skill) => (
                  <span
                    key={skill}
                    className="rounded-md bg-zinc-50 px-2.5 py-1 text-xs text-zinc-600 ring-1 ring-inset ring-zinc-200"
                  >
                    {skill}
                  </span>
                ))}
              </div>

              <div className="mt-4">
                <button className="text-sm font-medium text-zinc-900 hover:underline">
                  View job →
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}