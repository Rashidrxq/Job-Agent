import {
  CalendarDays,
  ExternalLink,
  FileText,
  MapPin,
} from "lucide-react";

import { mockApplications } from "../data/mockApplications";

const statusStyles: Record<string, string> = {
  Sent: "bg-zinc-100 text-zinc-700",
  Interview: "bg-green-50 text-green-700",
  "No Response": "bg-yellow-50 text-yellow-700",
  Rejected: "bg-red-50 text-red-700",
};

export default function Applications() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-semibold text-zinc-900">
          Applications
        </h1>

        <p className="mt-1 text-sm text-zinc-500">
          Track and manage your job applications.
        </p>
      </div>

      {/* Summary */}
      <div className="grid gap-4 sm:grid-cols-4">
        <div className="rounded-xl border border-zinc-200 bg-white p-5">
          <p className="text-sm text-zinc-500">Total</p>
          <p className="mt-2 text-2xl font-semibold text-zinc-900">
            18
          </p>
        </div>

        <div className="rounded-xl border border-zinc-200 bg-white p-5">
          <p className="text-sm text-zinc-500">Sent</p>
          <p className="mt-2 text-2xl font-semibold text-zinc-900">
            12
          </p>
        </div>

        <div className="rounded-xl border border-zinc-200 bg-white p-5">
          <p className="text-sm text-zinc-500">Interviews</p>
          <p className="mt-2 text-2xl font-semibold text-zinc-900">
            3
          </p>
        </div>

        <div className="rounded-xl border border-zinc-200 bg-white p-5">
          <p className="text-sm text-zinc-500">Responses</p>
          <p className="mt-2 text-2xl font-semibold text-zinc-900">
            5
          </p>
        </div>
      </div>

      {/* Applications */}
      <section className="rounded-xl border border-zinc-200 bg-white">
        <div className="border-b border-zinc-200 px-6 py-4">
          <h2 className="font-semibold text-zinc-900">
            Recent Applications
          </h2>
        </div>

        <div className="divide-y divide-zinc-100">
          {mockApplications.map((application) => (
            <div
              key={application.id}
              className="p-6 transition hover:bg-zinc-50"
            >
              <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
                {/* Company / Role */}
                <div className="min-w-0">
                  <div className="flex items-start gap-3">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-zinc-100">
                      <FileText
                        size={18}
                        className="text-zinc-600"
                      />
                    </div>

                    <div>
                      <h3 className="font-medium text-zinc-900">
                        {application.role}
                      </h3>

                      <p className="mt-1 text-sm text-zinc-600">
                        {application.company}
                      </p>

                      <div className="mt-2 flex flex-wrap gap-4 text-xs text-zinc-500">
                        <span className="flex items-center gap-1">
                          <MapPin size={13} />
                          {application.location}
                        </span>

                        <span className="flex items-center gap-1">
                          <CalendarDays size={13} />
                          {application.appliedDate}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Status */}
                <div className="flex items-center gap-4">
                  <div className="text-right">
                    <p className="text-xs text-zinc-400">
                      Resume
                    </p>

                    <p className="mt-1 text-sm text-zinc-600">
                      {application.resume}
                    </p>
                  </div>

                  <span
                    className={`rounded-full px-3 py-1.5 text-xs font-medium ${
                      statusStyles[application.status]
                    }`}
                  >
                    {application.status}
                  </span>

                  <button className="text-zinc-400 hover:text-zinc-900">
                    <ExternalLink size={17} />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}