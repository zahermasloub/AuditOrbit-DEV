"use client"

import { useState } from "react"
import { Code2, FileJson, ExternalLink } from "lucide-react"

export default function ApiExplorer() {
  const [tab, setTab] = useState<"swagger" | "redoc">("swagger")

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div>
        <h2 className="text-3xl font-bold bg-gradient-to-l from-indigo-400 to-cyan-400 bg-clip-text text-transparent mb-2">
          مستكشف الـ API
        </h2>
        <p className="text-slate-400">استكشاف وتجربة جميع نقاط النهاية (Endpoints) المتاحة</p>
      </div>

      {/* Tab Buttons */}
      <div className="flex items-center gap-3">
        <button
          onClick={() => setTab("swagger")}
          className={`flex items-center gap-2 px-6 py-3 rounded-xl font-medium transition-all ${
            tab === "swagger"
              ? "bg-gradient-to-l from-indigo-500 to-cyan-500 text-white shadow-lg shadow-indigo-500/30"
              : "bg-slate-800/50 text-slate-400 hover:bg-slate-800 hover:text-white border border-slate-700/50"
          }`}
        >
          <Code2 className="h-5 w-5" />
          Swagger UI
        </button>
        <button
          onClick={() => setTab("redoc")}
          className={`flex items-center gap-2 px-6 py-3 rounded-xl font-medium transition-all ${
            tab === "redoc"
              ? "bg-gradient-to-l from-indigo-500 to-cyan-500 text-white shadow-lg shadow-indigo-500/30"
              : "bg-slate-800/50 text-slate-400 hover:bg-slate-800 hover:text-white border border-slate-700/50"
          }`}
        >
          <FileJson className="h-5 w-5" />
          ReDoc
        </button>

        <a
          href="/ops/api/openapi.json"
          target="_blank"
          rel="noopener noreferrer"
          className="mr-auto flex items-center gap-2 px-4 py-3 bg-slate-800/50 hover:bg-slate-800 text-slate-400 hover:text-white border border-slate-700/50 rounded-xl transition-all"
        >
          <ExternalLink className="h-4 w-4" />
          OpenAPI JSON
        </a>
      </div>

      {/* Iframe Container */}
      <div className="relative overflow-hidden bg-gradient-to-br from-slate-800/50 to-slate-900/50 border border-slate-700/50 rounded-xl shadow-2xl">
        <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/5 to-cyan-500/5" />
        <div className="relative" style={{ height: "75vh" }}>
          {tab === "swagger" ? (
            <iframe src="/ops/api/docs" className="w-full h-full rounded-xl" title="Swagger UI" />
          ) : (
            <iframe src="/ops/api/redoc" className="w-full h-full rounded-xl" title="ReDoc" />
          )}
        </div>
      </div>
    </div>
  )
}
