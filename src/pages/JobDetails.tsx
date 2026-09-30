import {
  ArrowLeft,
  Check,
  FileText,
  MapPin,
  Sparkles,
  X,
} from "lucide-react";
import { Link, useParams } from "react-router-dom";
import { mockJobs } from "../data/mockJobs";

export default function JobDetails() {
  const { id } = useParams();

  const job = mockJobs.find((job) => job.id === id) ?? mockJobs[0];

  const matchedSkills = ["React", "JavaScript", "Next.js", "HTML"];
  const missingSkills = ["TypeScript"];

  return (
    <div className="space-y-6">
      {/* Back */}
      <Link
        to="/jobs"
        className="inline-flex items-center gap-2 text-sm text-zinc-500 hover:text-zinc-900"
      >
        <ArrowLeft size={16} />
        Back to Jobs
      </Link>

      {/* Job header */}
      <div className="rounded-xl border border-zinc-200 bg-white p-6">
        <div className="flex items-start justify-between gap-6">
          <div>
            <h1 className="text-2xl font-semibold text-zinc-900">
              {job.title}
            </h1>

            <p className="mt-1 text-zinc-600">
              {job.company}
            </p>

            <div className="mt-4 flex flex-wrap gap-4 text-sm text-zinc-500">
              <span className="flex items-center gap-1.5">
                <MapPin size={15} />
                {job.location}
              </span>

              <span>{job.experience}</span>

              <span>{job.type}</span>
            </div>
          </div>

          {/* Match */}
          <div className="shrink-0 text-center">
            <div className="flex h-20 w-20 items-center justify-center rounded-full border-4 border-zinc-900">
              <span className="text-xl font-semibold text-zinc-900">
                {job.match}%
              </span>
            </div>

            <p className="mt-2 text-xs text-zinc-500">
              Match score
            </p>
          </div>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Main content */}
        <div className="space-y-6 lg:col-span-2">
          {/* Match analysis */}
          <section className="rounded-xl border border-zinc-200 bg-white p-6">
            <div className="flex items-center gap-2">
              <Sparkles size={18} className="text-zinc-700" />

              <h2 className="font-semibold text-zinc-900">
                Match Analysis
              </h2>
            </div>

            <p className="mt-2 text-sm text-zinc-500">
              How well this job matches your current profile.
            </p>

            <div className="mt-6">
              <h3 className="text-sm font-medium text-zinc-900">
                Matching skills
              </h3>

              <div className="mt-3 flex flex-wrap gap-2">
                {matchedSkills.map((skill) => (
                  <span
                    key={skill}
                    className="flex items-center gap-1.5 rounded-md bg-zinc-50 px-3 py-1.5 text-xs text-zinc-700 ring-1 ring-inset ring-zinc-200"
                  >
                    <Check size={13} />
                    {skill}
                  </span>
                ))}
              </div>
            </div>

            <div className="mt-6">
              <h3 className="text-sm font-medium text-zinc-900">
                Missing skills
              </h3>

              <div className="mt-3 flex flex-wrap gap-2">
                {missingSkills.map((skill) => (
                  <span
                    key={skill}
                    className="flex items-center gap-1.5 rounded-md bg-zinc-50 px-3 py-1.5 text-xs text-zinc-500 ring-1 ring-inset ring-zinc-200"
                  >
                    <X size={13} />
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          </section>

          {/* Job description */}
          <section className="rounded-xl border border-zinc-200 bg-white p-6">
            <h2 className="font-semibold text-zinc-900">
              Job Description
            </h2>

            <div className="mt-5 space-y-4 text-sm leading-7 text-zinc-600">
              <p>
                We are looking for a motivated Frontend Developer
                to join our development team and build modern web
                applications.
              </p>

              <p>
                You will work with React, JavaScript and modern
                frontend technologies while collaborating with
                designers and backend developers.
              </p>

              <div>
                <h3 className="font-medium text-zinc-900">
                  Requirements
                </h3>

                <ul className="mt-2 list-disc space-y-1 pl-5">
                  <li>Strong JavaScript fundamentals</li>
                  <li>Experience with React</li>
                  <li>Understanding of HTML and CSS</li>
                  <li>Knowledge of modern frontend development</li>
                  <li>0–1 years of experience</li>
                </ul>
              </div>
            </div>
          </section>
        </div>

        {/* Right panel */}
        <div className="space-y-6">
          {/* Resume */}
          <section className="rounded-xl border border-zinc-200 bg-white p-6">
            <div className="flex items-center gap-2">
              <FileText size={18} className="text-zinc-700" />

              <h2 className="font-semibold text-zinc-900">
                Recommended Resume
              </h2>
            </div>

            <div className="mt-4 rounded-lg border border-zinc-200 p-4">
              <p className="text-sm font-medium text-zinc-900">
                Frontend Resume
              </p>

              <p className="mt-1 text-xs text-zinc-500">
                React · Next.js · JavaScript
              </p>

              <div className="mt-4 flex items-center justify-between">
                <span className="text-xs text-zinc-500">
                  ATS compatibility
                </span>

                <span className="text-sm font-semibold text-zinc-900">
                  89%
                </span>
              </div>
            </div>

            <button className="mt-4 w-full rounded-lg bg-zinc-900 px-4 py-2.5 text-sm font-medium text-white hover:bg-zinc-800">
              Generate Tailored Resume
            </button>
          </section>

          {/* Outreach */}
          <section className="rounded-xl border border-zinc-200 bg-white p-6">
            <h2 className="font-semibold text-zinc-900">
              Recruiter Outreach
            </h2>

            <p className="mt-2 text-sm leading-6 text-zinc-500">
              Generate a personalized message based on this
              company and job.
            </p>

            <button className="mt-4 w-full rounded-lg border border-zinc-200 bg-white px-4 py-2.5 text-sm font-medium text-zinc-700 hover:bg-zinc-50">
              Generate Message
            </button>
          </section>

          {/* Apply */}
          <section className="rounded-xl border border-zinc-200 bg-white p-6">
            <h2 className="font-semibold text-zinc-900">
              Ready to Apply?
            </h2>

            <p className="mt-2 text-sm text-zinc-500">
              Review your resume and outreach before sending.
            </p>

            <button className="mt-4 w-full rounded-lg bg-zinc-900 px-4 py-2.5 text-sm font-medium text-white hover:bg-zinc-800">
              Review Application
            </button>
          </section>
        </div>
      </div>
    </div>
  );
}