import { useEffect, useMemo, useState } from "react";
import {
  Search,
  MapPin,
  Clock3,
  SlidersHorizontal,
} from "lucide-react";
import { Link } from "react-router-dom";

type Job = {
  id: number;
  title: string;
  company: string;
  location: string | null;
  description: string | null;
  requirements: string | null;
  salary: string | null;
  job_url: string | null;
  source: string | null;
  posted_at: string | null;
  created_at: string;
};

export default function Jobs() {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("all");
  const [sort, setSort] = useState("match");
  const [loading, setLoading] = useState(true);

  // Get jobs from backend
  useEffect(() => {
    fetch("http://localhost:5000/api/jobs")
      .then((res) => res.json())
      .then((data) => {
        console.log("BACKEND JOBS:", data);
        setJobs(data.jobs || []);
      })
      .catch((error) => {
        console.error("Failed to fetch jobs:", error);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  const filteredJobs = useMemo(() => {
    let filtered = [...jobs];

    // Search
    if (search.trim()) {
      const query = search.toLowerCase();

      filtered = filtered.filter((job) => {
        return (
          job.title?.toLowerCase().includes(query) ||
          job.company?.toLowerCase().includes(query) ||
          job.location?.toLowerCase().includes(query) ||
          job.description?.toLowerCase().includes(query) ||
          job.requirements?.toLowerCase().includes(query)
        );
      });
    }

    // Remote filter
    if (filter === "remote") {
      filtered = filtered.filter((job) =>
        job.location?.toLowerCase().includes("remote")
      );
    }

    // Sort
    if (sort === "latest") {
      filtered.sort((a, b) => b.id - a.id);
    }

    return filtered;
  }, [jobs, search, filter, sort]);

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20">
        <p className="text-sm text-zinc-500">
          Loading jobs...
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-semibold text-zinc-900">
          Jobs
        </h1>

        <p className="mt-1 text-sm text-zinc-500">
          Discover jobs that match your profile.
        </p>
      </div>

      {/* Search + Sort */}
      <div className="flex flex-col gap-3 sm:flex-row">
        <div className="relative flex-1">
          <Search
            size={18}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-400"
          />

          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search jobs, companies or skills..."
            className="h-11 w-full rounded-lg border border-zinc-200 bg-white pl-10 pr-4 text-sm outline-none placeholder:text-zinc-400 focus:border-zinc-400"
          />
        </div>

        <div className="flex items-center gap-2">
          <SlidersHorizontal
            size={17}
            className="text-zinc-400"
          />

          <select
            value={sort}
            onChange={(e) => setSort(e.target.value)}
            className="h-11 rounded-lg border border-zinc-200 bg-white px-3 text-sm text-zinc-600 outline-none"
          >
            <option value="match">Best Match</option>
            <option value="latest">Latest</option>
          </select>
        </div>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap gap-2">
        {[
          ["all", "All"],
          ["remote", "Remote"],
        ].map(([value, label]) => (
          <button
            key={value}
            onClick={() => setFilter(value)}
            className={`rounded-full px-4 py-2 text-xs font-medium transition ${
              filter === value
                ? "bg-zinc-900 text-white"
                : "border border-zinc-200 bg-white text-zinc-600 hover:bg-zinc-50"
            }`}
          >
            {label}
          </button>
        ))}
      </div>

      {/* Result count */}
      <div>
        <p className="text-sm text-zinc-500">
          {filteredJobs.length}{" "}
          {filteredJobs.length === 1 ? "job" : "jobs"} found
        </p>
      </div>

      {/* Jobs */}
      <div className="space-y-3">
        {filteredJobs.map((job) => (
          <div
            key={job.id}
            className="rounded-xl border border-zinc-200 bg-white p-5 transition hover:border-zinc-300"
          >
            <div className="flex items-start justify-between gap-6">
              <div className="min-w-0">
                <h2 className="font-semibold text-zinc-900">
                  {job.title}
                </h2>

                <p className="mt-1 text-sm text-zinc-600">
                  {job.company}
                </p>

                <div className="mt-3 flex flex-wrap gap-4 text-xs text-zinc-500">
                  {job.location && (
                    <span className="flex items-center gap-1.5">
                      <MapPin size={14} />
                      {job.location}
                    </span>
                  )}

                  {job.posted_at && (
                    <span className="flex items-center gap-1.5">
                      <Clock3 size={14} />
                      {job.posted_at}
                    </span>
                  )}

                  {job.source && (
                    <span>
                      Source: {job.source}
                    </span>
                  )}
                </div>
              </div>
            </div>

            {/* Description */}
            {job.description && (
              <p className="mt-4 line-clamp-2 text-sm text-zinc-500">
                {job.description}
              </p>
            )}

            {/* Requirements */}
            {job.requirements && (
              <div className="mt-4">
                <p className="text-xs font-medium text-zinc-500">
                  Requirements
                </p>

                <p className="mt-1 text-sm text-zinc-600">
                  {job.requirements}
                </p>
              </div>
            )}

            {/* Salary */}
            {job.salary && (
              <p className="mt-3 text-sm font-medium text-zinc-700">
                Salary: {job.salary}
              </p>
            )}

            {/* Action */}
            <div className="mt-5 flex items-center justify-between border-t border-zinc-100 pt-4">
              <span className="text-xs text-zinc-400">
                Job #{job.id}
              </span>

              {job.job_url ? (
                <a
                  href={job.job_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm font-medium text-zinc-900 hover:underline"
                >
                  Apply / View job →
                </a>
              ) : (
                <Link
                  to={`/jobs/${job.id}`}
                  className="text-sm font-medium text-zinc-900 hover:underline"
                >
                  View job →
                </Link>
              )}
            </div>
          </div>
        ))}

        {/* Empty state */}
        {filteredJobs.length === 0 && (
          <div className="rounded-xl border border-zinc-200 bg-white p-12 text-center">
            <Search
              size={28}
              className="mx-auto text-zinc-400"
            />

            <h2 className="mt-4 font-medium text-zinc-900">
              No jobs found
            </h2>

            <p className="mt-1 text-sm text-zinc-500">
              Try a different search or filter.
            </p>

            <button
              onClick={() => {
                setSearch("");
                setFilter("all");
              }}
              className="mt-4 text-sm font-medium text-zinc-900 hover:underline"
            >
              Clear filters
            </button>
          </div>
        )}
      </div>
    </div>
  );
}