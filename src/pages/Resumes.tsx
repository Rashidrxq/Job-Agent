import { ChangeEvent, useState } from "react";
import { FileText, Plus, Upload, X } from "lucide-react";
import { mockResumes } from "../data/mockResumes";

type Resume = {
  id: string;
  name: string;
  description: string;
  skills: string[];
  atsScore: number | null;
  updated: string;
  fileName?: string;
};

export default function Resumes() {
  const [resumes, setResumes] = useState<Resume[]>(mockResumes);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];

    if (!file) return;

    const allowedTypes = [
      "application/pdf",
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
    ];

    if (!allowedTypes.includes(file.type)) {
      alert("Please upload a PDF or DOCX file.");
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      alert("File size must be less than 5MB.");
      return;
    }

    setSelectedFile(file);
  };

  const addResume = () => {
    if (!selectedFile) return;

    const newResume: Resume = {
      id: Date.now().toString(),
      name: selectedFile.name.replace(/\.(pdf|docx)$/i, ""),
      description: "Recently uploaded resume",
      skills: [],
      atsScore: null,
      updated: "Just now",
      fileName: selectedFile.name,
    };

    setResumes((current) => [newResume, ...current]);
    setSelectedFile(null);
  };

  const removeResume = (id: string) => {
    setResumes((current) =>
      current.filter((resume) => resume.id !== id)
    );
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-start justify-between gap-4">
        <div>
          <h1 className="text-2xl font-semibold text-zinc-900">
            Resumes
          </h1>

          <p className="mt-1 text-sm text-zinc-500">
            Manage your resumes and tailored versions.
          </p>
        </div>

        <label className="flex cursor-pointer items-center gap-2 rounded-lg bg-zinc-900 px-4 py-2.5 text-sm font-medium text-white hover:bg-zinc-800">
          <Plus size={17} />
          Upload Resume

          <input
            type="file"
            accept=".pdf,.docx"
            className="hidden"
            onChange={handleFileChange}
          />
        </label>
      </div>

      {/* Upload area */}
      <div className="rounded-xl border border-dashed border-zinc-300 bg-white p-8 text-center">
        <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-xl bg-zinc-100">
          <Upload size={21} className="text-zinc-600" />
        </div>

        <h2 className="mt-4 text-sm font-medium text-zinc-900">
          Upload your resume
        </h2>

        <p className="mt-1 text-sm text-zinc-500">
          PDF or DOCX files up to 5MB
        </p>

        <label className="mt-4 inline-flex cursor-pointer rounded-lg border border-zinc-200 bg-white px-4 py-2 text-sm font-medium text-zinc-700 hover:bg-zinc-50">
          Choose File

          <input
            type="file"
            accept=".pdf,.docx"
            className="hidden"
            onChange={handleFileChange}
          />
        </label>

        {selectedFile && (
          <div className="mx-auto mt-5 flex max-w-md items-center justify-between rounded-lg bg-zinc-50 px-4 py-3 text-left">
            <div className="flex min-w-0 items-center gap-3">
              <FileText size={18} className="shrink-0 text-zinc-600" />

              <div className="min-w-0">
                <p className="truncate text-sm font-medium text-zinc-900">
                  {selectedFile.name}
                </p>

                <p className="text-xs text-zinc-500">
                  {(selectedFile.size / 1024 / 1024).toFixed(2)} MB
                </p>
              </div>
            </div>

            <button
              onClick={() => setSelectedFile(null)}
              className="text-zinc-400 hover:text-zinc-900"
            >
              <X size={17} />
            </button>
          </div>
        )}

        {selectedFile && (
          <button
            onClick={addResume}
            className="mt-4 rounded-lg bg-zinc-900 px-5 py-2.5 text-sm font-medium text-white hover:bg-zinc-800"
          >
            Add Resume
          </button>
        )}
      </div>

      {/* Resume list */}
      <section>
        <div className="mb-4">
          <h2 className="text-base font-semibold text-zinc-900">
            Your Resumes
          </h2>

          <p className="mt-1 text-sm text-zinc-500">
            {resumes.length} resumes available.
          </p>
        </div>

        {resumes.length === 0 ? (
          <div className="rounded-xl border border-zinc-200 bg-white p-10 text-center">
            <FileText
              size={30}
              className="mx-auto text-zinc-400"
            />

            <p className="mt-3 text-sm font-medium text-zinc-900">
              No resumes yet
            </p>

            <p className="mt-1 text-sm text-zinc-500">
              Upload your first resume to get started.
            </p>
          </div>
        ) : (
          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            {resumes.map((resume) => (
              <div
                key={resume.id}
                className="rounded-xl border border-zinc-200 bg-white p-5"
              >
                <div className="flex items-start justify-between">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-zinc-100">
                    <FileText
                      size={19}
                      className="text-zinc-600"
                    />
                  </div>

                  {resume.atsScore !== null && (
                    <span className="rounded-full bg-zinc-100 px-2.5 py-1 text-xs font-medium text-zinc-700">
                      {resume.atsScore}% ATS
                    </span>
                  )}
                </div>

                <h3 className="mt-4 font-medium text-zinc-900">
                  {resume.name}
                </h3>

                <p className="mt-1 text-sm text-zinc-500">
                  {resume.description}
                </p>

                {resume.fileName && (
                  <p className="mt-2 truncate text-xs text-zinc-400">
                    {resume.fileName}
                  </p>
                )}

                {resume.skills.length > 0 && (
                  <div className="mt-4 flex flex-wrap gap-2">
                    {resume.skills.map((skill) => (
                      <span
                        key={skill}
                        className="rounded-md bg-zinc-50 px-2 py-1 text-xs text-zinc-600 ring-1 ring-inset ring-zinc-200"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                )}

                <div className="mt-5 flex items-center justify-between border-t border-zinc-100 pt-4">
                  <span className="text-xs text-zinc-400">
                    Updated {resume.updated}
                  </span>

                  <button
                    onClick={() => removeResume(resume.id)}
                    className="text-xs font-medium text-zinc-500 hover:text-red-600"
                  >
                    Remove
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}